import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setMessage('');
      setError('');
      await resetPassword(email);
      setMessage('Перевірте пошту для скидання пароля');
    } catch {
      setError('Не вдалося знайти такий email');
    }
  }

  return (
    <Container className="py-5 d-flex justify-content-center">
      <Card className="p-4 shadow border-0" style={{ maxWidth: '400px', width: '100%', borderRadius: '20px' }}>
        <h2 className="text-center fw-bold mb-4" style={{color: 'var(--deep-green)'}}>Відновлення</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Ваш Email</Form.Label>
            <Form.Control type="email" className="rounded-pill px-4" onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Button variant="success" className="w-100 py-2 mb-3" type="submit">Скинути пароль</Button>
          <div className="text-center">
            <Link to="/login" className="text-success fw-bold text-decoration-none">Назад до входу</Link>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default ForgotPassword;