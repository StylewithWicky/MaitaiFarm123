import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Edit, ShieldCheck, Database, Save, XCircle, Trash2 } from 'lucide-react';
import styles from '@/styles/ProductStyles.module.css';

const ProductDetails = () => {
    const { id, category } = useParams(); 
    const navigate = useNavigate();
    
    // States
    const [item, setItem] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);

    // 1. Fetch Item Details
    useEffect(() => {
        if (id && id !== "undefined") {
            fetch(`${import.meta.env.VITE_BACKEND_URL}/products/detail/${id}`)
                .then(res => {
                    if (!res.ok) throw new Error("Product not found");
                    return res.json();
                })
                .then(data => {
                    setItem(data);
                    setFormData(data); // Pre-fill form with current data
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Error fetching detail:", err);
                    setLoading(false);
                });
        }
    }, [id]);

    // 2. Handle Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // 3. Save Changes (PUT)
    const handleSave = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                const updated = await res.json();
                setItem(updated);
                setIsEditing(false);
                alert("Maitai Farm Records Updated! ✅");
            }
        } catch (err) {
            alert("Failed to update product.");
        }
    };

    // 4. Delete Product
    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this product from Maitai Farm?")) {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products/${id}`, { method: 'DELETE' });
            if (res.ok) navigate(-1);
        }
    };

    if (loading) return <div className={styles.wrapper}><p>Loading Product Records...</p></div>;
    if (!item) return <div className={styles.wrapper}><p>Product not found.</p></div>;

    return (
        <div className={styles.wrapper}>
            <button className={styles.backBtn} onClick={() => navigate(-1)}>
                <ChevronLeft size={20} /> Back to {category || 'Inventory'}
            </button>

            <div className={styles.masterCard}>
                <div className={styles.imageBox}>
                    <img src={item.image || '/placeholder-farm.jpg'} alt={item.name} />
                </div>

                <div className={styles.infoBox}>
                    <span className={styles.badge}>Maitai Certified Premium</span>
                    
                    {/* Title Section (Editable) */}
                    {isEditing ? (
                        <input 
                            className={styles.editInput}
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                        />
                    ) : (
                        <h1 className={styles.detailTitle}>{item.name}</h1>
                    )}

                    {/* Description Section (Editable) */}
                    {isEditing ? (
                        <textarea 
                            className={styles.editTextarea}
                            name="description" 
                            value={formData.description} 
                            onChange={handleChange} 
                        />
                    ) : (
                        <p className={styles.description}>{item.description}</p>
                    )}
                    
                    <div className={styles.statsRow}>
                        <div className={styles.stat}>
                            <Database size={18}/> 
                            <span><strong>Stock:</strong> 
                                {isEditing ? (
                                    <input type="number" name="stock" value={formData.stock} onChange={handleChange} className={styles.smallInput} />
                                ) : item.stock}
                            </span>
                        </div>
                        <div className={styles.stat}>
                            <ShieldCheck size={18}/> <span>Quality Inspected</span>
                        </div>
                        
                        {/* Breed/Sex (Only show if relevant) */}
                        {(item.breed || isEditing) && (
                            <div className={styles.stat}>
                                <strong>Breed:</strong> 
                                {isEditing ? <input name="breed" value={formData.breed} onChange={handleChange} /> : item.breed}
                            </div>
                        )}
                    </div>

                    <div className={styles.priceSection}>
                        <label>Current Market Price (KES)</label>
                        {isEditing ? (
                            <input type="number" name="price" value={formData.price} onChange={handleChange} className={styles.priceInput} />
                        ) : (
                            <h2>KES {item.price?.toLocaleString()}</h2>
                        )}
                    </div>

                    {/* Button Controls */}
                    <div className={styles.actionRow}>
                        {isEditing ? (
                            <>
                                <button className={styles.saveBtn} onClick={handleSave}>
                                    <Save size={20}/> Save Changes
                                </button>
                                <button className={styles.cancelBtn} onClick={() => setIsEditing(false)}>
                                    <XCircle size={20}/> Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <button className={styles.editBtn} onClick={() => setIsEditing(true)}>
                                    <Edit size={20}/> Edit Details
                                </button>
                                <button className={styles.deleteBtn} onClick={handleDelete}>
                                    <Trash2 size={20}/> Delete
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;