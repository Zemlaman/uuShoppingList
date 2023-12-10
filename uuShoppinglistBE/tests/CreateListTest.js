const CreateListAbl = require('../abl/shoppingList-abl/createList-abl');
const assert = require('assert');

describe('CreateListAbl', function() {
    it('should create a new shopping list (happy day scenario)', async function() {
        let res = {
            json: function(data) { this.data = data; return this; },
            status: function(statusCode) { this.statusCode = statusCode; return this; }
        };
        await CreateListAbl({ body: { listName: 'New List', ownerId: '7' } }, res);
        assert.equal(res.statusCode, 200);
        assert.equal(res.data.success, true);
    });

    it('should return error for invalid input', async function() {
        let res = {
            json: function(data) { this.data = data; return this; },
            status: function(statusCode) { this.statusCode = statusCode; return this; }
        };
        await CreateListAbl({ body: {} }, res);
        assert.equal(res.statusCode, 400);
    });

    it('should return error if list already exists', async function() {
        let res = {
            json: function(data) { this.data = data; return this; },
            status: function(statusCode) { this.statusCode = statusCode; return this; }
        };
        await CreateListAbl({ body: { listName: 'My shopping list', ownerId: '1' } }, res);
        assert.equal(res.statusCode, 400);
    });

    it('should handle database errors', async function() {
      let res = {
          json: function(data) { this.data = data; return this; },
          status: function(statusCode) { this.statusCode = statusCode; return this; }
      };
      await CreateListAbl({ body: { listName: 'My shopping list', ownerId: '1' } }, res);
      assert.equal(res.statusCode, 500);
  });
  
});
