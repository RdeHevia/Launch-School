"use strict";
import {DOMSelector} from './DOMselector.js';
import {Template} from './template.js';
import {ViewModel} from './viewmodel.js';

export class Presenter {
  constructor() {
    this.template = new Template();
    this.select = new DOMSelector();
    this.viewmodel = new ViewModel();
  }

  insertContacts(contacts) {
    let formatedData = {contacts};
    let html = this.template.generateHTMLFromTemplate('t_contacts', formatedData);
    let container = this.select.contactsContainer();
    container.insertAdjacentHTML('beforeend', html);
  }

  insertContact(contact) {
    let formatedData = contact;
    let html = this.template.generateHTMLFromTemplate('t_contact', formatedData);
    let container = this.select.contactsContainer();
    container.insertAdjacentHTML('beforeend', html);
  }

  updateContact(contactData) {
    let id = contactData.id;
    this.viewmodel.updateContactData(contactData);
    this.regenerateContentContact(id);
  }

  deleteContact(contactId) {
    this.viewmodel.contacts[contactId].element.remove();
    this.viewmodel.deleteContactFromModel(contactId);
  }

  regenerateContentContact(id) {
    let contactData = this.viewmodel.contacts[id].data;
    let contactElement = this.viewmodel.contacts[id].element;
    this.template.empty(contactElement);

    let innerHTML = this.template
      .generateHTMLFromTemplate('t_contact_innerHTML', contactData);

    contactElement.insertAdjacentHTML('beforeend', innerHTML);
  }

  displayOrHideNoContactsMessage() {
    if (JSON.stringify(this.viewmodel.contacts) === '{}') {
      this.unhide(this.select.noContactsMessage());
    } else {
      this.hide(this.select.noContactsMessage());
    }
  }

  insertTags(tags) {
    let formatedData = {tags: tags.map(tag => {
      return {name: tag};
    })};

    let html = this.template.generateHTMLFromTemplate('t_tags', formatedData);
    let containerFilter = document.querySelector('#c_tags_filter');
    let containerForm = document.querySelector('#c_tags_contact_form');
    containerFilter.insertAdjacentHTML('beforeend', html);
    containerForm.insertAdjacentHTML('beforeend', html);
  }

  insertTag(tag) {
    let formatedData = {name: tag};
    let html = this.template.generateHTMLFromTemplate('t_tag', formatedData);

    let containerFilter = document.querySelector('#c_tags_filter');
    let containerForm = document.querySelector('#c_tags_contact_form');

    containerFilter.insertAdjacentHTML('beforeend', html);
    containerForm.insertAdjacentHTML('beforeend', html);
  }

  filterContacts() {
    let contactElementsFilteredByTag =
      this.viewmodel.findContactElementsWithCheckedTags();
    let contactElementsFilteredBySearch =
      this.viewmodel.findContactElementsBySearch();

    let contactElementsThatPassBothFilters =
      contactElementsFilteredByTag.reduce((filteredElements, element) => {
        if (contactElementsFilteredBySearch.includes(element)) {
          filteredElements.push(element);
        }
        return filteredElements;
      }, []);

    this.showOnlyContacts(...contactElementsThatPassBothFilters);
  }

  showOnlyContacts(...contactElements) {
    Object.values(this.viewmodel.contacts).forEach(contact => {
      if (contactElements.includes(contact.element)) {
        this.unhide(contact.element);
      } else {
        this.hide(contact.element);
      }
    });
  }

  hide(element) {
    element.classList.add('hidden');
    element.classList.remove('show');
  }

  unhide(element) {
    element.classList.add('show');
    element.classList.remove('hidden');
  }

  configContactForm(method, path = undefined) {
    let contactForm = this.select.contactForm();
    switch (method) {
      case 'POST':
        contactForm.dataset.putOverride = false;
        contactForm.dataset.putAction = "";
        break;
      case 'PUT':
        contactForm.dataset.putOverride = true;
        contactForm.dataset.putAction = path;
        break;
    }
  }

  populateContactForm(contactId) {
    let contactData = this.viewmodel.contacts[contactId].data;
    let contactForm = this.select.contactForm();
    let inputs = [...contactForm.querySelectorAll('input')];

    inputs.forEach(input => {
      if (input.type !== 'checkbox') {
        input.value = contactData[input.name];
      } else if (input.type === 'checkbox' && contactData.tags) {
        if (contactData.tags.split(',').includes(input.value)) {
          input.checked = true;
        }
      }
    });
  }
}