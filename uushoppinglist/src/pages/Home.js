import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';


function Home() {
  const [lists, setLists] = useState([
    { id: 1, name: '10.4.98' },
    { id: 2, name: 'Party' },
    { id: 3, name: 'Weekend' },
    { id: 4, name: 'Christmas' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [confirmDeleteList, setConfirmDeleteList] = useState(null);

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setNewListName('');
  };

  const createNewList = () => {
    if (newListName.trim() !== '') {
      const newList = {
        id: lists.length + 1,
        name: newListName,
      };
      setLists([...lists, newList]);
      closeAddModal();
    }
  };

  const openDeleteConfirmation = (listId) => {
    setConfirmDeleteList(listId);
  };

  const confirmDelete = () => {
    if (confirmDeleteList !== null) {
      const updatedLists = lists.filter((list) => list.id !== confirmDeleteList);
      setLists(updatedLists);
      setConfirmDeleteList(null);
    }
  };

  return (
    <div className="container">
      <h1 className="mt-3">Shopping Lists</h1>

      <Button variant="primary" className="mt-2" onClick={openAddModal}>
        Add List
      </Button>

      <div className="row">
        {lists.map((list) => (
          <div key={list.id} className="col-md-3">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{list.name}</h5>
                <Link to={`/listdetail/${list.id}/${list.name}`} className="btn btn-primary">
                  View List
                </Link>
                <Button
                  variant="danger"
                  className="ml-2"
                  onClick={() => openDeleteConfirmation(list.id)}
                >
                  Delete List
                </Button>
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
