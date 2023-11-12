const ShoppingListDao = require("../../dao/shoppingLists-dao");

let ShoppingListDao = new ShoppingListDao();

async function InviteAbl(req, res) {
  const id = req.params.id;
  const newListUser = req.body.member;
  try {
    const shoppingList = await ShoppingListDao.getList(id);
    if (shoppingList) {
      shoppingList.members.push(newListUser);
      await ShoppingListDao.updateList(id, shoppingList);
      res.json({ success: true, message: "Invite was succesfull." });
    } else {
      res.status(404).json({ error: "Shopping list not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = InviteAbl;