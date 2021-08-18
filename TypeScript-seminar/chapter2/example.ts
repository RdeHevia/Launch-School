// @ts-check
/* eslint-disable */

/**
 * Hi! Welcome to the files from the first chapter in TypeScript
 * in 50 lessons!
 *
 * You find all the necessary files to get started for chapter 1 and
 * to follow along the examples.
 *
 * You can ignore the output on the right and focus on the red
 * squigglies below!
 */

// To start, add // @ts-check
// on the top of the file
/**
 * @typedef {Object} StorageItem
 * @property {number} weight
 */

/**
 * @typedef {Object} ShipStorage
 * @property {number} max
 * @property {StorageItem[]} items
 */

/** @type ShipStorage */
const storage = {
  max: undefined,
  items: []
};

Object.defineProperty(storage, "max", { writable: false, value: 5000 });

let currentStorage = undefined;

function storageUsed() {
  if (currentStorage) {
    return currentStorage;
  }
  currentStorage = 0;
  for (let i = 0; i < storage.items.length; i++) {
    currentStorage += storage.items[i].weight;
  }
  return currentStorage;
}

/**
 *
 * @param {StorageItem} item
 */
function add(item) {
  if (storage.max - item.weight >= storageUsed()) {
    storage.items.push(item);
    currentStorage += item.weight;
  }
}
