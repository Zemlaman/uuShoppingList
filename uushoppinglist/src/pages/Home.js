import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { shoppingLists } from '../data/data';
import UserService from '../services/userService';
import { useTranslation } from 'react-i18next';

function Home() {
  const userService = new UserService();
  const currentUser = userService.getCurrentUser();
  const [initialLists, setInitialLists] = useState(shoppingLists);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [confirmDeleteList, setConfirmDeleteList] = useState(null);
  const [showActive, setShowActive] = useState(true);
  const { t } = useTranslation();

  const openAddModal = () => setShowAddModal(true);
  const closeAddModal = () => {
    setShowAddModal(false);
    setNewListName('');
  };

  const generateRandomId = () => Math.floor(Math.random() * 10000);
  const isIdUnique = (id) => !initialLists.some((list) => list.id === id);

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

  const openDeleteConfirmation = (listId) => setConfirmDeleteList(listId);
  const confirmDelete = () => {
    if (confirmDeleteList !== null) {
      const updatedLists = initialLists.filter((list) => list.id !== confirmDeleteList);
      setInitialLists(updatedLists);
      setConfirmDeleteList(null);
    }
  };

  const filteredLists = showActive ? initialLists.filter((list) => !list.archived) : initialLists;

  return (
    <div className="container">
      <h1 className="mt-3">{t('home.shoppingLists')}</h1>

      <div className="mb-2">
        <Button
          variant="info"
          className="mr-2"
          onClick={() => setShowActive(false)}
          disabled={!showActive}
        >
          {t('home.showAll')}
        </Button>
        <Button
          variant="info"
          onClick={() => setShowActive(true)}
          disabled={showActive}
        >
          {t('home.showActive')}
        </Button>
        <Button variant="primary" className="ml-2" onClick={openAddModal}>
          {t('home.addList')}
        </Button>
      </div>

      <div className="row">
        {filteredLists.map((list) => (
          <div key={list.id} className="col-md-3">
            <div className={`card mb-4 ${list.archived ? 'bg-warning' : ''}`}>
              <div className="card-body">
                <h5 className="card-title">{list.name}</h5>
                <Link to={`/listdetail/${list.id}`} className="btn btn-primary">
                  {t('home.viewList')}
                </Link>
                {list.ownerId === currentUser.id && (
                  <Button
                    variant="danger"
                    className="ml-2"
                    onClick={() => openDeleteConfirmation(list.id)}
                  >
                    {t('home.deleteList')}
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal show={showAddModal} onHide={closeAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>{t('home.addNewList')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            placeholder={t('home.enterListName')}
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeAddModal}>
            {t('home.close')}
          </Button>
          <Button variant="primary" onClick={createNewList}>
            {t('home.createList')}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={confirmDeleteList !== null} onHide={() => setConfirmDeleteList(null)}>
        <Modal.Header closeButton>
          <Modal.Title>{t('home.confirmDelete')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{t('home.confirmDelete')}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirmDeleteList(null)}>
            {t('home.cancel')}
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            {t('home.delete')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Home;
