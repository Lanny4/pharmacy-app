import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { FiPlus } from 'react-icons/fi';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} у кошику!`);
  };

  return (
    <Card className="product-card shadow-sm h-100">
      <div className="card-image-container">
        <Card.Img src={product.image} className="card-image" alt={product.name} />
        <Badge bg="success" className="position-absolute top-0 end-0 m-3 opacity-75">
          {product.category}
        </Badge>
      </div>

      <Card.Body className="d-flex flex-column p-3">
        <Card.Title className="h6 fw-bold">{product.name}</Card.Title>
        <Card.Text className="text-muted small mb-3">
          {product.description?.substring(0, 60)}...
        </Card.Text>
        
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <span className="fw-bold fs-5">{product.price} ₴</span>
          <Button
            variant="success"
            className="rounded-circle p-0 d-flex align-items-center justify-content-center"
            style={{ width: '40px', height: '40px', backgroundColor: '#1a4332' }}
            onClick={handleAddToCart}
          >
            <FiPlus size={20} />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;