const GetAllAbl = require('../abl/shoppingList-abl/getAll-abl');
const assert = require('assert');

describe('GetAllAbl', function() {

    it('should return all shopping lists (happy day scenario)', async function() {
        let res = { 
          json: function(data) { this.data = data; }, 
          status: function(statusCode) { this.statusCode = statusCode; return this; }
        };
        await GetAllAbl({}, res);
        assert.equal(res.statusCode, 200);
        assert(Array.isArray(res.data));
      });
      

  it('should handle empty result', async function() {
    let res = { json: function(data) { this.data = data; }, status: function(statusCode) { this.statusCode = statusCode; return this; }};
    await GetAllAbl({}, res);
    assert.equal(res.statusCode, 200);
    assert.equal(res.data.length, 0);
  });

  it('should return error if database is unreachable', async function() {
    let res = { json: function(data) { this.data = data; }, status: function(statusCode) { this.statusCode = statusCode; return this; }};
    try {
      await GetAllAbl({}, res);
      assert.fail('should have thrown an error');
    } catch (e) {
      assert.equal(e.status, 500);
      assert.equal(e.message, 'Database is unreachable');
    }
  });

  it('should handle unexpected errors', async function() {
    let res = { json: function(data) { this.data = data; }, status: function(statusCode) { this.statusCode = statusCode; return this; }};
    try {
      await GetAllAbl({}, res);
      assert.fail('should have thrown an error');
    } catch (e) {
      assert.equal(e.status, 500);
      assert.equal(e.message, 'Internal Server Error');
    }
  });
});
