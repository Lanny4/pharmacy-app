import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/profile'); // ПЕРЕХІД ПІСЛЯ УСПІХУ
    } catch (err) {
      setError('Помилка входу. Перевірте пошту та пароль.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className="py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card className="p-4 shadow-sm border-0" style={{ maxWidth: '400px', width: '100%', borderRadius: '15px' }}>
        <Card.Body>
          <h2 className="text-center fw-bold mb-4" style={{ color: '#1a4332' }}>Вхід</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} required className="rounded-pill px-3" />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Пароль</Form.Label>
              <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} required className="rounded-pill px-3" />
            </Form.Group>
            <Button disabled={loading} variant="success" className="w-100 py-2 rounded-pill" style={{ backgroundColor: '#1a4332' }} type="submit">
              {loading ? <Spinner animation="border" size="sm" /> : 'Увійти'}
            </Button>
          </Form>
          <div className="text-center mt-3">
            Немає акаунту? <Link to="/register" className="text-success fw-bold text-decoration-none">Реєстрація</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;