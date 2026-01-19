import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Save } from 'lucide-react';
import styles from '@/styles/AdminPost.module.css';
import SuccessModal from './SuccessModal'; 

const ProductUpload = () => {
    const location = useLocation();
    
    
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
        console.log(" TRIGGERED: Attempting to send data to backend...");

        const token = localStorage.getItem('token'); 
        const priceValue = parseFloat(formData.price);

        const payload = {
            ...formData,
            price: priceValue,
            breed: (formData.category === 'K9' || formData.category === 'Dorper') ? formData.breed : null,
            sex: (formData.category === 'K9' || formData.category === 'Dorper') ? formData.sex : null,
            dob: (formData.category === 'K9' || formData.category === 'Dorper') ? formData.dob : null,
            reg_no: (formData.category === 'K9' || formData.category === 'Dorper') ? formData.reg_no : null,
        };

        try {
            const response = await fetch(`http://localhost:8000/products/farmer/1`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(payload)
            });

            console.log("📡 SERVER RESPONSE:", response.status);

            if (response.ok) {
                setShowModal(true); // Matches your state variable
            } else {
                const errorData = await response.json();
                console.error("❌ SERVER ERROR:", errorData);
                alert("Server rejected the data. Check terminal.");
            }
        } catch (err) {
            console.error("🔥 FETCH CRASHED:", err);
            alert("Could not reach backend. Is Uvicorn running?");
        }
    };

    return (
        <div className={styles.postWrapper}>
            <header className={styles.postHeader}>
                <h2>Create New Listing</h2>
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
                        <label>Name / Registered Name</label>
                        <input name="name" value={formData.name} placeholder="e.g. Raw Honey" onChange={handleChange} required />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Price (KES)</label>
                        <input name="price" value={formData.price} type="number" placeholder="0.00" onChange={handleChange} required />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label>Description</label>
                    <textarea name="description" value={formData.description} rows="4" onChange={handleChange}></textarea>
                </div>

                <button type="submit" className={styles.submitBtn}>
                    <Save size={18} /> Publish Listing
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