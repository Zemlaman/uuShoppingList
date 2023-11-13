"use strict";
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DEFAULT_FILE_PATH = path.join(
    __dirname,
    "server",
    "storage",
    "shoppingLists.json"
);

class ListsDataAccessObject {
    constructor(filePath) {
        this.filePath = filePath || DEFAULT_FILE_PATH;
    }

    getListFilePath() {
        return this.filePath;
    }

    getList(listId) {
        return this.getAllLists().find((list) => list.id === listId);
    }

    getAllLists() {
        try {
            const fileContents = fs.readFileSync(this.getListFilePath());
            return fileContents ? JSON.parse(fileContents) : [];
        } catch (error) {
            return [];
        }
    }

    createNewList(list) {
        let allLists = this.getAllLists();
        list.id = crypto.randomBytes(8).toString("hex");
        allLists.push(list);
        fs.writeFileSync(this.getListFilePath(), JSON.stringify(allLists));
        return list;
    }

    updateList(id, updatedData) {
        let allLists = this.getAllLists();
        const listIndex = allLists.findIndex((list) => list.id === id);
        if (listIndex !== -1) {
            allLists[listIndex] = { ...allLists[listIndex], ...updatedData };
            fs.writeFileSync(this.getListFilePath(), JSON.stringify(allLists));
            return allLists[listIndex];
        }
        return null;
    }

    deleteList(listId) {
        let allLists = this.getAllLists().filter((list) => list.id !== listId);
        fs.writeFileSync(this.getListFilePath(), JSON.stringify(allLists));
    }
}

module.exports = ListsDataAccessObject;