const ShoppingListDao = require("../dao/shoppingList-dao");
const path = require("path");

const dao = new ShoppingListDao(
  path.join(__dirname, "..", "storage", "shoppingLists.json")
);

function UnarchiveAbl(req, res) {
  const id = req.params.id;

  try {
    const shoppingList = dao.get(id);

    if (shoppingList) {
      if (shoppingList.archived) {
        dao.update(id, { archived: false });
        const successMessage = `Shopping list "${shoppingList.name}" has been successfully unarchived.`;
        res.json({
          success: true,
          message: successMessage,
          shoppingList: { ...shoppingList, archived: false },
        });
      } else {
        res.status(400).json({ error: "Shopping list is not archived." });
      }
    } else {
      res.status(400).json({ error: "Shopping list does not exist." });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = UnarchiveAbl;
