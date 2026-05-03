import React from 'react';
import { Container, Table, Button, Row, Col, Card } from 'react-bootstrap';
import { useCart } from '../context/CartContext'; 
import { Link } from 'react-router-dom';
import { FiTrash2, FiShoppingBag, FiPlus, FiMinus } from 'react-icons/fi';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const imagePath = process.env.REACT_APP_IMAGE_PATH || '/image';

  if (cart.length === 0) {
    return (
      <Container className="py-5 text-center">
        <FiShoppingBag size={80} className="text-muted mb-4" />
        <h2 className="fw-bold">Ваш кошик порожній</h2>
        <p className="text-muted">Додайте товари з каталогу</p>
        <Button as={Link} to="/shop" className="mt-3 px-5 py-2" variant="success" style={{ backgroundColor: '#1a4332' }}>
          Перейти до покупок
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="fw-bold mb-4" style={{ color: '#1a4332' }}>Ваш кошик</h1>
      <Row>
        <Col lg={8}>
          <Table hover className="align-middle border-0 shadow-sm rounded-4 overflow-hidden">
            <thead className="bg-light">
              <tr>
                <th>Товар</th>
                <th>Ціна</th>
                <th>Кількість</th>
                <th>Сума</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img 
                        src={`${imagePath}/${item.image}`} 
                        alt={item.name} 
                        style={{ width: '55px', height: '55px', objectFit: 'contain', borderRadius: '8px' }} 
                        className="me-3"
                        onError={(e) => { 
                          e.target.onerror = null; 
                          e.target.src = 'https://via.placeholder.com/55?text='; 
                        }} 
                      />
                      <div>
                        <span className="fw-semibold">{item.name}</span>
                        <br />
                        <small className="text-muted">{item.sub || ''}</small>
                      </div>
                    </div>
                  </td>
                  <td>{item.price} ₴</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <Button variant="outline-secondary" size="sm" onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}>
                        <FiMinus size={14} />
                      </Button>
                      <span className="fw-bold px-3">{item.quantity || 1}</span>
                      <Button variant="outline-secondary" size="sm" onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}>
                        <FiPlus size={14} />
                      </Button>
                    </div>
                  </td>
                  <td className="fw-bold">{(item.price * (item.quantity || 1))} ₴</td>
                  <td>
                    <Button variant="link" className="text-danger p-0" onClick={() => removeFromCart(item.id)}>
                      <FiTrash2 size={20} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col lg={4}>
          <Card className="p-4 border-0 shadow-sm rounded-4">
            <h4 className="fw-bold mb-4">Разом до сплати</h4>
            <div className="d-flex justify-content-between mb-4 fs-5">
              <span>Загальна сума:</span>
              <span className="fw-bold text-success">{getTotalPrice()} ₴</span>
            </div>
            <Button as={Link} to="/checkout" variant="success" size="lg" className="w-100 py-3 rounded-pill fw-bold" style={{ backgroundColor: '#1a4332', border: 'none' }}>
              Оформити замовлення
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;