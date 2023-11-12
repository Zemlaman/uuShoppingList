const ShoppingListDao = require("../../dao/shoppingLists-dao");

let shoppingListDao = new ShoppingListDao();

async function ArchiveListAbl(req, res) {
  const id = req.params.id;
  try {
    const shoppingList = await shoppingListDao.getList(id);
    if (shoppingList) {
      shoppingList.archived = true;
      await shoppingListDao.getList(id, shoppingList);
      res.json({ success: true, message: "Shopping list is succesfully archived." });
    } else {
      res.status(404).json({ error: "Shopping list not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = ArchiveListAbl;