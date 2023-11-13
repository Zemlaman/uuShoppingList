const ShoppingListDao = require("../../dao/shoppingLists-dao");

let SLDao = new ShoppingListDao();

async function RemoveItemAbl(req, res) {
  const listId = req.params.listId;
  const itemId = req.params.itemId;
  try {
    const shoppingList = await SLDao.getList(listId);
    if (shoppingList) {
      shoppingList.items = shoppingList.items.filter(item => item.id !== itemId);
      await SLDao.updateList(listId, shoppingList);
      res.json({ success: true, message: "Item succesfully deleted." });
    } else {
      res.status(404).json({ error: "Shopping list not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = RemoveItemAbl;