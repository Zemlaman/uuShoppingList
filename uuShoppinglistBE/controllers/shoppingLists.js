var express = require("express");
var router = express.Router();
const CreateList = require("../abl/shoppingList-abl/createList-abl");
const GetLIst = require("../abl/shoppingList-abl/getList-abl");
const GetAllLists = require("../abl/shoppingList-abl/getAll-abl");
const DeleteList = require("../abl/shoppingList-abl/deleteList-abl");
const UpdateList = require("../abl/shoppingList-abl/updateLists-abl");
const ArchiveList = require("../abl/shoppingList-abl/archiveList-abl");
const Invite = require("../abl/shoppingList-abl/invite-abl");
const ItemDone = require("../abl/shoppingList-abl/itemDone-abl");
const RemoveItem = require("../abl/shoppingList-abl/removeItem-abl");

//create a list
router.post("/create", function (req, res) {
    res.setHeader("Content-Type", "application/json");
    CreateList(req, res);
});

//get list by id
router.get("/get/:id", function (req, res) {
    res.setHeader("Content-Type", "application/json");
    GetLIst(req, res);
});

// returns all lists
router.get("/list", function (req, res) {
    res.setHeader("Content-Type", "application/json");
    GetAllLists(req, res);
});

//delete a certain shopping list by its ID
router.delete("/delete/:id", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    DeleteList(req, res);
});

//delete shopping list 
router.delete("/delete/:id", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    DeleteAbl(req, res);
});

//update shopping list
router.put("/update/:id", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    UpdateList(req, res);
});

// archive shopping list
router.put("/archive/:id", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    ArchiveList(req, res);
});

// invite a user
router.post("/invite/:id", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    Invite(req, res);
});

// mark item as done
router.put("/itemDone/:listId/:itemId", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    ItemDone(req, res);
});

// delete an item 
router.delete("/itemDelete/:listId/:itemId", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    RemoveItem(req, res);
});

module.exports = router;



