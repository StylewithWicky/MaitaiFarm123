import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Edit, ShieldCheck, Database } from 'lucide-react';
import styles from '@/styles/ProductStyles.module.css';

const ProductDetails = () => {
    
    const { id, category } = useParams(); 
    const navigate = useNavigate();
    const [item, setItem] = useState(null);

    useEffect(() => {

        if (id && id !== "undefined") {
            console.log(`Fetching details for ID: ${id}`);
            fetch(`${import.meta.env.VITE_BACKEND_URL}/products/detail/${id}`)
                .then(res => {
                    if (!res.ok) throw new Error("Product not found");
                    return res.json();
                })
                .then(data => setItem(data))
                .catch(err => console.error("Error fetching detail:", err));
        }
    }, [id]);

    if (!item) return (
        <div className={styles.wrapper}>
            <p>Loading product details...</p>
        </div>
    );

    return (
       <div className={styles.wrapper}>
  <button className={styles.backBtn} onClick={() => navigate(-1)}>
    <ChevronLeft size={20} /> Back to {category}
  </button>

  <div className={styles.masterCard}>
    <div className={styles.imageBox}>
      <img src={item.image || '/placeholder-farm.jpg'} alt={item.name} />
    </div>

    <div className={styles.infoBox}>
      <span className={styles.badge}>Maitai Certified Premium</span>
      <h1 className={styles.detailTitle}>{item.name}</h1>
      <p className={styles.description}>{item.description}</p>
      
      <div className={styles.statsRow}>
        <div className={styles.stat}>
          <Database size={18}/> <span><strong>Stock:</strong> {item.stock}</span>
        </div>
        <div className={styles.stat}>
          <ShieldCheck size={18}/> <span>Quality Inspected</span>
        </div>
        {item.breed && (
          <div className={styles.stat}>
            <strong>Breed:</strong> {item.breed}
          </div>
        )}
        {item.sex && (
          <div className={styles.stat}>
            <strong>Sex:</strong> {item.sex}
          </div>
        )}
      </div>

      <div className={styles.priceSection}>
        <label>Current Market Price</label>
        <h2>KES {item.price?.toLocaleString()}</h2>
      </div>

      <button className={styles.editBtn}>
        <Edit size={20}/> Edit Product Details
      </button>
    </div>
  </div>
</div>
    );
};

export default ProductDetails;