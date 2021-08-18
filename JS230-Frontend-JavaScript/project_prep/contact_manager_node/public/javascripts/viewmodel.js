"use strict";
import {DOMSelector} from './DOMselector.js';

export class ViewModel {
  constructor () {
    this.contacts = {};
    this.tags = {};
    this.searchString = '';
    this.select = new DOMSelector();
  }

  updateContactData(contactData) {
    let formatedData = contactData;
    let id = formatedData.id;
    let contact = this.contacts[id];
    contact.data = formatedData;
  }

  deleteContactFromModel(contactId) {
    delete this.contacts[contactId];
  }

  extractTagsFromContacts(contacts) {
    let tags = contacts.reduce((tagsFound, contact) => {
      if (!contact.tags) return tagsFound;

      let contactTags = contact.tags.split(',');
      contactTags.forEach(contactTag => {
        if (!tagsFound.includes(contactTag)) tagsFound.push(contactTag);
      });

      return tagsFound;
    }, []);

    return tags;
  }

  updateTagCheckStatus(id, checked) {
    this.tags[id].checked = checked;
  }

  bindDataToAllContactElements(contactsData) {
    contactsData.forEach(contactData => {
      this.bindDataToContactElement(contactData);
    });
  }

  bindDataToContactElement(contactData) {
    let id = contactData.id;
    if (this.contacts.hasOwnProperty(id)) {
      this.contacts[id].data = contactData;
    } else {
      let contactElement = this.select.contactByDatasetContactId(id);
      this.contacts[id] = {element: contactElement, data: contactData};
    }
  }

  bindDataToAllTagElements(tagsData) {
    tagsData.forEach(tagData => this.bindDataToTagElement(tagData));

  }

  bindDataToTagElement(tagData) {
    let id = tagData;
    let tagElements = [...document.querySelectorAll(`[data-tag-id="${id}"]`)];
    this.tags[id] = {elements: tagElements, data: tagData, checked: false};
  }

  findContactElementsWithCheckedTags() {
    let checkedTags = Object.values(this.tags).reduce((names, tag) => {
      let name = tag.data;
      if (tag.checked) names.push(name);
      return names;
    }, []);

    let contactElementsFiltered = Object.values(this.contacts)
      .reduce((elements, contact) => {
        if (!contact.data.tags) return elements;

        let contactTags = contact.data.tags.split(',');
        if (checkedTags.every(checkedTag => contactTags.includes(checkedTag))) {
          elements.push(contact.element);
        }

        return elements;
      }, []);

    return contactElementsFiltered;
  }

  findContactElementsBySearch() {
    let searchRegex = new RegExp(`^${this.searchString}`,'i');

    let contactElementsFiltered = Object.values(this.contacts)
      .reduce((elements, contact) => {
        if (contact.data.full_name.match(searchRegex)) {
          elements.push(contact.element);
        }

        return elements;
      }, []);

    return contactElementsFiltered;
  }
}