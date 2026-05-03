// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiShield, FiTruck, FiHeart } from 'react-icons/fi';
import { useProducts } from '../hooks/useProducts';

const Home = () => {
  const { products, loading } = useProducts();   // loading залишаємо
  const [popularProducts, setPopularProducts] = useState([]);
  const imagePath = process.env.REACT_APP_IMAGE_PATH || '/image';

  useEffect(() => {
    if (products.length > 0) {
      const cosmetic = products.filter(p => p.category === "Доглядова косметика");
      setPopularProducts(cosmetic.length >= 3 ? cosmetic.slice(0, 3) : products.slice(0, 3));
    }
  }, [products]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="success" />
        <p className="mt-3">Завантаження популярних товарів...</p>
      </Container>
    );
  }

  return (
    <div style={{ backgroundColor: '#f9f9f7' }}>

      {/* головний надпис  */}
      <section 
        style={{ 
          minHeight: '95vh', 
          background: 'linear-gradient(135deg, #f9f9f7 0%, #f2f5f3 100%)',
          position: 'relative',
          overflow: 'hidden'
        }} 
        className="d-flex align-items-center"
      >
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={6}>
              <div className="mb-4">
                <span className="text-success fw-medium fs-6">HEALTHCARE — ІВАНО-ФРАНКІВСЬК</span>
              </div>

              <h1 className="display-1 fw-bold mb-4" style={{ 
                lineHeight: '1.02', 
                letterSpacing: '-0.05em'
              }}>
                Турбота про<br />ваше здоров'я<br />та красу
              </h1>

              <p className="lead text-muted fs-4 mb-5" style={{ maxWidth: '480px' }}>
                Якісні медикаменти та професійна доглядова косметика з доставкою по місту.
              </p>

              <Link to="/shop">
                <Button 
                  size="lg" 
                  className="px-5 py-3.5 rounded-4 fw-medium fs-5 shadow-sm"
                  style={{ 
                    backgroundColor: '#1a4332', 
                    border: 'none'
                  }}
                >
                  Перейти до каталогу
                </Button>
              </Link>
            </Col>

            <Col lg={6} className="text-center">
              <div className="position-relative">
                <img
                  src={`${imagePath}/krem-vichy.jpg`}
                  alt="Доглядова косметика"
                  className="img-fluid rounded-5"
                  style={{ 
                    maxHeight: '620px', 
                    objectFit: 'contain',
                    filter: 'drop-shadow(50px 60px 90px rgba(26, 67, 50, 0.22))'
                  }}
                  onError={(e) => { e.target.src = '/image/logo512.png'; }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* переваги */}
      <Container className="py-5">
        <Row className="g-5 text-center">
          {[
            { icon: FiShield, title: "Якість", desc: "Тільки сертифіковані препарати" },
            { icon: FiTruck, title: "Швидка доставка", desc: "По Івано-Франківську в день замовлення" },
            { icon: FiHeart, title: "Індивідуальна турбота", desc: "Консультації фармацевтів" }
          ].map((item, i) => (
            <Col md={4} key={i}>
              <div className="p-4">
                <div 
                  className="mx-auto mb-4 d-flex align-items-center justify-content-center" 
                  style={{ 
                    width: '80px', 
                    height: '80px', 
                    backgroundColor: '#e8f0eb', 
                    borderRadius: '22px' 
                  }}
                >
                  <item.icon size={36} className="text-success" />
                </div>
                <h5 className="fw-semibold mb-3">{item.title}</h5>
                <p className="text-muted">{item.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* популярні товари*/}
      <Container className="py-5 bg-white">
        <div className="d-flex justify-content-between align-items-end mb-5">
          <div>
            <h2 className="fw-bold mb-1">Популярна доглядова косметика</h2>
            <p className="text-muted">Найбільш затребувані засоби</p>
          </div>
          <Link to="/shop" className="text-success fw-medium text-decoration-none">
            Весь каталог →
          </Link>
        </div>

        <Row className="g-4">
          {popularProducts.map((item) => (
            <Col lg={4} key={item.id}>
              <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden hover-card">
                <Link to={`/product/${item.id}`}>
                  <div className="bg-white p-4 text-center" style={{ height: '320px' }}>
                    <img 
                      src={`${imagePath}/${item.image}`} 
                      alt={item.name}
                      style={{ maxHeight: '260px', objectFit: 'contain' }}
                      onError={(e) => { e.target.src = '/image/logo192.png'; }}
                    />
                  </div>
                </Link>

                <Card.Body className="p-5 d-flex flex-column">
                  <Badge bg="light" text="dark" className="mb-4 px-4 py-2 rounded-pill align-self-start">
                    {item.category}
                  </Badge>

                  <Card.Title className="fw-semibold fs-5 mb-3">{item.name}</Card.Title>

                  <div className="mt-auto">
                    <div className="fs-2 fw-bold mb-3" style={{ color: '#bc544b' }}>
                      {item.price} ₴
                    </div>
                    <Link to={`/product/${item.id}`}>
                      <button 
                        className="btn btn-dark w-100 rounded-3 py-2.5 fw-medium"
                        style={{ backgroundColor: '#1a4332', border: 'none' }}
                      >
                        Детальніше
                      </button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* запитання */}
      <section className="py-5 text-center text-white" style={{ backgroundColor: '#132f23' }}>
        <Container>
          <h2 className="display-5 fw-bold mb-3">Маєте питання?</h2>
          <p className="fs-5 opacity-75 mb-5">Наші фахівці завжди готові допомогти</p>
          <a 
            href="tel:+380507770022" 
            className="btn btn-light btn-lg rounded-4 px-5 py-3 fw-semibold fs-5"
          >
            Зателефонувати
          </a>
        </Container>
      </section>
    </div>
  );
};

export default Home;