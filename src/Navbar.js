import React from 'react';
import { Navbar, Nav, Container, NavDropdown, Button, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiUser } from 'react-icons/fi';

const NavbarComponent = () => {
  const { currentUser, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  // Логіка виходу з облікового запису
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    /* sticky-top виправляє проблему з гортанням на мобільних */
    <Navbar expand="lg" variant="dark" className="navbar-custom sticky-top shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-2">
          Health<span style={{ color: '#bc544b' }}>Care</span>
        </Navbar.Brand>
        
        {/* Бургер-меню для мобільних пристроїв */}
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="me-auto gap-lg-4 ms-lg-4 fw-medium">
            <Nav.Link as={Link} to="/">Головна</Nav.Link>
            <Nav.Link as={Link} to="/shop">Каталог</Nav.Link>
            <Nav.Link as={Link} to="/about">Про нас</Nav.Link>
          </Nav>
          
          <Nav className="align-items-center gap-3 mt-3 mt-lg-0">
            {/* Іконка кошика з лічильником */}
            <Nav.Link as={Link} to="/cart" className="position-relative p-2">
              <FiShoppingCart size={24} />
              {cart.length > 0 && (
                <Badge 
                  pill 
                  bg="danger" 
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: '0.7rem', backgroundColor: '#bc544b' }}
                >
                  {cart.length}
                </Badge>
              )}
            </Nav.Link>

            {/* Авторизація / Кабінет */}
            {currentUser ? (
              <NavDropdown 
                title={
                  <span className="text-white">
                    <FiUser size={22} className="me-1" /> Профіль
                  </span>
                } 
                id="user-dropdown"
                align="end"
              >
                <NavDropdown.Item as={Link} to="/profile">Мій кабінет</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className="text-danger">
                  Вийти
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <div className="d-flex gap-2">
                <Button as={Link} to="/login" variant="outline-light" className="rounded-pill px-4">
                  Вхід
                </Button>
                <Button 
                  as={Link} 
                  to="/register" 
                  variant="success" 
                  className="rounded-pill px-4 border-0"
                  style={{ backgroundColor: '#1a4332' }}
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