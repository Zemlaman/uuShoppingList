const getListAbl = require('../abl/shoppingList-abl/getList-abl');
const assert = require('assert');

describe('GetListAbl', function() {


  it('should return a shopping list by id (happy day scenario)', async function() {
    const result = await getListAbl({ id: '65639c13588c34bec5e20e7c' });
    assert.equal(result.success, true);
    assert.equal(result.list.id, '65639c13588c34bec5e20e7c');
  });

  it('should return error for invalid id', async function() {
    try {
      await getListAbl({ id: 'neplatné_id' });
      assert.fail('should have thrown an error');
    } catch (e) {
      assert.equal(e.status, 400);
      assert.equal(e.message, 'Invalid ID format');
    }
  });

  it('should return error if list does not exist', async function() {
    try {
      await getListAbl({ id: 'neexistující_id' });
      assert.fail('should have thrown an error');
    } catch (e) {
      assert.equal(e.status, 404);
      assert.equal(e.message, 'List not found');
    }
  });

  it('should handle database errors', async function() {
    try {
      await getListAbl({ id: '65639c13588c34bec5e20e7c' });
      assert.fail('should have thrown an error');
    } catch (e) {
      assert.equal(e.status, 500);
      assert.equal(e.message, 'Internal Server Error');
    }
  });
});
