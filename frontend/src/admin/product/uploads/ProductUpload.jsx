import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Save } from 'lucide-react';
import styles from '@/styles/AdminPost.module.css';
import SuccessModal from './SuccessModal'; 

const ProductUpload = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    useEffect(() => {
        const role = localStorage.getItem('userRole');
        if (role !== 'admin') {
            navigate('/', { replace: true });
        }
    }, [navigate]);

    const preSelectedCategory = location.state?.selectedCategory || 'Honey';

    const [showModal, setShowModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
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

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleCategoryChange = (e) => {
        setFormData({ ...formData, category: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem('adminToken'); 
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        const data = new FormData();
        
        data.append('name', formData.name);
        data.append('price', parseFloat(formData.price));
        data.append('description', formData.description);
        data.append('category', formData.category);
        data.append('stock', formData.stock);

        if (formData.category === 'K9' || formData.category === 'Dorper') {
            data.append('breed', formData.breed);
            data.append('sex', formData.sex);
            data.append('dob', formData.dob);
            data.append('reg_no', formData.reg_no);
        }

        if (selectedFile) {
            data.append('file', selectedFile);
        }

        try {
            const response = await fetch(`${backendUrl}/products/farmer/1`, {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${token}` 
                },
                body: data
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
            alert("Could not reach backend.");
        }
    };

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
                    <label>Product Image</label>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        className={styles.fileInput}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Description</label>
                    <textarea name="description" value={formData.description} rows="4" placeholder="Details..." onChange={handleChange}></textarea>
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