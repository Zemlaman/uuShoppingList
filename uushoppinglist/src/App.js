import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


const initialItems = [
  'Apples',
  'Cola',
  'Bananas',
  'Spaghetti',
  'Bread',
  'Butter',
  'Milk',
  'Chilli',
  'Beef',
  'Chicken',
  'Eggs',
  'Cheese',
  'Potatoes',
  'Onions',
  'Tomatoes',
  'Preworkout',
  'Monster',
  'Beer',
];


const initialMembers = ['Oliver', 'Jacob', 'Lukas'];

function ShoppingListApp() {
  const [listName, setListName] = useState('Shopping List');
  const [items, setItems] = useState([]);
  const [selectedFood, setSelectedFood] = useState('');
  const [foodQuantity, setFoodQuantity] = useState(1);
  const [members, setMembers] = useState(initialMembers);
  const [currentUser, setCurrentUser] = useState('');
  const [filter, setFilter] = useState('all');

  const addItem = () => {
    if (selectedFood && !items.some((item) => item.food === selectedFood)) {
      const newItem = {
        food: selectedFood,
        quantity: foodQuantity,
        completed: false,
      };
      setItems([...items, newItem]);
      setSelectedFood('');
    }
  };

  const removeItem = (food) => {
    const updatedItems = items.filter((item) => item.food !== food);
    setItems(updatedItems);
  };

  const toggleItemCompletion = (food) => {
    const updatedItems = [...items];
    const itemToUpdate = updatedItems.find((item) => item.food === food);
    if (itemToUpdate) {
      itemToUpdate.completed = !itemToUpdate.completed;
      setItems(updatedItems);
    }
  };

  const changeListName = (newName) => {
    setListName(newName);
  };

  const addMember = (member) => {
    setMembers([...members, member]);
  };

  const removeMember = (member) => {
    const updatedMembers = members.filter((m) => m !== member);
    setMembers(updatedMembers);
  };

  const becameUser = () => {
    setCurrentUser('');
  };

  const filterItems = (item) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return item.completed;
    if (filter === 'uncompleted') return !item.completed;
  };

  const leaveList = () => {
    setCurrentUser('');
  }

  return (
    <div className="container">
      <h1 className="mt-3">{listName}</h1>
      <div className="row mb-2">
        <div className="col-md-4 col-sm-6">
          <select
            className="form-control select-food"
            value={selectedFood}
            onChange={(e) => setSelectedFood(e.target.value)}
          >
            <option value="">Select food</option>
            {initialItems.map((food, index) => (
              <option key={index} value={food}>
                {food}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-2 col-sm-3">
          <input
            type="number"
            className="form-control input-quantity"
            value={foodQuantity}
            onChange={(e) => setFoodQuantity(parseInt(e.target.value))}
            min="1"
            max="99"
          />
        </div>
        <div className="col-md-2 col-sm-3">
          <button className="btn btn-primary btn-block" onClick={addItem}>
            Add Item
          </button>
        </div>
      </div>
      <div className="mb-2">
        <label>Filter: </label>
        <select className="form-control" onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
      <ul className="list-group">
        {items
          .filter(filterItems)
          .map((item, index) => (
            <li key={index} className={`list-group-item ${item.completed ? 'list-group-item-success' : ''}`}>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={item.completed}
                  onChange={() => toggleItemCompletion(item.food)}
                />
                <label className="form-check-label">
                  {item.food} - Quantity: {item.quantity}
                </label>
              </div>
              <div className="float-right">
                <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.food)}>
                  Remove
                </button>
              </div>
            </li>
          ))}
      </ul>
      <div className="mt-3">
        {currentUser ? (
          <button className="btn btn-warning" onClick={becameUser}>
            Became User
          </button>
        ) : (
          <button className="btn btn-success" onClick={() => setCurrentUser('Owner')}>
            Become Owner
          </button>
        )}
        <button className="btn btn-danger ml-2" onClick={leaveList}>
          Leave List
        </button>
      </div>
      {currentUser === 'Owner' && (
        <div className="mt-3">
          <div className="row">
            <div className="col-md-4 col-sm-6">
              <input
                type="text"
                className="form-control"
                value={listName}
                onChange={(e) => changeListName(e.target.value)}
              />
            </div>
            <div className="col-md-2 col-sm-3">
              <button className="btn btn-primary mt-2" onClick={() => addMember('New Member')}>
                Add Member
              </button>
            </div>
          </div>
          <ul className="list-group" id="members-list">
            {members.map((member, index) => (
              <li key={index} className="list-group-item" id="members-list-item">
                {member}
                <button className="btn btn-danger btn-sm" onClick={() => removeMember(member)}>
                  Remove Member
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ShoppingListApp;

