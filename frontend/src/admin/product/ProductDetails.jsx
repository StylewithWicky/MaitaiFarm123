import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Edit, ShieldCheck, Database } from 'lucide-react';
import styles from '@/styles/ProductStyles.module.css';

const ProductDetails = () => {
    const { id, category } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`)
            .then(res => res.json())
            .then(data => setItem(data));
    }, [id]);

    if (!item) return <p>Loading...</p>;

    return (
        <div className={styles.wrapper}>
            <button className={styles.backBtn} onClick={() => navigate(-1)}>
                <ChevronLeft size={20} /> Back to {category}
            </button>

            <div className={styles.masterCard}>
                <div className={styles.imageBox}>
                    <img src={item.image} alt={item.name} />
                </div>
                <div className={styles.infoBox}>
                    <span className={styles.badge}>Maitai Premium</span>
                    <h1 className={styles.detailTitle}>{item.name}</h1>
                    <p className={styles.description}>{item.description}</p>
                    
                    <div className={styles.statsRow}>
                        <div className={styles.stat}><Database size={18}/> Stock: {item.stock}</div>
                        <div className={styles.stat}><ShieldCheck size={18}/> Quality Assured</div>
                    </div>

                    <div className={styles.priceSection}>
                        <label>Current Price</label>
                        <h2>KES {item.price}</h2>
                    </div>

                    <button className={styles.editBtn}><Edit size={18}/> Edit Product</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;