var express = require("express");
var router = express.Router();
const CreateAbl = require("../abl/create-abl");
const GetAbl = require("../abl/get-abl");
const ListAll = require("../abl/list-all-abl");
const DeleteAbl = require("../abl/delete-abl");
const UpdateAbl = require("../abl/update-abl");
const ArchiveAbl = require("../abl/archive-abl");
const UnarchiveAbl = require("../abl/unarchive-abl");
const AddMemberAbl = require("../abl/add-member-abl");
const RemoveMemberAbl = require("../abl/remove-member-abl");
const AddItemAbl = require("../abl/add-item-abl");
const RemoveItemAbl = require("../abl/remove-item-abl");
const CheckItemAbl = require("../abl/check-item-abl");

router.get("/get/:id", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  GetAbl(req, res);
});

router.get("/list", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  ListAll(req, res);
});


router.post("/create", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  CreateAbl(req, res);
});

router.post("/archive/:id", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  ArchiveAbl(req, res);
});

router.post("/unarchive/:id", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  UnarchiveAbl(req, res);
});

router.post("/addItem/:id", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  AddItemAbl(req, res);
});

router.post("/checkItem/:id", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  CheckItemAbl(req, res);
});

router.post("/removeItem/:id", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  RemoveItemAbl(req, res);
});

router.post("/addMember/:id", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  AddMemberAbl(req, res);
});

router.post("/removeMember/:id", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  RemoveMemberAbl(req, res);
});

router.put("/update/:id", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  UpdateAbl(req, res);
});


router.delete("/delete/:id", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  DeleteAbl(req, res);
});

module.exports = router;
