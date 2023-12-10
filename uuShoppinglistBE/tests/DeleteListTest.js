const DeleteListAbl = require('../abl/shoppingList-abl/deleteList-abl');
const assert = require('assert');
const ShoppingListDao = require('../dao/shoppingLists-dao');

describe('DeleteListAbl', function() {
    it('should delete a shopping list by id (happy day scenario)', async function() {
        let res = {
            json: function(data) { this.data = data; return this; },
            status: function(statusCode) { this.statusCode = statusCode; return this; }
        };
        ShoppingListDao.prototype.deleteList = async () => ({ deletedCount: 1 });
        await DeleteListAbl({ params: { id: '6563aacb99e59f499fbc215a' } }, res);
        assert.equal(res.statusCode, 200);
        assert.equal(res.data.success, true);
        assert.equal(res.data.deletedCount, 1);
    });

    it('should return 404 if the list does not exist', async function() {
        let res = {
            json: function(data) { this.data = data; return this; },
            status: function(statusCode) { this.statusCode = statusCode; return this; }
        };
        ShoppingListDao.prototype.deleteList = async () => ({ deletedCount: 0 });
        await DeleteListAbl({ params: { id: '42039c13588c34bec5e20e7d' } }, res);
        assert.equal(res.statusCode, 404);
    });

    it('should return 500 on server error', async function() {
        let res = {
            json: function(data) { this.data = data; return this; },
            status: function(statusCode) { this.statusCode = statusCode; return this; }
        };
        ShoppingListDao.prototype.deleteList = async () => { throw new Error('Unexpected error'); };
        await DeleteListAbl({ params: { id: '65639c13588c34bec5e20e7d' } }, res);
        assert.equal(res.statusCode, 500);
    });
});
