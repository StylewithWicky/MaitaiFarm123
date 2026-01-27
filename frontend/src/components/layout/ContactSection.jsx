import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import styles from '@/styles/ContactSection.module.css';

const ContactSection = () => {
  const [status, setStatus] = useState('idle'); 
  // 1. Added State for formData to keep it accessible after submission
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    interest: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    // 2. Capture the current values
    const currentData = {
      name: e.target[0].value,
      phone: e.target[1].value,
      interest: e.target[2].value,
      message: e.target[3].value,
    };

    // 3. Save them to state so the success message can see them
    setFormData(currentData);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentData),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        alert("Something went wrong. Please try again.");
        setStatus('idle');
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus('idle');
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.successMessage}>
        <div className={styles.iconCircle}>
          <CheckCircle size={60} color="#2d5a27" strokeWidth={1.5} />
        </div>
        <h3>Message Received!</h3>
        <p>
          Thank you, <strong>{formData.name}</strong>, for reaching out to <strong>Maitai Farm</strong>. <br />
          We've received your inquiry about {formData.interest} and will 
          contact you at {formData.phone} shortly.
        </p>
        <button onClick={() => setStatus('idle')} className={styles.backBtn}>
          Back to Contact Form
        </button>
      </div>
    );
  }

  return (
    <section className={styles.section} id="contact">
      <div className={styles.container}>
        <div className={styles.infoColumn}>
          <h2 className={styles.title}>Get in Touch</h2>
          <p className={styles.description}>
            Have questions about our Dorper breeds or want to order pure honey? 
            Reach out to us directly.
          </p>

          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <div className={styles.iconBox}><Phone size={20} /></div>
              <div>
                <h4>Call or Text</h4>
                <p>+254 728 581 959</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.iconBox}><Mail size={20} /></div>
              <div>
                <h4>Email Us</h4>
                <p>itsjustmaitai@gmail.com</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.iconBox}><MapPin size={20} /></div>
              <div>
                <h4>Farm Location</h4>
                <p>Mailo Kumi, Ndaragwa (Nyahururu)</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.formColumn}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label>Full Name</label>
              <input type="text" placeholder="Enter your name" required />
            </div>

            <div className={styles.inputGroup}>
              <label>Phone Number</label>
              <input type="tel" placeholder="e.g. 0712 345 678" required />
            </div>

            <div className={styles.inputGroup}>
              <label>What are you interested in?</label>
              <select required>
                <option value="">Select an option</option>
                <option value="sheep">Dorper Sheep / Livestock</option>
                <option value="honey">Pure Natural Honey</option>
                <option value="visit">Farm Visit / Consultation</option>
                <option value="other">Other Inquiry</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label>Your Message</label>
              <textarea placeholder="Tell us more about your needs..." rows="4" required></textarea>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={status === 'loading'}>
              {status === 'loading' ? 'Sending...' : 'Send Message'}
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;