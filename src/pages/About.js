import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FiCheckCircle, FiUsers, FiHeart } from 'react-icons/fi';

const About = () => {
  return (
    <Container className="py-5">
      {/* Секція: Хто ми */}
      <Row className="align-items-center mb-5">
        <Col lg={6}>
          <h1 className="fw-bold mb-4" style={{ color: '#1a4332' }}>Про HealthCare</h1>
          <p className="lead text-muted">
            Ми — сучасна аптечна мережа в Івано-Франківську, що поєднує високі стандарти фармацевтичної опіки з цифровою зручністю.
          </p>
          <p className="text-secondary">
            Наш проект був створений для того, щоб кожен мешканець міста міг отримати доступ до необхідних ліків та професійної косметики не виходячи з дому. Ми ретельно відбираємо постачальників та гарантуємо якість кожного товару в нашому каталозі.
          </p>
        </Col>
        <Col lg={6}>
          <img 
            src="https://images.unsplash.com/photo-1576602976047-174e57a47881?w=800" 
            alt="Аптека" 
            className="img-fluid rounded-4 shadow"
          />
        </Col>
      </Row>

      {/* Секція: Наші цінності */}
      <Row className="g-4 mb-5">
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm p-4 text-center">
            <FiCheckCircle size={40} className="text-success mb-3 mx-auto" />
            <h5 className="fw-bold">Якість</h5>
            <p className="small text-muted mb-0">Тільки сертифіковані препарати та перевірені бренди косметики.</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm p-4 text-center">
            <FiUsers size={40} className="text-success mb-3 mx-auto" />
            <h5 className="fw-bold">Турбота</h5>
            <p className="small text-muted mb-0">Індивідуальний підхід до кожного клієнта та фахова консультація.</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm p-4 text-center">
            <FiHeart size={40} className="text-success mb-3 mx-auto" />
            <h5 className="fw-bold">Локальність</h5>
            <p className="small text-muted mb-0">Ми працюємо для Івано-Франківська, знаючи потреби наших містян.</p>
          </Card>
        </Col>
      </Row>

      {/* Секція: Контакти */}
      <div className="p-5 rounded-4 text-white" style={{ backgroundColor: '#1a4332' }}>
        <Row className="align-items-center">
          <Col md={8}>
            <h3 className="fw-bold mb-3">Залишилися питання?</h3>
            <p className="mb-0 opacity-75">Наші фармацевти готові допомогти вам з вибором ліків або засобів догляду за шкірою щодня з 08:00 до 22:00.</p>
          </Col>
          <Col md={4} className="text-md-end mt-4 mt-md-0">
            <h4 className="fw-bold">+380 (50) 777-00-22</h4>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default About;