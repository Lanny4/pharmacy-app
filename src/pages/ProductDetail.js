import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const imagePath = process.env.REACT_APP_IMAGE_PATH || '/image';

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ ...docSnap.data(), id: docSnap.id });
        } else {
          navigate('/shop');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleAdd = () => {
    addToCart(product);
    toast.success(`${product.name} додано до кошика!`);
  };

  if (loading) return <Container className="py-5 text-center"><h4>Завантаження...</h4></Container>;

  return (
    <Container className="py-5">
      <Button as={Link} to="/shop" variant="link" className="mb-4 text-success">
        <FiArrowLeft /> Назад до каталогу
      </Button>

      <Row className="g-5">
        <Col lg={5}>
          <img 
            src={`${imagePath}/${product.image}`} 
            alt={product.name}
            className="img-fluid rounded-4 shadow-sm"
            onError={(e) => { e.target.src = '/image/logo192.png'; }}
          />
        </Col>

        <Col lg={7}>
          <Badge bg="light" className="mb-3">{product.category}</Badge>
          <h1 className="fw-bold mb-3" style={{ color: '#132f23' }}>{product.name}</h1>
          <h4 className="text-success mb-4">{product.price} ₴</h4>

          <p className="lead text-muted">{product.desc}</p>
          {product.sub && <p><strong>Форма випуску:</strong> {product.sub}</p>}

          <Button 
            size="lg" 
            className="mt-4 px-5 py-3 rounded-pill"
            style={{ backgroundColor: '#1a4332', border: 'none' }}
            onClick={handleAdd}
          >
            <FiPlus className="me-2" /> Додати до кошика
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
