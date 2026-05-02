import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { FiPlus } from 'react-icons/fi';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} додано до кошика!`);
  };

  return (
    <Card className="h-100 product-card shadow-sm border-0 overflow-hidden">
      <div className="position-relative overflow-hidden">
        <Card.Img variant="top" src={product.image} className="card-image" />
        <Badge 
          bg="light" 
          text="dark" 
          className="position-absolute top-0 end-0 m-3 shadow-sm border"
        >
          {product.category}
        </Badge>
      </div>
      <Card.Body className="d-flex flex-column p-4">
        <Card.Title className="h5 fw-bold mb-2">{product.name}</Card.Title>
        <Card.Text className="text-muted small flex-grow-1">
          {product.description.substring(0, 80)}...
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="h5 mb-0 fw-bold text-success">{product.price} грн</span>
          <Button 
            variant="success" 
            className="rounded-circle d-flex align-items-center justify-content-center" 
            style={{ width: '45px', height: '45px', padding: '0' }}
            onClick={handleAddToCart}
          >
            <FiPlus size={24} />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;