import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, Trash2, Plus } from 'lucide-react';
import styles from '@/styles/ProductStyles.module.css';

const ProductGrid = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const navigate = useNavigate(); 
    const location = useLocation();
    
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://maitaifarm123.onrender.com';

    const isAdmin = localStorage.getItem("userRole") === "admin" && location.pathname.startsWith('/admin');

    const handleAddClick = () => {
        navigate('/admin/upload', { state: { selectedCategory: category } });
    };

    useEffect(() => {
        if (!backendUrl) return;

        fetch(`${backendUrl}/products/?category=${category}`)
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(data => {
                setProducts(data || []); 
            })
            .catch(err => console.error("Fetch error:", err));
    }, [category, backendUrl]);

    const handleDelete = async (productId) => {
        if (!productId) return;
        
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const response = await fetch(`${backendUrl}/products/${productId}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    setProducts((prevProducts) => prevProducts.filter((p) => p.id !== productId));
                } else {
                    alert("Failed to delete the product.");
                }
            } catch (err) {
                console.error("Delete error:", err);
            }
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h2 className={styles.heading}>{category} {isAdmin ? 'Inventory' : 'Listings'}</h2>
                
                {isAdmin && (
                    <button className={styles.addBtn} onClick={handleAddClick}>
                        <Plus size={18}/> Add New {category}
                    </button>
                )}
            </div>

            <div className={styles.grid}>
                {products.length > 0 ? (
                    products.map((item) => (
                        <div key={item.id} className={styles.card}>
                            <div className={styles.media}>
                                <img 
                                    src={item.image_url || '/placeholder-dog.jpg'} 
                                    alt={item.name} 
                                    className={styles.productImage} 
                                />
                            </div>
                            <div className={styles.content}>
                                <h3 className={styles.productName}>{item.name}</h3>
                                <div className={styles.priceTag}>
                                    KES {item.price ? item.price.toLocaleString() : '0'}
                                </div>
                                
                                <div className={styles.actions}>
                                    <Link 
                                        to={isAdmin ? `/admin/products/${category}/${item.id}` : `/products/${category}/${item.id}`} 
                                        className={styles.viewLink}
                                    >
                                        <Eye size={16}/> View Details
                                    </Link>

                                    {isAdmin && (
                                        <button 
                                            className={styles.deleteBtn} 
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            <Trash2 size={16}/> Delete
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className={styles.noData}>
                        No {category} listings found. {isAdmin && 'Click "Add New" to create one.'}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductGrid;