import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import styles from "@/styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.logo}>MAITAI FARM</div>
          <p className={styles.tagline}>
            Raising quality and delivering excellence in every harvest. 
            Sustainable farming from the heart of Nyandarua.
          </p>
        </div>

        <div className={styles.section}>
          <h4 className={styles.heading}>Our Produce</h4>
          <ul className={styles.links}>
            <li><Link to="/products/Dorper">Dorper Sheep</Link></li>
            <li><Link to="/products/Hives">Bee Hives</Link></li>
            <li><Link to="/products/Honey">Natural Honey</Link></li>
            <li><Link to="/products/K9">K9/Dogs</Link></li>
          </ul>
        </div>

        <div className={styles.section}>
          <h4 className={styles.heading}>Company</h4>
          <ul className={styles.links}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/location">Location</Link></li>
          </ul>
        </div>

        <div className={styles.section}>
          <h4 className={styles.heading}>Reach Out</h4>
          <ul className={styles.contact}>
            <li><MapPin size={18} /> Nyandarua, Kenya</li>
            <li><Phone size={18} /> +254 728 581 959</li>
            <li><Mail size={18} /> itsjustmaitai@gmail.com</li>
          </ul>
          <div className={styles.socials}>
            <a href="https://www.facebook.com/p/Maitai-FARM-61555882814110/" target="_blank" rel="noreferrer"><Facebook size={18} /></a>
            <a href="https://www.instagram.com/maitaifarm/" target="_blank" rel="noreferrer"><Instagram size={18} /></a>
            <a href="https://www.youtube.com/@MAITAIFARM" target="_blank" rel="noreferrer"><Youtube size={18} /></a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>
          &copy; {new Date().getFullYear()}{" "}
          
          <Link to="/admin/login" className={styles.secret}>Maitai Farm</Link>. 
          All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;