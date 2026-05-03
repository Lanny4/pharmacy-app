import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return setError('Паролі не збігаються');
   
    try {
      setError('');
      setLoading(true);
      await signup(email, password);
      navigate('/profile');
    } catch (err) {
      setError('Не вдалося створити акаунт. Можливо, такий email вже існує.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      await signInWithGoogle();
      navigate('/profile');
    } catch (err) {
      setError('Не вдалося увійти через Google. Спробуйте ще раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5 d-flex justify-content-center">
      <Card className="p-4 shadow border-0" style={{ maxWidth: '450px', width: '100%', borderRadius: '20px' }}>
        <h2 className="text-center fw-bold mb-4" style={{color: 'var(--deep-green)'}}>
          Створити профіль
        </h2>
        
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Кнопка Google */}
        <Button 
          variant="outline-dark" 
          className="w-100 py-3 mb-4 d-flex align-items-center justify-content-center gap-2 fw-medium"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <FcGoogle size={26} />
          Зареєструватися через Google
        </Button>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Ваш Email</Form.Label>
            <Form.Control 
              type="email" 
              className="rounded-pill px-4" 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Пароль</Form.Label>
            <Form.Control 
              type="password" 
              className="rounded-pill px-4" 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Підтвердіть пароль</Form.Label>
            <Form.Control 
              type="password" 
              className="rounded-pill px-4" 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
            />
          </Form.Group>

          <Button 
            variant="success" 
            className="w-100 py-2 mb-3 shadow-sm" 
            type="submit"
            disabled={loading}
          >
            {loading ? 'Реєстрація...' : 'Зареєструватися'}
          </Button>

          <p className="text-center mb-0">
            Вже є профіль? <Link to="/login" className="text-success text-decoration-none fw-bold">Увійти</Link>
          </p>
        </Form>
      </Card>
    </Container>
  );
};

export default Register;