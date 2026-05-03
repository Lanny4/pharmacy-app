// src/pages/Profile.js
import React from 'react';
import { Container, Row, Col, Card, Button, Spinner, Badge } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { FiUser, FiShoppingBag, FiLogOut, FiMapPin, FiCalendar } from 'react-icons/fi';
import { useOrders } from '../hooks/useOrders';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const { clearCart } = useCart();
  const { orders, loading, error } = useOrders();

  const handleLogout = async () => {
    try {
      await logout();
      clearCart();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={10} xl={9}>
          {/* Профіль користувача */}
          <Card className="shadow-sm border-0 rounded-4 mb-5">
            <Card.Body className="p-5">
              <div className="d-flex align-items-center gap-4">
                <div className="bg-success bg-opacity-10 p-4 rounded-circle">
                  <FiUser size={60} className="text-success" />
                </div>
                <div className="flex-grow-1">
                  <h2 className="fw-bold mb-1" style={{ color: '#1a4332' }}>Мій профіль</h2>
                  <p className="text-muted fs-5">{currentUser?.email}</p>
                </div>
                <Button 
                  variant="outline-danger" 
                  onClick={handleLogout}
                  className="rounded-pill px-4"
                >
                  <FiLogOut className="me-2" /> Вийти
                </Button>
              </div>
            </Card.Body>
          </Card>

          {/* Історія замовлень */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold mb-0" style={{ color: '#132f23' }}>Історія замовлень</h3>
            <span className="text-muted">{orders.length} замовлень</span>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="success" />
            </div>
          ) : error ? (
            <Card className="text-center p-5 shadow-sm border-0 rounded-4">
              <p className="text-danger">Помилка: {error}</p>
            </Card>
          ) : orders.length === 0 ? (
            <Card className="text-center p-5 shadow-sm border-0 rounded-4">
              <FiShoppingBag size={80} className="text-muted mx-auto mb-4" />
              <h5>У вас ще немає замовлень</h5>
              <Button as={Link} to="/shop" variant="success" className="mt-3 rounded-pill px-5">
                Зробити перше замовлення
              </Button>
            </Card>
          ) : (
            orders.map((order) => (
              <Card key={order.id} className="mb-4 shadow-sm border-0 rounded-4 overflow-hidden">
                <Card.Header className="bg-light border-0 py-3 px-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-3">
                      <FiCalendar className="text-muted" />
                      <div>
                        <strong>Замовлення #{order.id.slice(-8)}</strong>
                        {order.createdAt && (
                          <div className="text-muted small mt-1">
                            {order.createdAt.toLocaleDateString('uk-UA', { 
                              day: 'numeric', 
                              month: 'long', 
                              year: 'numeric'
                            })} • {order.createdAt.toLocaleTimeString('uk-UA', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                    <Badge bg="success" className="px-3 py-2">{order.status || "Нове"}</Badge>
                  </div>
                </Card.Header>

                <Card.Body className="p-4">
                  <Row className="g-4">
                    {/* Інформація про доставку */}
                    <Col md={7}>
                      {order.deliveryInfo && (
                        <div>
                          <div className="d-flex align-items-start gap-2 mb-3">
                            <FiMapPin className="text-success mt-1" size={20} />
                            <div>
                              <div className="fw-medium">{order.deliveryInfo.fullName}</div>
                              <div className="text-muted small">
                                {order.deliveryInfo.city}, {order.deliveryInfo.address}
                              </div>
                              {order.deliveryInfo.phone && (
                                <div className="text-muted small mt-1">
                                  Тел: {order.deliveryInfo.phone}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Список товарів */}
                      <div className="mt-4">
                        <small className="text-muted fw-medium">Товари в замовленні:</small>
                        <ul className="list-unstyled mt-2">
                          {order.items?.map((item, idx) => (
                            <li key={idx} className="mb-1">
                              • {item.name} × {item.quantity || 1}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Col>

                    {/* Сума */}
                    <Col md={5} className="text-md-end d-flex flex-column justify-content-center">
                      <div className="text-muted small mb-1">Загальна сума</div>
                      <div className="display-6 fw-bold" style={{ color: '#bc544b' }}>
                        {order.total} ₴
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;