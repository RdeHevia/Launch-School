/* eslint-disable max-statements */
"use strict";
/*
===============================================================
CONTACT MANAGER APP

READ ME:
===============================================================
ORGANIZATION:
  1. UI
    1.1. API
    1.2. Presenter
      1.2.1. Template
      1.2.2. DOMSelector
===============================================================
RESPONSABILITIES:
UI:
  - event handling
  - orchestrate API and Presenter
API:
  - communicate with the backend
Presenter:
  - UI state organized by components. Each component has:
    - data
    - reference to associated element in DOM
  - CRUD operations on UI state
  - CRUD operations on DOM
  - Uses Template and DOMSelector as colaborators
Template:
  - Manage Handlebars templates
  - generate HTML from templates
DOMSelector:
  - methods that return references to DOM elements
===============================================================
*/

import {API} from './api.js';
import {Presenter} from './presenter.js';


class UI {
  constructor() {
    this.api = new API();
    this.presenter = new Presenter();
  }

  async load () {
    this.presenter.template.initializeTemplates();

    let contacts = await this.api.fetchContacts();

    // REFACTOR this.presenter.processContacts(contacts);
    this.presenter.insertContacts(contacts);
    this.presenter.viewmodel.bindDataToAllContactElements(contacts);
    this.presenter.displayOrHideNoContactsMessage();

    // REFACTOR this.presenter.processTagsFromContacts(contacts);
    let tags = this.presenter.viewmodel.extractTagsFromContacts(contacts);
    this.presenter.insertTags(tags);
    this.presenter.viewmodel.bindDataToAllTagElements(tags);
  }

  bindListeners() {
    this.bindListenerToNewTagLink();
    this.bindListenerToAddContactLinks();
    this.bindListenerToContactForm();
    this.bindListenerToCancelButton();
    this.bindListenerToContactsContainer();
    this.bindListenerToFilteringTags();
    this.bindListenerToSearch();
  }

  bindListenerToNewTagLink() {
    let newTagLink = document.querySelector('a.new_tag');
    newTagLink.addEventListener('click', event => this.handleNewTag(event));
  }

  bindListenerToAddContactLinks() {
    this.presenter.select.contactLinks().forEach(link => {
      link.addEventListener('click', event => this.handleShowContactForm(event));
    });
  }

  bindListenerToCancelButton() {
    let cancelButton = this.presenter.select.cancelButton();
    cancelButton.addEventListener('click', event => this.handleCancelButton(event));
  }

  bindListenerToContactForm() {
    let contactForm = this.presenter.select.contactForm();
    contactForm.addEventListener('submit', event => this.handleContact(event));
  }

  bindListenerToContactsContainer() {
    let contactsContainer = this.presenter.select.contactsContainer();
    contactsContainer.addEventListener('click', event => {
      this.handleEditOrDeleteContact(event);
    });
  }

  bindListenerToFilteringTags() {
    let filteringTags = this.presenter.select.filteringTags();
    filteringTags.addEventListener('input', event => {
      this.handleTagFiltering(event);
    });
  }

  bindListenerToSearch() {
    let search = this.presenter.select.searchBar();

    search.addEventListener('input', event => this.handleSearch(event));
  }

  handleNewTag(event) {
    event.preventDefault();

    let newTag = this.presenter.select.newTagInput().value;
    this.presenter.select.newTagInput().value = '';
    // this.presenter.processTag(newTag)
    this.presenter.insertTag(newTag);
    this.presenter.viewmodel.bindDataToTagElement(newTag);
  }

  handleShowContactForm(event) {
    event.preventDefault();

    this.presenter.hide(this.presenter.select.contactsContainer());
    this.presenter.unhide(this.presenter.select.contactForm());
  }

  handleCancelButton(event) {
    event.preventDefault();
    let contactForm = this.presenter.select.contactForm();
    contactForm.reset();
    this.presenter.hide(contactForm);
    this.presenter.unhide(this.presenter.select.contactsContainer());
  }

  handleContact(event) {
    event.preventDefault();
    let form = event.target;

    if (form.dataset.putOverride === "true") {
      this.handleEditContact();
    } else {
      this.handleNewContact(form);
    }
    form.reset();
    this.presenter.hide(form);
    this.presenter.unhide(this.presenter.select.contactsContainer());
  }

  async handleNewContact(contactForm) {
    let path = contactForm.action;
    let json = this.serializeContactFormToJSON();

    let newContact = await this.api.post(path, json);
    if (!newContact) return;

    // REFACTOR this.presenter.processContact(newContact);
    this.presenter.insertContact(newContact);
    this.presenter.viewmodel.bindDataToContactElement(newContact);
  }

  async handleEditContact() {
    let contactForm = this.presenter.select.contactForm();

    let path = contactForm.dataset.putAction;
    let json = this.serializeContactFormToJSON();
    contactForm.reset();

    let editedContact = await this.api.put(path, json);
    if (!editedContact) return;

    this.presenter.updateContact(editedContact);
  }

  async handleEditOrDeleteContact(event) {
    event.preventDefault();
    if (event.target.tagName !== 'A') return;
    if (this.presenter.select.contactLinks().includes(event.target)) return;

    let method = event.target.dataset.method;
    let path = event.target.href;
    let contactId = +path.match(/[0-9]+$/)[0];

    if (method === 'PUT') {
      this.presenter.configContactForm(method, path);
      this.presenter.populateContactForm(contactId);
      this.presenter.hide(this.presenter.select.contactsContainer());
      this.presenter.unhide(this.presenter.select.contactForm());
    } else if (method === 'DELETE') {
      if (!confirm('Do you want to delete the contact?')) return;
      let success = await this.api.delete(path);
      if (!success) return;
      this.presenter.deleteContact(contactId);
      this.presenter.displayOrHideNoContactsMessage();
    }
  }

  handleTagFiltering(event) {
    event.preventDefault();

    let id = event.target.value;
    let checked = JSON.parse(event.target.checked);

    this.presenter.viewmodel.updateTagCheckStatus(id, checked);

    this.presenter.filterContacts();
  }

  handleSearch(event) {
    event.preventDefault();
    let search = event.target.value.toLowerCase();
    this.presenter.viewmodel.searchString = search;

    this.presenter.filterContacts();
  }

  serializeContactFormToJSON() {
    let contactForm = this.presenter.select.contactForm();
    let entries = [...new FormData(contactForm)];
    let tagEntries = entries.filter(entry => entry[0] === 'tag');
    let restEntries = entries.filter(entry => entry[0] !== 'tag');
    let tagsEntry = tagEntries.reduce((formatedEntry, entry, idx) => {
      if (idx === 0) {
        formatedEntry[1] += `${entry[1]}`;
      } else {
        formatedEntry[1] += `,${entry[1]}`;
      }
      return formatedEntry;
    }, ["tags", ""]);

    let formatedEntries = [...restEntries, tagsEntry];
    return JSON.stringify(Object.fromEntries(formatedEntries));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let contactManagerUI = new UI();
  contactManagerUI.load();
  contactManagerUI.bindListeners();
});