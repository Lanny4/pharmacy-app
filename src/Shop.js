import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { FiSearch, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

// картинки
const fixImage = (img) => {
  if (!img) return '/image/logo192.png';
  if (img.startsWith('http')) return img;
  if (img.startsWith('/image')) return img;
  if (img.startsWith('image/')) return `/${img}`;
  return `/image/${img}`;
};

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Усі категорії');

  const { addToCart } = useCart();

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const list = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setProducts(list);
      setFilteredProducts(list);
    } catch (err) {
      console.error("Помилка завантаження товарів:", err);
      toast.error("Не вдалося завантажити товари");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = products.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedCategory !== 'Усі категорії') {
      result = result.filter(p => p.category === selectedCategory);
    }

    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, products]);

  const categories = ['Усі категорії', ...new Set(products.map(p => p.category))];

  const handleAdd = (product) => {
    addToCart(product);
    toast.success(`${product.name} додано до кошика!`);
  };

  return (
    <Container className="py-5">

      {/* HEADER */}
      <div className="mb-4">
        <h1 className="fw-bold" style={{ color: '#132f23' }}>
          Каталог аптеки
        </h1>
      </div>

      {/* SEARCH + FILTER */}
      <div className="d-flex gap-3 mb-5 flex-column flex-md-row" style={{ maxWidth: '700px' }}>
        <div className="position-relative flex-grow-1">
          <FiSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
          <input
            type="text"
            placeholder="Пошук ліків або косметики..."
            className="form-control ps-5 py-3 rounded-4 border-0 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="form-select py-3 rounded-4 border-0 shadow-sm"
          style={{ maxWidth: '230px' }}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* PRODUCTS */}
      <Row className="g-4">
        {filteredProducts.map(p => (
          <Col key={p.id} sm={6} md={4} lg={3}>
            <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden hover-card">

              <Link to={`/product/${p.id}`}>
                <div className="position-relative bg-light overflow-hidden" style={{ height: '250px' }}>
                  <img 
                    src={fixImage(p.image)}
                    alt={p.name}
                    className="w-100 h-100 p-4"
                    style={{ objectFit: 'contain' }}
                    onError={(e) => { e.target.src = '/image/logo192.png'; }}
                  />
                </div>
              </Link>

              <Card.Body className="d-flex flex-column p-4">
                <Badge bg="light" text="dark" className="mb-3 align-self-start">
                  {p.category}
                </Badge>
                
                <Card.Title 
                  as={Link} 
                  to={`/product/${p.id}`} 
                  className="fw-bold mb-2 fs-5 text-decoration-none text-dark"
                >
                  {p.name}
                </Card.Title>

                <p className="text-muted small mb-4">{p.sub}</p>

                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <span className="fs-4 fw-bold" style={{ color: '#bc544b' }}>
                    {p.price} ₴
                  </span>

                  <Button
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '14px',
                      backgroundColor: '#1a4332',
                      border: 'none'
                    }}
                    onClick={() => handleAdd(p)}
                  >
                    <FiPlus size={24} />
                  </Button>
                </div>

              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

    </Container>
  );
};

export default Shop;