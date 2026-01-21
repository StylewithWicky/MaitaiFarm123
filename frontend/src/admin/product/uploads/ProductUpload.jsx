import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Save, AlertCircle } from 'lucide-react';
import styles from '@/styles/AdminPost.module.css';
import SuccessModal from './SuccessModal'; 

const ProductUpload = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // 1. SECURITY CHECK: If not admin, kick them out
    useEffect(() => {
        const role = localStorage.getItem('userRole');
        if (role !== 'admin') {
            navigate('/', { replace: true });
        }
    }, [navigate]);

    const preSelectedCategory = location.state?.selectedCategory || 'Honey';

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: preSelectedCategory,
        breed: '',
        stock: 0,
        sex: 'Male',
        dob: '',
        reg_no: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = (e) => {
        setFormData({ ...formData, category: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Use the generic 'adminToken' we set in the login form
        const token = localStorage.getItem('adminToken'); 
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const priceValue = parseFloat(formData.price);

        const payload = {
            ...formData,
            price: priceValue,
            // Only send livestock data if it's a relevant category
            breed: (formData.category === 'K9' || formData.category === 'Dorper') ? formData.breed : null,
            sex: (formData.category === 'K9' || formData.category === 'Dorper') ? formData.sex : null,
            dob: (formData.category === 'K9' || formData.category === 'Dorper') ? formData.dob : null,
            reg_no: (formData.category === 'K9' || formData.category === 'Dorper') ? formData.reg_no : null,
        };

        try {
            const response = await fetch(`${backendUrl}/products/farmer/1`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setShowModal(true);
            } else {
                const errorData = await response.json();
                console.error("❌ SERVER ERROR:", errorData);
                alert(`Error: ${errorData.detail || "Failed to upload"}`);
            }
        } catch (err) {
            console.error("🔥 FETCH CRASHED:", err);
            alert("Could not reach backend. Check your internet or server status.");
        }
    };

    // Helper to check if we should show livestock inputs
    const isLivestock = formData.category === 'Dorper' || formData.category === 'K9';

    return (
        <div className={styles.postWrapper}>
            <header className={styles.postHeader}>
                <h2>Create New {formData.category} Listing</h2>
                <p>Add products or livestock to the Maitai Farm inventory.</p>
            </header>

            <form className={styles.postForm} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label>Category</label>
                    <select value={formData.category} onChange={handleCategoryChange}>
                        <option value="Dorper">Dorper Sheep</option>
                        <option value="K9">K9 (Dogs)</option>
                        <option value="Honey">Honey</option>
                        <option value="Hives">Bee Hives</option>
                    </select>
                </div>

                <div className={styles.row}>
                    <div className={styles.inputGroup}>
                        <label>Product Name</label>
                        <input name="name" value={formData.name} placeholder="e.g. Grade A Ram" onChange={handleChange} required />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Price (KES)</label>
                        <input name="price" value={formData.price} type="number" placeholder="0.00" onChange={handleChange} required />
                    </div>
                </div>

                {/* --- DYNAMIC LIVESTOCK FIELDS --- */}
                {isLivestock && (
                    <div className={`${styles.row} ${styles.livestockFields}`}>
                        <div className={styles.inputGroup}>
                            <label>Breed</label>
                            <input name="breed" value={formData.breed} placeholder="e.g. Purebred" onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Sex</label>
                            <select name="sex" value={formData.sex} onChange={handleChange}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>
                )}

                <div className={styles.inputGroup}>
                    <label>Description</label>
                    <textarea name="description" value={formData.description} rows="4" placeholder="Details about quality, age, or harvest date..." onChange={handleChange}></textarea>
                </div>

                <button type="submit" className={styles.submitBtn}>
                    <Save size={18} /> Publish to Maitai Farm
                </button>
            </form>

            <SuccessModal 
                isOpen={showModal} 
                onClose={() => setShowModal(false)} 
                productName={formData.name} 
                category={formData.category} 
            />
        </div>
    );
};

export default ProductUpload;