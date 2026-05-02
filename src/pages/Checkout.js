// src/pages/Checkout.js
import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiArrowLeft } from 'react-icons/fi';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const imagePath = process.env.REACT_APP_IMAGE_PATH || '/image';

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '+380',
    city: 'Івано-Франківськ',
    address: '',
    comments: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const totalPrice = cart.reduce((acc, item) => 
    acc + item.price * (item.quantity || item.qty || 1), 0
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setLoading(true);
    setError('');

    try {
      const orderData = {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity || item.qty || 1,
          image: item.image
        })),
        total: totalPrice,
        status: "Нове",
        deliveryInfo: formData,
        createdAt: serverTimestamp(),
        read: false
      };

      await addDoc(collection(db, "orders"), orderData);

      toast.success("Замовлення успішно оформлено! Дякуємо!", {
        position: "top-center"
      });
      
      clearCart();
      navigate('/profile');
    } catch (err) {
      console.error("Помилка при створенні замовлення:", err);
      setError("Сталася помилка при оформленні замовлення. Спробуйте ще раз.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <Container className="py-5 text-center">
        <h2>Кошик порожній</h2>
        <Link to="/shop" className="btn btn-success mt-3">Перейти до каталогу</Link>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="d-flex align-items-center mb-4">
        <Link to="/cart" className="text-success me-3">
          <FiArrowLeft size={24} />
        </Link>
        <h1 className="fw-bold mb-0" style={{ color: '#1a4332' }}>Оформлення замовлення</h1>
      </div>

      <Row>
        {/* Ліва частина - форма доставки */}
        <Col lg={7}>
          <Card className="shadow-sm border-0 rounded-4 p-4">
            <h4 className="mb-4 fw-bold">Інформація про доставку</h4>
            
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Прізвище та ім'я отримувача *</Form.Label>
                <Form.Control 
                  type="text" 
                  name="fullName" 
                  value={formData.fullName}
                  onChange={handleChange}
                  required 
                  className="rounded-pill"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Телефон для зв'язку *</Form.Label>
                <Form.Control 
                  type="tel" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleChange}
                  required 
                  className="rounded-pill"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Місто *</Form.Label>
                <Form.Control 
                  type="text" 
                  name="city" 
                  value={formData.city}
                  onChange={handleChange}
                  required 
                  className="rounded-pill"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Адреса доставки (вулиця, будинок, квартира) *</Form.Label>
                <Form.Control 
                  type="text" 
                  name="address" 
                  value={formData.address}
                  onChange={handleChange}
                  required 
                  className="rounded-pill"
                  placeholder="вул. Білозіра, 20, кв. 12"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Коментар до замовлення</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3} 
                  name="comments" 
                  value={formData.comments}
                  onChange={handleChange}
                  className="rounded-4"
                  placeholder="Додаткові побажання..."
                />
              </Form.Group>

              <Button 
                variant="success" 
                size="lg" 
                className="w-100 py-3 rounded-pill fw-bold"
                type="submit"
                disabled={loading}
                style={{ backgroundColor: '#1a4332', border: 'none', fontSize: '1.1rem' }}
              >
                {loading ? 'Оформлюємо замовлення...' : `Підтвердити замовлення — ${totalPrice} ₴`}
              </Button>
            </Form>
          </Card>
        </Col>

        {/* Права частина - підсумок замовлення */}
        <Col lg={5}>
          <Card className="shadow-sm border-0 rounded-4 p-4 sticky-top" style={{ top: '90px' }}>
            <h4 className="fw-bold mb-4">Ваше замовлення</h4>
            
            {cart.map((item, index) => (
              <div key={index} className="d-flex mb-3 pb-3 border-bottom">
                <img 
                  src={`${imagePath}/${item.image}`} 
                  alt={item.name}
                  style={{ 
                    width: '65px', 
                    height: '65px', 
                    objectFit: 'contain', 
                    borderRadius: '8px' 
                  }}
                  className="me-3"
                  onError={(e) => { 
                    e.target.onerror = null; 
                    e.target.src = '/image/logo192.png'; 
                  }}
                />
                <div className="flex-grow-1">
                  <div className="fw-semibold">{item.name}</div>
                  <small className="text-muted">Кількість: {item.quantity || item.qty || 1}</small>
                </div>
                <div className="text-end fw-bold">
                  {item.price * (item.quantity || item.qty || 1)} ₴
                </div>
              </div>
            ))}

            <div className="d-flex justify-content-between fs-5 fw-bold mt-4 pt-3 border-top">
              <span>До сплати:</span>
              <span style={{ color: '#bc544b' }}>{totalPrice} ₴</span>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;