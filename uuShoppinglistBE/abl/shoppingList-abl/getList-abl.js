const ShoppingListDao = require("../../dao/shoppingLists-dao");
const path = require("path");

let ShoppingListDao = new ShoppingListDao(
  path.join(__dirname, "..", "..", "storage", "shoppingLists.json")
);

function GetListAbl(req, res) {
  const shoppingList = ShoppingListDao.getList(req.params.id);
  if (shoppingList) {
    res.json(shoppingList);
  } else {
    res.status(400).json({ error: "Shopping list not found." });
  }
}

module.exports = GetListAbl;