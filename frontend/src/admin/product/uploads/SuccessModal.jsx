import React from 'react';
import { CheckCircle, ArrowRight, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from '@/styles/Modal.module.css';

const SuccessModal = ({ isOpen, onClose, productName, category }) => {
    const navigate = useNavigate();
    
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <CheckCircle size={60} className={styles.icon} />
                <h2>Successfully Published!</h2>
                <p><strong>{productName}</strong> is now live in the <strong>{category}</strong> inventory.</p>
                
                <div className={styles.modalActions}>
                    <button 
                        className={styles.secondaryBtn} 
                        onClick={() => {
                            onClose();
                            window.location.reload(); // Clear form for new entry
                        }}
                    >
                        <PlusCircle size={18} /> Add Another
                    </button>
                    
                    <button 
                        className={styles.primaryBtn} 
                        onClick={() => navigate(`/admin/products/${category}`)}
                    >
                        Go to Inventory <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;