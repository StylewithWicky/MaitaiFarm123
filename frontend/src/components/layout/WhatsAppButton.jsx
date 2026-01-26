import React from 'react';
import { MessageCircle } from 'lucide-react';
import styles from '@/styles/WhatsAppButton.module.css';

const WhatsAppButton = () => {
  const phoneNumber = "254728581959"; 
  const message = "Hello Maitai Farm! I'm inquiring about...";
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a href={waUrl} target="_blank" rel="noopener noreferrer" className={styles.float}>
      <MessageCircle size={32} color="white" />
      <span className={styles.tooltip}>Chat with us</span>
    </a>
  );
};

export default WhatsAppButton;