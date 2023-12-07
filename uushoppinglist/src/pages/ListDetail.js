import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { shoppingLists } from '../data/data';
import initialItems from '../data/initialItems';
import UserService from '../services/userService';
import { useTranslation } from 'react-i18next';
import '../styles/ListDetail.css';


const ListDetail = () => {
  const { t } = useTranslation();
  const { listId } = useParams();
  const navigate = useNavigate();
  const selectedList = shoppingLists.find((list) => list.id === parseInt(listId, 10));
  const selectedListOwner = selectedList ? selectedList.ownerId : null;
  const userService = new UserService();
  const currentUser = userService.getCurrentUser();
  const [listName, setListName] = useState(() => selectedList.name);
  const [selectedFood, setSelectedFood] = useState('');
  const [foodQuantity, setFoodQuantity] = useState(1);
  const [members, setMembers] = useState(() => selectedList.members);
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [newListName, setNewListName] = useState(() => selectedList.name);

  const initialItemsData = initialItems.map((item, index) => ({ id: index + 1, ...item }));
  const selectedItemsData = selectedList.itemsList.map((itemId) => {
    const selectedItem = initialItemsData.find((item) => item.id === itemId);
    return selectedItem ? { id: itemId, ...selectedItem } : null;
  }).filter((item) => item !== null);

  const [items, setItems] = useState([...selectedItemsData]);

  useEffect(() => {
    if (!selectedList) {
      navigate('/');
    }
  }, [selectedList, navigate]);

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

  const leaveList = () => {
    navigate('/');
  };

  const openModal = () => {
    setShowModal(true);
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

  const filterItems = (item) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return item.completed;
    if (filter === 'uncompleted') return !item.completed;
  };

  return (
    <div className="container">
      <h1 className="mt-3">{listName}</h1>

      <div className="sec1">
        <div className="row mb-2">
          <div className="col-md-4 col-sm-6">
            <label>{t('listDetail.selectItem')}:</label>
            <select
              className="form-control select-food"
              value={selectedFood}
              onChange={(e) => setSelectedFood(e.target.value)}
            >
              <option value="">{t('listDetail.selectItem')}</option>
              {initialItems.map((food, index) => (
                <option key={index} value={food.name}>
                  {food.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2 col-sm-3">
            <label>{t('listDetail.quantity')}:</label>
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
              {t('listDetail.addItem')}
            </button>
          </div>
        </div>
      </div>

      <div className="mb-2">
        <label>{t('listDetail.filter')}:</label>
        <select className="form-controlstate" onChange={(e) => setFilter(e.target.value)}>
          <option value="all">{t('listDetail.all')}</option>
          <option value="completed">{t('listDetail.completed')}</option>
          <option value="uncompleted">{t('listDetail.uncompleted')}</option>
        </select>
      </div>

      <ul className="list-group">
        {items.filter(filterItems).map((item) => (
          <li key={item.id} className={`list-group-item ${item.completed ? 'list-group-item-success' : ''}`}>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={item.completed}
                onChange={() => toggleItemCompletion(item.id)}
              />
              <label className="form-check-label">
                {item.name} - {t('listDetail.quantity')}: {item.quantity}
              </label>
            </div>
            <div className="float-right">
              <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.id)}>
                {t('listDetail.remove')}
              </button>
            </div>
          </li>
        ))}
      </ul>

      {currentUser.id === selectedListOwner && (
        <div className="mt-3">
          <div className="row">
            <div className="col-md-4 col-sm-6">
              <button className="btn btn-primary btn-block" onClick={openModal}>
                {t('listDetail.changeListName')}
              </button>
            </div>
            <div className="col-md-2 col-sm-3">
              <button className="btn btn-primary mt-2" onClick={() => addMember('New Member')}>
                {t('listDetail.addMember')}
              </button>
            </div>
          </div>
          <div className="uslist">
            <ul className="list-group" id="members-list">
              {members.map((member) => (
                <li key={member.id} className="list-group-item" id="members-list-item">
                  {member.name}
                  <button className="btn btn-danger btn-sm" onClick={() => removeMember(member.id)}>
                    {t('listDetail.removeMember')}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {currentUser.id !== selectedListOwner && (
        <>
          <label>{t('listDetail.usersInList')}:</label>
          <div className="uslist">
            <ul className="list-group" id="members-list">
              {members.map((member) => (
                <li key={member.id} className="list-group-item" id="members-list-item">
                  {member.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-3">
            <button className="btn btn-danger" onClick={leaveList}>
              {t('listDetail.leaveList')}
            </button>
          </div>
        </>
      )}

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{t('listDetail.changeListName')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>{t('listDetail.newListName')}:</label>
          <input
            type="text"
            className="form-control"
            placeholder={t('listDetail.enterNewListName')}
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            {t('listDetail.cancel')}
          </Button>
          <Button variant="primary" onClick={confirmNameChange}>
            {t('listDetail.confirm')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListDetail;
