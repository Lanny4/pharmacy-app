import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="py-5 mt-auto" style={{ backgroundColor: '#132f23', color: '#b5c4bd' }}>
      <Container>
        <Row className="gy-4">
          <Col md={5}>
            <h5 className="text-white fw-bold mb-3">HealthCare</h5>
            <p className="pe-lg-5">
              "Самолікування може бути шкідливим для вашого здоров'я."
            </p>
          </Col>

          <Col md={4}>
            <h5 className="text-white fw-bold mb-3">Контакти</h5>
            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-center">
                <FiMapPin className="me-2 text-success" /> 
                м. Івано-Франківськ, вул. Білозіра, 20
              </li>
              <li className="mb-2">
                <FiPhone className="me-2 text-success" /> +380 (50) 777-00-22
              </li>
              <li className="mb-2">
                <FiMail className="me-2 text-success" /> info@healthcare.if.ua
              </li>
            </ul>
          </Col>

          <Col md={3}>
            <h5 className="text-white fw-bold mb-3">Швидка допомога</h5>
            <p className="small mb-0 text-white-50">
              Онлайн консультації фармацевта: +380 (50) 777-00-22
            </p>
            <p className="fw-bold text-success">08:00 — 22:00</p>
          </Col>
        </Row>

        <hr className="my-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
        <div className="text-center small opacity-50">
          © 2026 HealthCare. Всі права захищені.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;