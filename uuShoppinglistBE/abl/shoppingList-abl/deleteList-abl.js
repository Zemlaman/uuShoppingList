const ShoppingListDao = require("../../dao/shoppingLists-dao");
const path = require("path");
let SLDao = new ShoppingListDao(
  path.join(__dirname, "..", "..", "storage", "shoppingLists.json")
);

function DeleteListAbl(req, res) {
  const shoppingList = SLDao.getList(req.params.id);

  const listToDelete = { ...shoppingList, ...req.params };
  if (shoppingList) {
    SLDao.removeList(shoppingList);
  } else {
    res.status(400).json({ error: "error" });
  }

  res.json(`Delete was succesfull!`);
}
module.exports = DeleteListAbl;