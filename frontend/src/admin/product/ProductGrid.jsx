import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Eye, Trash2, Plus } from 'lucide-react';
import styles from '@/styles/ProductStyles.module.css';

const ProductGrid = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Example Fetching Logic
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/get_products?category=${category}`)
            .then(res => res.json())
            .then(data => setProducts(data.products));
    }, [category]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h2 className={styles.heading}>{category} Inventory</h2>
                <button className={styles.addBtn}><Plus size={18}/> Add {category}</button>
            </div>

            <div className={styles.grid}>
                {products.map((item) => (
                    <div key={item.id} className={styles.card}>
                        <div className={styles.media}>
                            <img src={item.image} alt={item.name} className={styles.productImage} />
                        </div>
                        <div className={styles.content}>
                            <h3 className={styles.productName}>{item.name}</h3>
                            <div className={styles.priceTag}>KES {item.price}</div>
                            <div className={styles.actions}>
                                <Link to={`/admin/products/${category}/${item.id}`} className={styles.viewLink}>
                                    <Eye size={16}/> View Details
                                </Link>
                                <button className={styles.deleteBtn}><Trash2 size={16}/></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;