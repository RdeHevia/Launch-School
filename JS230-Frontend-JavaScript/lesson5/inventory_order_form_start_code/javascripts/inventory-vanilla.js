var inventory;

(function() {
  inventory = {
    lastId: 0,
    collection: [],
    setDate: function() {
      var date = new Date();
      document.querySelector("#order_date").textContent = date.toUTCString();
    },
    cacheTemplate: function() {
      let iTmpl = document.querySelector("#inventory_item");
      this.template = Handlebars.compile(iTmpl.innerHTML);
      // iTmpl.remove();
    },
    add: function() {
      this.lastId++;
      var item = {
        id: this.lastId,
        name: "",
        stock_number: "",
        quantity: 1
      };
      this.collection.push(item);

      return item;
    },
    remove: function(idx) {
      this.collection = this.collection.filter(function(item) {
        return item.id !== idx;
      });
    },
    get: function(id) {
      var found_item;

      this.collection.forEach(function(item) {
        if (item.id === id) {
          found_item = item;
          return false;
        }
      });

      return found_item;
    },
    update: function(item) {
      var id = this.findID(item),
          itemData = this.get(id);

      itemData.name = item.querySelector('[name^="item_name"]').value;
      itemData.stock_number = item.querySelector('[name^="item_stock_number"]').value;
      itemData.quantity = item.querySelector('[name^="item_quantity"]').value;
    },
    newItem: function(e) {
      e.preventDefault();
      let item = this.add();
      let itemHTML = this.template({ID: item.id});

      document.querySelector("#inventory").insertAdjacentHTML('beforeend',itemHTML);
    },
    findParent: function(e) {
      return e.target.closest("tr");
    },

    findID: function(item) {
      return +item.querySelector("input[type=hidden]").value;
    },

    deleteItem: function(e) {
      e.preventDefault();

      if ([...document.querySelectorAll("a.delete")].includes(e.target)) {
        let item = this.findParent(e);
        this.remove(this.findID(item));
        item.remove();
      }

    },
    updateItem: function(e) {
      if ([...document.querySelectorAll('input')].includes(e.target)) {
        let item = this.findParent(e);
        this.update(item);
      }
    },
    bindEvents: function() {
      document.querySelector("#add_item").addEventListener('click', this.newItem.bind(this));
      document.querySelector("#inventory").addEventListener('click', this.deleteItem.bind(this));
      document.querySelector("#inventory").addEventListener('focusout', this.updateItem.bind(this));
    },
    init: function() {
      this.setDate();
      this.cacheTemplate();
      this.bindEvents();
    }
  };
})();

document.addEventListener('DOMContentLoaded', inventory.init.bind(inventory));
