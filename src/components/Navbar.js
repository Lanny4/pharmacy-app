// src/components/Navbar.js
import React from 'react';
import { Navbar, Nav, Container, NavDropdown, Button, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiUser } from 'react-icons/fi';

const NavbarComponent = () => {     // Назва компонента може бути будь-яка
  const { currentUser, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Помилка виходу:", error);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="py-3 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-2 text-white">
          Health<span style={{ color: '#bc544b' }}>Care</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto gap-4 fs-5 fw-medium">
            <Nav.Link as={Link} to="/">Головна</Nav.Link>
            <Nav.Link as={Link} to="/shop">Каталог</Nav.Link>
            <Nav.Link as={Link} to="/about">Про нас</Nav.Link>
          </Nav>

          <Nav className="align-items-center gap-4">
            <Nav.Link as={Link} to="/cart" className="p-2 position-relative">
              <FiShoppingCart size={28} />
              {cart.length > 0 && (
                <Badge 
                  pill 
                  bg="danger" 
                  className="position-absolute translate-middle"
                  style={{ top: '8px', left: '32px', fontSize: '0.7rem', backgroundColor: '#bc544b' }}
                >
                  {cart.length}
                </Badge>
              )}
            </Nav.Link>

            {currentUser ? (
              <NavDropdown 
                title={
                  <span className="text-white fs-5">
                    <FiUser size={24} className="me-1" /> Кабінет
                  </span>
                } 
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item as={Link} to="/profile">Мій профіль</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className="text-danger">
                  Вийти
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <div className="d-flex gap-3">
                <Button as={Link} to="/login" variant="outline-light" className="rounded-pill px-4 py-2 fs-5">
                  Увійти
                </Button>
                <Button 
                  as={Link} 
                  to="/register" 
                  variant="success" 
                  className="rounded-pill px-4 py-2 fs-5 text-white"
                  style={{ backgroundColor: '#1a4332', border: 'none' }}
                >
                  Реєстрація
                </Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;