const ShoppingListDao = require("../../dao/shoppingLists-dao");

async function GetAllAbl(req, res) {
  let SLDao = new ShoppingListDao();

  try {
    const shoppingLists = await SLDao.getAllLists();
    res.json(shoppingLists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = GetAllAbl;
