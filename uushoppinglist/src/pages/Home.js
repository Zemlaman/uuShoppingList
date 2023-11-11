import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { shoppingLists } from '../data/data';
import UserService from '../services/userService';

function Home() {
  const userService = new UserService();
  const currentUser = userService.getCurrentUser();
  const [initialLists, setInitialLists] = useState(shoppingLists);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [confirmDeleteList, setConfirmDeleteList] = useState(null);
  const [showActive, setShowActive] = useState(true);

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setNewListName('');
  };

  const generateRandomId = () => {
    return Math.floor(Math.random() * 10000);
  };

  const isIdUnique = (id) => {
    return !initialLists.some((list) => list.id === id);
  };

  const createNewList = () => {
    if (newListName.trim() !== '') {
      let newId;
      do {
        newId = generateRandomId();
      } while (!isIdUnique(newId));

      const newList = {
        id: newId,
        name: newListName,
        archived: false,
        ownerId: currentUser.id,
      };

      setInitialLists([...initialLists, newList]);
      closeAddModal();
    }
  };

  const openDeleteConfirmation = (listId) => {
    setConfirmDeleteList(listId);
  };

  const confirmDelete = async () => {
    if (confirmDeleteList !== null) {
      const listToDelete = initialLists.find((list) => list.id === confirmDeleteList);
      console.log('currentUser', currentUser.id);
      console.log('listToDetele.ownerId', listToDelete.ownerId);
      if (listToDelete.ownerId === currentUser.id) {
        const updatedLists = initialLists.filter((list) => list.id !== confirmDeleteList);
        setInitialLists(updatedLists);
        setConfirmDeleteList(null);
      }
    }
  };

  const filteredLists = showActive ? initialLists.filter((list) => !list.archived) : initialLists;

  return (
    <div className="container">
      <h1 className="mt-3">Shopping Lists</h1>

      <div className="mb-2">
        <Button
          variant="info"
          className="mr-2"
          onClick={() => setShowActive(false)}
          disabled={!showActive}
        >
          Show All
        </Button>
        <Button
          variant="info"
          onClick={() => setShowActive(true)}
          disabled={showActive}
        >
          Show Active
        </Button>
        <Button variant="primary" className="ml-2" onClick={openAddModal}>
          Add List
        </Button>
      </div>

      <div className="row">
        {filteredLists.map((list) => (
          <div key={list.id} className="col-md-3">
            <div className={`card mb-4 ${list.archived ? 'bg-warning' : ''}`}>
              <div className="card-body">
                <h5 className="card-title">{list.name}</h5>
                <Link to={`/listdetail/${list.id}`} className="btn btn-primary">
                  View List
                </Link>
                {list.ownerId === currentUser.id && (
                  <Button
                    variant="danger"
                    className="ml-2"
                    onClick={() => openDeleteConfirmation(list.id)}
                  >
                    Delete List
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>


      <Modal show={showAddModal} onHide={closeAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            placeholder="Enter list name"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={createNewList}>
            Create List
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={confirmDeleteList !== null} onHide={() => setConfirmDeleteList(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this list?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirmDeleteList(null)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Home;
