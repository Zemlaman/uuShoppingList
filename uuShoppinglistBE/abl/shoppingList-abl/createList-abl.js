const ShoppingListDao = require("../../dao/shoppingLists-dao");

  async function CreateListAbl(req) {
    let SLDao = new ShoppingListDao();
    let requestData = req.body;
  
    if (!requestData.listName) {
      return { status: 400, data: { error: "Invalid input" }};
    }

  let newList = {
    name: requestData.listName,
    ownerId: requestData.ownerId,
    members: [],
    items: [],
    archived: false
  };

  try {
    const allLists = await SLDao.getAllLists();
    const alreadyExists = allLists.some(list => list.name === newList.name);

    if (alreadyExists) {
      return { status: 400, data: { error: "List already exists." }};
    }

    const createdList = await SLDao.createNewList(newList);
    return { status: 200, data: { success: true, message: "Shopping list created!", list: createdList }};
  } catch (error) {
    return { status: 500, data: { error: error.message }};
  }
}

module.exports = CreateListAbl;
