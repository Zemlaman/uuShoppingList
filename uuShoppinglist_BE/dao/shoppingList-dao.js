"use-strict";
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DEFAULT_STORAGE_PATH = path.join(
  __dirname,
  "server",
  "storage",
  "shoppingList.json"
);

class ShoppingListDao {
  constructor(storagePath) {
    this.shoppingListStoragePath = storagePath ? storagePath : DEFAULT_STORAGE_PATH;
  }

  create(object) {
    let shoppingList = this._listAll();
    object.id = crypto.randomBytes(8).toString("hex");
    shoppingList.push(object);
    fs.writeFileSync(this._getStoragePath(), JSON.stringify(shoppingList));
    return object;
  }

  edit(object) {
    return object;
  }

  delete(object) {
    let shoppingList = this._listAll().filter(
      (list) => list.id !== object.id
    );
    fs.writeFileSync(this._getStoragePath(), JSON.stringify(shoppingList));
  }

  update(id, newData) {
    let shoppingList = this._listAll();

    const index = shoppingList.findIndex((list) => list.id === id);
    console.log(id, index);
    if (index !== -1) {
      shoppingList[index] = { ...shoppingList[index], ...newData };
      fs.writeFileSync(this._getStoragePath(), JSON.stringify(shoppingList));
      console.log(shoppingList);
    }
  }

  list() {
    return this._listAll() || [];
  }

  get(id) {
    return this._listAll().find((list) => list.id === id);
  }

  _listAll() {
    let listAll;
    try {
      const fileData = fs.readFileSync(this._getStoragePath());
      if (fileData) listAll = JSON.parse(fileData);
    } catch (e) {
      listAll = [];
    }
    return listAll;
  }

  _getStoragePath() {
    return this.shoppingListStoragePath;
  }
}

module.exports = ShoppingListDao;
