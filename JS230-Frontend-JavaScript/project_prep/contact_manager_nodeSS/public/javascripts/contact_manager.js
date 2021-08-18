/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */
import {ViewModel} from './view_model.js';

class Connect {
  async fetchContacts() {
    return (await fetch('/api/contacts')).json();
  }
  async fetchContact(id) {}
  // async postNewContact(json) {
  // }
  async ajaxJSON(method, path, json = undefined) {
    let config = {
      method,
      headers: {"Content-Type": "application/json"},
      path,
    };

    if (method.toUpperCase() !== 'GET' || json) config.body = json;

    let response = await fetch(path, config);

    if (this.isSuccessful(response) && method.toUpperCase() !== 'DELETE') {
      return response.json();
    } else if (this.isSuccessful(response) && method.toUpperCase() === 'DELETE') {
      return undefined;
    } else {
      console.log(`${response.status} (${response.statusText})`);
      return undefined;
    }
  }
  // async putContact(id) {}
  // async deleteContact(id) {}

  isSuccessful(response) {
    let statusCode = response.status;
    return statusCode >= 200 && statusCode <= 299;
  }
}

class ContactManagerUI extends ViewModel {
  constructor() {
    super();
    this.connect = new Connect();

    this.updateViewData('checkedTags', []);
    this.updateViewData('nameSearch', '');
  }

  async load() {
    this.updateViewData('d_tags',{tags:[{name:'work'}, {name:'friend'}]});
    // delete tags data

    this.registerContainers('.container');
    this.initializeTemplates();

    await this.fetchContacts();

    this.renderFullContentOf('c_contacts');
    this.renderFullContentOf('c_tags_filter');
    this.renderFullContentOf('c_tags_contact');
  }

  async fetchContacts() {
    let contacts = await this.connect.fetchContacts();
    this.updateViewData('d_contacts', {contacts});
  }

  accessContactFromViewStore(contactId) {
    let contacts = this.getViewData('d_contacts').contacts;
    return contacts.find(contact => String(contact.id) === String(contactId));
  }

  updateContactInViewStore(editedContactData) {
    let existingContactData =
      this.accessContactFromViewStore(editedContactData.id);

    Object.assign(existingContactData, editedContactData);
  }

  populateContactForm(contactId) {
    let contact = this.accessContactFromViewStore(contactId);
    let contactForm = this.selectContactForm();
    let inputs = [...contactForm.querySelectorAll('input')];

    inputs.forEach(input => {
      if (input.type !== 'checkbox') {
        input.value = contact[input.name];
      } // handle checkbox pending
    });
  }

  selectContactForm() {
    return document.querySelector('#contact_form');
  }

  selectCommentContainer() {
    return document.querySelector('#c_contacts');
  }

  bindListeners() {
    let newTagLink = document.querySelector('a.new_tag');
    let addContactLinks = [...document.querySelectorAll('a.add_contact')];
    let contactForm = document.querySelector('#contact_form');
    let cancelButton = document.querySelector('#contact_form #cancel');
    let contactsContainer = document.querySelector('#c_contacts');
    let filteringTags = document.querySelector('#c_tags_filter');
    let searchInput = document.querySelector('#search');

    newTagLink.addEventListener('click', event => this.handleNewTag(event));

    addContactLinks.forEach(link => {
      link.addEventListener('click', event => this.handleShowContactForm(event));
    });

    contactForm.addEventListener('submit', event => {
      this.handleContact(event);
    });

    cancelButton.addEventListener('click', event => {
      this.handleCancelButton(event);
    });

    contactsContainer.addEventListener('click', event => {
      this.handleEditOrDeleteContact(event);
    });

    filteringTags.addEventListener('input', event => {
      this.handleTagFiltering(event);
    });

    searchInput.addEventListener('input', event => this.handleSearchContact(event));
  }

  handleNewTag(event) {
    event.preventDefault();

    let newTag = document.querySelector('input.new_tag').value;
    this.registerNewTag(newTag);
    this.renderLastTag();
  }

  handleShowContactForm(event) {
    event.preventDefault();
    this.hide(this.selectCommentContainer());
    this.unhide(this.selectContactForm());
  }

  handleCancelButton(event) {
    event.preventDefault();
    let contactForm = this.selectContactForm();
    contactForm.reset();
    this.hide(contactForm);
    this.unhide(this.selectCommentContainer());
  }

  async handleContact(event) {
    event.preventDefault();
    let form = event.target;
    if (form.dataset.putOverride === "true") {
      await this.putContact(form);
      this.renderFullContentOf('c_contacts');
      this.configContactForm('POST');
    } else {
      await this.postNewContact(form);
      this.renderLastContact();
      this.filterContacts();
    }
    form.reset();
    this.hide(form);
    this.unhide(this.selectCommentContainer());
  }

  async handleEditOrDeleteContact(event) {
    event.preventDefault();
    if (event.target.tagName !== 'A') return;

    let method = event.target.dataset.method;
    let path = event.target.href;

    if (method === 'PUT') {
      console.log('put');

      let contactId = +path.match(/[0-9]+$/)[0];
      this.configContactForm(method, path);
      this.populateContactForm(contactId);
      this.hide(this.selectCommentContainer());
      this.unhide(this.selectContactForm());
    } else if (method === 'DELETE') {
      await this.deleteContact(path);
      this.renderFullContentOf('c_contacts');
    }
  }

  handleTagFiltering(event) {
    event.preventDefault();

    let tagName = event.target.value;
    let checked = JSON.parse(event.target.checked);

    if (checked) {
      this.addToCheckedTags(tagName);
    } else {
      this.removeFromCheckedTags(tagName);
    }

    this.filterContacts();
  }

  handleSearchContact(event) {
    /*
    - read value
    - this.viewData.nameSearch = value
    - filterContactsByTag()
    - filterContactsByName()
    */

    let search = event.target.value.toLowerCase();
    this.viewData.nameSearch = search;
    this.filterContacts();
  }

  configContactForm(method, path = undefined) {
    let contactForm = document.querySelector('#contact_form');
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

  async postNewContact(contactForm) {
    let method = contactForm.method;
    let path = contactForm.action;
    let json = this.serializeContactFormToJSON(contactForm);

    let newContact = await this.connect.ajaxJSON(method, path, json);
    if (!newContact) return;
    this.registerNewContact(newContact);
  }

  async putContact(contactForm) {
    let method = 'PUT';
    let path = contactForm.dataset.putAction;
    let json = this.serializeContactFormToJSON(contactForm);

    let editedContact = await this.connect.ajaxJSON(method, path, json);
    if (!editedContact) return;
    this.updateContactInViewStore(editedContact);
  }

  serializeContactFormToJSON(contactForm) {
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

  async deleteContact(path) {
    if (!confirm('Do you want to delete the contact?')) return;

    await this.connect.ajaxJSON('DELETE', path);
    await this.fetchContacts();
  }

  registerNewContact(newContact) {
    let contacts = this.getViewData('d_contacts').contacts;
    contacts.push(newContact);
  }

  registerNewTag(tag) {
    let tags = this.getViewData('d_tags').tags;
    tags.push({name: tag});
  }

  addToCheckedTags(tag) {
    this.viewData.checkedTags.push(tag);
  }

  removeFromCheckedTags(uncheckedTag) {
    let checkedTags = this.viewData.checkedTags.filter(tag => tag !== uncheckedTag);
    this.updateViewData('checkedTags', checkedTags);
  }

  renderLastTag() {
    let tags = this.getViewData('d_tags').tags;
    let lastTag = tags[tags.length - 1];
    let html = this.generateContentFromTemplate('t_tag', lastTag);
    this.injectContentIntoContainer(html, 'c_tags_filter');
    this.injectContentIntoContainer(html, 'c_tags_contact');
  }

  renderLastContact() {
    let contacts = this.getViewData('d_contacts').contacts;
    let lastContact = contacts[contacts.length - 1];
    let html = this.generateContentFromTemplate('t_contact', lastContact);
    this.injectContentIntoContainer(html, 'c_contacts');
  }

  hide(element) {
    element.classList.add('hidden');
  }

  unhide(element) {
    element.classList.remove('hidden');
  }

  filterContacts() {
    let idsFilteredByTag = this.getContactIdsWithCheckedTags();
    let idsFilteredBySearch = this.getContactIdsThatMatchSearch();
    let intersectionOfIds =
      idsFilteredByTag.filter(idByTag => idsFilteredBySearch.includes(idByTag));
    this.displayContactsById(...intersectionOfIds);
  }

  displayContactsById(...ids) {
    let contacts = [...document.querySelectorAll('.contact')];
    contacts.forEach(contact => {
      if (ids.includes(+contact.dataset.contactId)) {
        this.unhide(contact);
      } else {
        this.hide(contact);
      }
    });
  }

  getContactIdsWithCheckedTags() {
    let checkedTags = this.viewData.checkedTags;

    let contacts = this.getViewData('d_contacts').contacts;

    if (checkedTags.length === 0) {
      return contacts.map(contact => contact.id);
    }

    let contactIdsFiltered = contacts
      .filter(contact => {
        if (!contact.tags) return false;
        let contactTags = contact.tags.split(',');
        return checkedTags.every(checkedTag => contactTags.includes(checkedTag));
      })
      .map(contact => contact.id);

    return contactIdsFiltered;
  }

  getContactIdsThatMatchSearch() {
    let search = this.viewData.nameSearch;

    let contacts = this.getViewData('d_contacts').contacts;

    if (search === '') {
      return contacts.map(contact => contact.id);
    }
    let regexSearch = new RegExp(`^${search}`,'i');
    let contactIdsFiltered = contacts
      .filter(contact => !!contact.full_name.match(regexSearch))
      .map(contact => contact.id);

    return contactIdsFiltered;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let contactManagerUI = new ContactManagerUI();
  contactManagerUI.load();
  contactManagerUI.bindListeners();
});