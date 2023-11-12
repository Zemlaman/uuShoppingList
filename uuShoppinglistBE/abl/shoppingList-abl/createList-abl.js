const express = require("express");
const app = express();
const parseBody = require("body-parser");
const ShoppingListDao = require("../../dao/shoppingLists-dao");
const path = require("path");

app.use(parseBody.json());
app.use(parseBody.urlencoded({ extended: true }));

let shoppingListDao = new ShoppingListDao(
  path.join(__dirname, "..", "..", "storage", "shoppingLists.json")
);

function CreateListAbl(req, res) {
  let requestData = req.body;

  if (!requestData.listName) {
    return res
      .status(400)
      .json({ error: "Invalid input" });
  }

  let newList = {
    name: requestData.listName,
    ownerId: requestData.ownerId,
    members: [],
    items: [],
    archived: false
  };

  const allLists = shoppingListDao.getAllLists();
  const alreadyExists = allLists.find(
    (list) =>
      list.name === newList.name
  );

  if (alreadyExists) {
    res.status(400);
    return res.json({ error: "List already exists." });
  }

  try {
    newList = listDao.createNewList(newList);
    const message = "Shopping list created!";
    res.send({ success: true, message: message, list: newList });
  } catch (error) {
    res.status(500);
    return res.json({ error: error.message });
  }
}

module.exports = CreateListAbl;