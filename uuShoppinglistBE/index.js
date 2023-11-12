const ShoppingListController = require("./controllers/shoppingLists");
const GetAllLists = require("./abl/shoppingList-abl/getAll-abl");
var express = require("express");
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 8000;

app.use("/shoppingList", ShoppingListController);


app.listen(port);