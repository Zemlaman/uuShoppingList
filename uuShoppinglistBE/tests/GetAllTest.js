const GetAllAbl = require('../abl/shoppingList-abl/getAll-abl');
const assert = require('assert');
const ShoppingListDao = require('../dao/shoppingLists-dao');

describe('GetAllAbl', function() {

  it('should return all shopping lists (happy day scenario)', async function() {
    let res = {
      json: function(data) { this.data = data; return this; },
      status: function(statusCode) { this.statusCode = statusCode; return this; }
    };
    await GetAllAbl({}, res);
    assert.equal(res.statusCode, 200);
    assert(Array.isArray(res.data));
  });

  it('should handle empty result', async function() {
    let res = {
      json: function(data) { this.data = data; return this; },
      status: function(statusCode) { this.statusCode = statusCode; return this; }
    };
    ShoppingListDao.prototype.getAllLists = async () => [];
    await GetAllAbl({}, res);
    assert.equal(res.statusCode, 200);
    assert.deepEqual(res.data, []);
  });

  it('should return error if database is unreachable', async function() {
    let res = {
      json: function(data) { this.data = data; return this; },
      status: function(statusCode) { this.statusCode = statusCode; return this; }
    };
    ShoppingListDao.prototype.getAllLists = async () => { throw new Error('Database unreachable'); };
    await GetAllAbl({}, res);
    assert.equal(res.statusCode, 500);
  });

  it('should handle unexpected errors', async function() {
    let res = {
      json: function(data) { this.data = data; return this; },
      status: function(statusCode) { this.statusCode = statusCode; return this; }
    };
    ShoppingListDao.prototype.getAllLists = async () => { throw new Error('Unexpected error'); };
    await GetAllAbl({}, res);
    assert.equal(res.statusCode, 500);
  });
});
