const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
import { shoppingLists } from '../src/data/data';


export const mockApi = {
  getShoppingLists: async () => {
    await delay(500); 
    return shoppingLists;
  },
  
  addShoppingList: async (list) => {
    await delay(500);
    const newList = { ...list, id: shoppingLists.length + 1 };
    shoppingLists.push(newList);
    return newList;
  },

  updateShoppingList: async (listId, updatedList) => {
    await delay(500);
    const listIndex = shoppingLists.findIndex(list => list.id === listId);
    if (listIndex > -1) {
      shoppingLists[listIndex] = { ...shoppingLists[listIndex], ...updatedList };
      return shoppingLists[listIndex];
    } else {
      throw new Error('List not found');
    }
  },

  deleteShoppingList: async (listId) => {
    await delay(500);
    const listIndex = shoppingLists.findIndex(list => list.id === listId);
    if (listIndex > -1) {
      shoppingLists.splice(listIndex, 1);
      return { message: 'List deleted successfully' };
    } else {
      throw new Error('List not found');
    }
  },

};

export default mockApi;
