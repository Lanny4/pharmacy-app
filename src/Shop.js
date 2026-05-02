// src/pages/Shop.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { FiSearch, FiPlus, FiCheck } from 'react-icons/fi';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Усі категорії');
  const [addedId, setAddedId] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const imagePath = process.env.REACT_APP_IMAGE_PATH || '/image';

  // Функція завантаження товарів
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const list = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setProducts(list);
      setFilteredProducts(list);
      console.log("Отримано товарів з бази:", list.length);
    } catch (err) {
      console.error("Помилка завантаження товарів:", err);
      toast.error("Не вдалося завантажити товари з Firebase");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Фільтрація
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
    setAddedId(product.id);
    toast.success(`${product.name} додано до кошика!`);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <h1 className="fw-bold" style={{ color: '#132f23' }}>Каталог аптеки</h1>
        {/* Кнопку видалено, заголовок залишено */}
      </div>

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

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Завантаження...</span>
          </div>
          <p className="mt-2 text-muted">Завантажуємо ліки...</p>
        </div>
      ) : (
        <Row className="g-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(p => (
              <Col key={p.id} sm={6} md={4} lg={3}>
                <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden product-card">
                  <div className="position-relative bg-light overflow-hidden" style={{ height: '220px' }}>
                    <img 
                      src={`${imagePath}/${p.image}`} 
                      alt={p.name}
                      className="w-100 h-100 p-3"
                      style={{ 
                        objectFit: 'contain',
                        transition: 'transform 0.4s ease'
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/200?text=Medicine'; 
                      }}
                    />
                  </div>

                  <Card.Body className="d-flex flex-column p-4">
                    <Badge bg="success" className="mb-3 align-self-start opacity-75">
                      {p.category}
                    </Badge>
                    
                    <Card.Title className="fw-bold mb-1 fs-5 text-truncate">{p.name}</Card.Title>
                    <p className="text-muted small mb-4" style={{ height: '40px', overflow: 'hidden' }}>
                      {p.sub}
                    </p>

                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <span className="fs-4 fw-bold" style={{ color: '#bc544b' }}>
                        {p.price} ₴
                      </span>
                      <Button
                        style={{ 
                          backgroundColor: '#1a4332', 
                          border: 'none', 
                          width: '48px', 
                          height: '48px', 
                          borderRadius: '12px'
                        }}
                        onClick={() => handleAdd(p)}
                      >
                        {addedId === p.id ? <FiCheck size={22} /> : <FiPlus size={22} />}
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <div className="text-center py-5">
              <h3>Товарів не знайдено</h3>
              <p className="text-muted">Спробуйте змінити запит або категорію</p>
            </div>
          )}
        </Row>
      )}
    </Container>
  );
};

export default Shop;