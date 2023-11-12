const ShoppingListDao = require("../../dao/shoppingLists-dao");
const path = require("path");

let ShoppingListDao = new ShoppingListDao(
  path.join(__dirname, "..", "..", "storage", "shoppingLists.json")
);

function GetAllAbl(req, res) {
  const shoppingList = ShoppingListDao.getList();


  res.json(shoppingList);
}

module.exports = GetAllAbl;