import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import UserService from '../services/userService';
import '../styles/components/navbar.css';
import { useTranslation } from 'react-i18next';

function AppNavbar() {
  const userService = new UserService();
  const currentUser = userService.getCurrentUser();
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const changeLanguage = (language) => i18n.changeLanguage(language);

  return (
    <Navbar bg="green" variant="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">uuShoppingList</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">{t('navbar.home')}</Nav.Link>
          </Nav>
          <button type="button" className="btn btn-dark" onClick={toggleDarkMode}>
            {darkMode ? t('navbar.lightMode') : t('navbar.darkMode')}
          </button>
          <button type="button" className="btn btn-light" onClick={() => changeLanguage('en')}>{t('navbar.english')}</button>
          <button type="button" className="btn btn-light" onClick={() => changeLanguage('cs')}>{t('navbar.czech')}</button>
          {currentUser && (
            <Navbar.Text className="user">
              {t('navbar.currentuser')} {currentUser.name}
            </Navbar.Text>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
