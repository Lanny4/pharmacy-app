// src/hooks/useOrders.js
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser?.uid) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        
        const q = query(
          collection(db, "orders"),
          where("userId", "==", currentUser.uid)
        );

        const snapshot = await getDocs(q);
        
        const userOrders = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate ? 
                      data.createdAt.toDate() : 
                      new Date(data.createdAt || Date.now())
          };
        });

        // Сортуємо на клієнті (тимчасово)
        userOrders.sort((a, b) => b.createdAt - a.createdAt);

        setOrders(userOrders);
        setError(null);
      } catch (err) {
        console.error("Помилка завантаження замовлень:", err);
        setError("Не вдалося завантажити замовлення. Спробуйте пізніше.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  return { orders, loading, error };
};