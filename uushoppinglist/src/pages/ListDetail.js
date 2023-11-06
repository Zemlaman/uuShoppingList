import React, { useState } from 'react';
import '../styles/ListDetail.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const initialItems = [
  { id: 1, name: 'Apples' },
  { id: 2, name: 'Cola' },
  { id: 3, name: 'Bananas' },
  { id: 4, name: 'Spaghetti' },
  { id: 5, name: 'Bread' },
  { id: 6, name: 'Butter' },
  { id: 7, name: 'Milk' },
  { id: 8, name: 'Chilli' },
  { id: 9, name: 'Beef' },
  { id: 10, name: 'Chicken' },
  { id: 11, name: 'Eggs' },
  { id: 12, name: 'Cheese' },
  { id: 13, name: 'Potatoes' },
  { id: 14, name: 'Onions' },
  { id: 15, name: 'Tomatoes' },
  { id: 16, name: 'Preworkout' },
  { id: 17, name: 'Monster' },
  { id: 18, name: 'Beer' },
];

const initialMembers = [
  { id: 1, name: 'Oliver' },
  { id: 2, name: 'Jacob' },
  { id: 3, name: 'Lukas' },
];


const ListDetail = ({ lists }) => {
  const { listName } = useParams();
  const selectedListName = `List ${listName}`;
  const [setListName] = useState(selectedListName);
  const [items, setItems] = useState([]);
  const [selectedFood, setSelectedFood] = useState('');
  const [foodQuantity, setFoodQuantity] = useState(1);
  const [members, setMembers] = useState(initialMembers);
  const [currentUser, setCurrentUser] = useState('');
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [newListName, setNewListName] = useState(listName);

  const addItem = () => {
    if (selectedFood && !items.some((item) => item.name === selectedFood)) {
      const newItem = {
        id: items.length + 1,
        name: selectedFood,
        quantity: foodQuantity,
        completed: false,
      };
      setItems([...items, newItem]);
      setSelectedFood('');
    }
  };

  const removeItem = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
  };

  const toggleItemCompletion = (itemId) => {
    const updatedItems = [...items];
    const itemToUpdate = updatedItems.find((item) => item.id === itemId);
    if (itemToUpdate) {
      itemToUpdate.completed = !itemToUpdate.completed;
      setItems(updatedItems);
    }
  };

  const changeListName = (newName) => {
    setNewListName(newName);
  };

  const addMember = (memberName) => {
    const newMember = {
      id: members.length + 1,
      name: memberName,
    };
    setMembers([...members, newMember]);
  };

  const removeMember = (memberId) => {
    const updatedMembers = members.filter((m) => m.id !== memberId);
    setMembers(updatedMembers);
  };

  const becomeUser = () => {
    setCurrentUser('');
  };

  const filterItems = (item) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return item.completed;
    if (filter === 'uncompleted') return !item.completed;
  };

  const leaveList = () => {
    navigate('/');
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const confirmNameChange = () => {
    if (newListName.trim() !== '') {
      setListName(newListName);
      closeModal();
    }
  };

  return (
    <div className="container">
      <h1 className="mt-3">{newListName}</h1>
      <div className='sec1'>
      <div className="row mb-2">
        <div className="col-md-4 col-sm-6">
          <select
            className="form-control select-food"
            value={selectedFood}
            onChange={(e) => setSelectedFood(e.target.value)}
          >
            <label>Item: </label>
            <option value="">Select item</option>
            {initialItems.map((food, index) => (
              <option key={index} value={food.name}>
                {food.name}
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
      </div>
      <div className="mb-2">
        <label>Filter: </label>
        <select className="form-controlstate" onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
      <ul className="list-group">
        {items
          .filter(filterItems)
          .map((item, index) => (
            <li key={item.id} className={`list-group-item ${item.completed ? 'list-group-item-success' : ''}`}>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={item.completed}
                  onChange={() => toggleItemCompletion(item.id)}
                />
                <label className="form-check-label">
                  {item.name} - Quantity: {item.quantity}
                </label>
              </div>
              <div className="float-right">
                <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.id)}>
                  Remove
                </button>
              </div>
            </li>
          ))}
      </ul>
      <div className="mt-3">
        {currentUser ? (
          <button className="btn btn-warning" onClick={becomeUser}>
            Become User
          </button>
        ) : (
          <button className="btn btn-success" onClick={() => setCurrentUser('Owner')}>
            Become Owner
          </button>
        )}
        {currentUser !== 'Owner' && (
          <button className="btn btn-danger ml-2" onClick={leaveList}>
          Leave List
          </button>
        )}
      </div>
      {currentUser === 'Owner' && (
        <div className="mt-3">
          <div className="row">
          <div className="col-md-4 col-sm-6">
              List name:
              <input
                type="text"
                className="form-control"
                placeholder="List Name"
                value={newListName}
                onChange={(e) => changeListName(e.target.value)}
              />
            </div>
            <div className="col-md-2 col-sm-3">
              <button className="btn btn-primary mt-2" onClick={() => addMember('New Member')}>
                Add Member
              </button>
            </div>
          </div>
          <div className="uslist">
          <ul className="list-group" id="members-list">
            {members.map((member) => (
              <li key={member.id} className="list-group-item" id="members-list-item">
                {member.name}
                <button className="btn btn-danger btn-sm" onClick={() => removeMember(member.id)}>
                  Remove Member
                </button>
              </li>
            ))}
          </ul>
          </div>
        </div>
      )}

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Name Change</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to change the list name to: {newListName}?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmNameChange}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ListDetail;



