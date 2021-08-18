/*
PROBLEM DESCRIPTION:
item creator: (ItemManager.create)
  -checks information is correct and no missing
item manager: (ItemManager)
  - create items
  - update info about items
  - delete items
  - query info about items
report manager: (ReportManager)
  - generate report for an item
  - generate report for all items
ItemManager:
  - SKUcode. 5 characters = 3 first letters of name + 2 first letters of category
  - name. Minimum of 5 characters. 1 word only
  - category. >= 5 characters. 1 word only
  - quantity. No blank. >=0. Assume valid number will be provided

  * create(): **DONE**
    I: name, category, quantity
    O: return new item. false if fails
  * update():  **DONE**
    I: SKUcode, item object
    O: update info of an item
  * delete(): **DONE**
    I: SKUcode. assume valid SKUcode provided
    O: deletes the item from the list.
  * items(): **DONE**
    I: N/A
    O: return all items
  * inStock: **DONE**
    I: N/A
    O: list all elements with quantity > 0
  * itemsInCategory: **DONE**
    I: category
    O: all items for a given category

ReportManager:
  * init(): **DONE**
    I: ItemManager object
    O: assigns 'items' property to the ItemManager object
  * createReporter():
    I: SKUcode
    O: returns object
      * itemInfo(): logs all properties of an object as key:value pairs
  * reportInStock: **DONE**
    I: N/A
    O: logs item names of all items in stock as comma separated list
RULES:
  - no need to validate uniqueness of SKU codes
  - if one property is not valid, item creator returns an object with a a
    property notValid: true
  - add methods to the item manager as needed
*/
"use strict";

let ItemManager = (function () {
  let items = [];
  return {
    create (name, category, quantity) {
      let SKUcode = this.generateSKU(name, category);
      let item = {
        SKUcode,
        name,
        category,
        quantity,
      };
      if (!this.isItemValid(item)) {
        return false;
      }
      items.push(item);
    },

    update(SKUcode, infoObject) {
      Object.assign(this.getItemBySKU(SKUcode),infoObject);
    },

    delete (SKUcode) {
      items = this.filter(item => item.SKUcode !== SKUcode);
    },

    generateSKU(name,category) {
      return (name.slice(0,3) + category.slice(0,2)).toUpperCase();
    },

    items() {
      console.log(items); // remove
      return items;
    },

    getItemBySKU(SKUcode) {
      return this.filter(item => item.SKUcode === SKUcode)[0];
    },

    isItemValid(item) {
      return (
        this.isNameValid(item.name) && this.isCategoryValid(item.category) &&
        this.isQuantityValid(item.quantity)
      );
    },

    isNameValid(name) {
      const MINIMUM_NBR_OF_CHARS = 5;
      let nameWithNoSpaces = this.removeSpaces(name);
      return nameWithNoSpaces.length >= MINIMUM_NBR_OF_CHARS;
    },

    isCategoryValid(category) {
      const MINIMUM_NBR_OF_CHARS = 5;
      let categoryWithNoSpaces = this.removeSpaces(category);
      return (
        categoryWithNoSpaces.length >= MINIMUM_NBR_OF_CHARS &&
        category === categoryWithNoSpaces
      );
    },

    isQuantityValid(quantity) {
      return (typeof quantity === 'number') && (quantity >= 0);
    },

    inStock() {
      console.log(this.filter(item => item.quantity > 0)); // delete
      return this.filter(item => item.quantity > 0);
    },

    itemsInCategory(category) {
      console.log(this.filter(item => item.category === category));
      return this.filter(item => item.category === category);
    },

    removeSpaces(string) {
      return string.match(/[^ ]/g).join('');
    },

    forEach(callback) {
      items.forEach(callback);
    },

    filter(callback) {
      let filteredElements = [];
      this.forEach(item => {
        if (callback(item)) {
          filteredElements.push(item);
        }
      });
      return filteredElements;
    },
  };
})();

let ReportManager = {
  init(itemManager) {
    this.items = itemManager;
    return this;
  },

  reportInStock() {
    let itemsInStock = this.items.inStock();
    let itemsInStockNames = itemsInStock.map(item => item.name);
    console.log(itemsInStockNames.join(', '));
  },

  createReporter(SKUcode) {
    let itemToReport = Object.assign({},this.items.getItemBySKU(SKUcode));
    itemToReport.itemInfo = function () {
      for (let key in itemToReport) {
        if(key !== 'itemInfo') {
          console.log(`${key}: ${itemToReport[key]}`);
        }
      }
    };

    return itemToReport;
  }
};

ItemManager.create('basket ball', 'sports', 0);           // valid item
ItemManager.create('asd', 'sports', 0);
ItemManager.create('soccer ball', 'sports', 5);           // valid item
ItemManager.create('football', 'sports');
ItemManager.create('football', 'sports', 3);              // valid item
ItemManager.create('kitchen pot', 'cooking items', 0);
ItemManager.create('kitchen pot', 'cooking', 3);          // valid item
// // returns list with the 4 valid items
// ItemManager.items();

ReportManager.init(ItemManager);
// // logs soccer ball,football,kitchen pot
ReportManager.reportInStock();

// ItemManager.update('SOCSP', { quantity: 0 });
// // returns list with the item objects for football and kitchen pot
// ItemManager.inStock();
// // football,kitchen pot
// ReportManager.reportInStock();

// // returns list with the item objects for basket ball, soccer ball, and football
// ItemManager.itemsInCategory('sports');

// ItemManager.delete('SOCSP');
// // returns list the remaining 3 valid items (soccer ball is removed from the list)
// ItemManager.items();

let kitchenPotReporter = ReportManager.createReporter('KITCO');
kitchenPotReporter.itemInfo();
// // logs
// // skuCode: KITCO
// // itemName: kitchen pot
// // category: cooking
// // quantity: 3

// ItemManager.update('KITCO', { quantity: 10 });
// kitchenPotReporter.itemInfo();
// // logs
// // skuCode: KITCO
// // itemName: kitchen pot
// // category: cooking
// // quantity: 10
