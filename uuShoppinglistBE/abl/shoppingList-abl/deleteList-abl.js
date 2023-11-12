const ShoppingListDao = require("../../dao/shoppingLists-dao");
const path = require("path");
let ShoppingListDao = new ShoppingListDao(
  path.join(__dirname, "..", "..", "storage", "shoppingLists.json")
);

function DeleteListAbl(req, res) {
  const shoppingList = ShoppingListDao.getList(req.params.id);

  const listToDelete = { ...shoppingList, ...req.params };
  if (shoppingList) {
    ShoppingListDao.removeList(shoppingList);
  } else {
    res.status(400).json({ error: "error" });
  }

  res.json(`Delete was succesfull!`);
}
module.exports = DeleteListAbl;