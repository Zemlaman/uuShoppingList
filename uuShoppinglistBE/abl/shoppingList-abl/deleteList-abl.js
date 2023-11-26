const ShoppingListDao = require("../../dao/shoppingLists-dao");
const path = require("path");
let SLDao = new ShoppingListDao(
  path.join(__dirname, "..", "..", "storage", "shoppingLists.json")
);

async function DeleteListAbl(req, res) {
  const listId = req.params.id;
  
  try {
    const shoppingList = await SLDao.getList(listId);
    if (shoppingList) {
      await SLDao.deleteList(listId);
      res.json({ success: true, message: `List ${listId} was successfully deleted.` });
    } else {
      res.status(404).json({ error: "Shopping list not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = DeleteListAbl;