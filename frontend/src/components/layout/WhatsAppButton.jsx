import React from 'react';
import { MessageCircle } from 'lucide-react';
import styles from '@/styles/WhatsAppButton.module.css';

const WhatsAppButton = () => {
  const phoneNumber = "254728581959"; 
  const message = "Hello Maitai Farm! I'm inquiring about your livestock and honey.";
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className={styles.wrapper}>
      {/* The label that appears on hover */}
      <span className={styles.tooltip}>Chat with us</span>
      
      {/* The actual button */}
      <a 
        href={waUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={styles.float}
        aria-label="Contact Maitai Farm on WhatsApp"
      >
        <MessageCircle size={30} fill="white" strokeWidth={1.5} />
      </a>
    </div>
  );
};

export default WhatsAppButton;