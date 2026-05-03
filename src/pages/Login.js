import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const { login, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  // вхід через email/пароль
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/profile');
    } catch (err) {
      setError('Помилка входу. Перевірте пошту та пароль.');
    } finally {
      setLoading(false);
    }
  }

  // вхід через Google
  async function handleGoogleLogin() {
    try {
      setError('');
      setGoogleLoading(true);
      await signInWithGoogle();
      navigate('/profile');
    } catch (err) {
      setError('Не вдалося увійти через Google. Спробуйте ще раз.');
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <Container 
      className="py-5 d-flex justify-content-center align-items-center" 
      style={{ minHeight: '80vh' }}
    >
      <Card 
        className="p-4 shadow-sm border-0" 
        style={{ maxWidth: '420px', width: '100%', borderRadius: '20px' }}
      >
        <Card.Body>
          <h2 
            className="text-center fw-bold mb-4" 
            style={{ color: '#1a4332' }}
          >
            Вхід
          </h2>

          {error && <Alert variant="danger">{error}</Alert>}

          {/* ── Кнопка Google ── */}
          <Button
            variant="outline-secondary"
            className="w-100 d-flex align-items-center justify-content-center gap-2 rounded-pill py-2 mb-3"
            onClick={handleGoogleLogin}
            disabled={googleLoading}
          >
            {googleLoading
              ? <Spinner animation="border" size="sm" />
              : <FcGoogle size={22} />
            }
            Увійти через Google
          </Button>

          {/* ── Розділювач ── */}
          <div className="d-flex align-items-center my-3">
            <hr className="flex-grow-1" />
            <span className="px-3 text-muted small">або</span>
            <hr className="flex-grow-1" />
          </div>

          {/* ── Форма email/пароль ── */}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="rounded-pill px-3"
                placeholder="your@email.com"
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Пароль</Form.Label>
              <Form.Control 
                type="password" 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="rounded-pill px-3"
                placeholder="••••••••"
              />
            </Form.Group>

            {/* ── Забули пароль ── */}
            <div className="text-end mb-4">
              <Link 
                to="/forgot-password" 
                className="text-muted small text-decoration-none"
              >
                Забули пароль?
              </Link>
            </div>

            <Button 
              disabled={loading} 
              variant="success" 
              className="w-100 py-2 rounded-pill" 
              style={{ backgroundColor: '#1a4332', border: 'none' }} 
              type="submit"
            >
              {loading ? <Spinner animation="border" size="sm" /> : 'Увійти'}
            </Button>
          </Form>

          <div className="text-center mt-3">
            Немає акаунту?{' '}
            <Link to="/register" className="text-success fw-bold text-decoration-none">
              Реєстрація
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
