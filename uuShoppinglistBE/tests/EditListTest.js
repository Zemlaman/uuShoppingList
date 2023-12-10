const updateListAbl = require('../abl/shoppingList-abl/updateList-abl');
const assert = require('assert');

describe('UpdateListAbl', function() {

  it('should update a shopping list by id (happy day scenario)', async function() {
    const result = await updateListAbl({ id: '65639c13588c34bec5e20e7c', updateData: { newItems: ['pomeranče'] } });
    assert.equal(result.success, true);
    assert.deepStrictEqual(result.updatedList.items, ['pomeranče']);
  });

  it('should return error if list does not exist', async function() {
    try {
      await updateListAbl({ id: '42039c13588c34bec5e20e7c', updateData: { newItems: ['pomeranče'] } });
      assert.fail('should have thrown an error');
    } catch (e) {
      assert.equal(e.status, 404);
      assert.equal(e.message, 'List not found');
    }
  });

  it('should handle database errors', async function() {
    try {
      await updateListAbl({ id: '65639c13588c34bec5e20e7c', updateData: { newItems: ['pomeranče'] } });
      assert.fail('should have thrown an error');
    } catch (e) {
      assert.equal(e.status, 500);
      assert.equal(e.message, 'Internal Server Error');
    }
  });
});
