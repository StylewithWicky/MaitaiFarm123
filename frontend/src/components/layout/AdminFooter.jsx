import React from "react";
import styles from "@/styles/Footer.module.css";
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin } from "lucide-react";

const AdminFooter = () => {
        return (
                <footer className={styles.footer}>
                        <div className={styles.container}>

                                {/* Brand + tagline */}
                                <div className={styles.section}>
                                        <h3 className={styles.logo}>Maitai Farm</h3>
                                        <p className={styles.tagline}>
                                                Home of healthy Dorper sheep, premium honey, and sustainable farm produce
                                        </p>
                                </div>

                                {/* Quick links */}
                                <div className={styles.section}>
                                        <h4 className={styles.heading}>Quick Links</h4>
                                        <ul className={styles.links}>
                                                <li><a href="/admin/dashboard">Home</a></li>
                                                <li><a href="/admin/upload">Post</a></li>
                                                <li><a href="/admin/products/Hives">Modern Beehives</a></li>
                                                <li><a href="/admin/network/Honey">Honey</a></li>
                                                <li><a href="/admin/products/Dorper">Dorper Sheep</a></li>
                                                <li><a href="/admin/products/K9">K9</a></li>
                                                <li><a href="/admin/contact">Support</a></li>
                                        </ul>
                                </div>

                                {/* Contact */}
                                <div className={styles.section}>
                                        <h4 className={styles.heading}>Contact</h4>
                                        <ul className={styles.contact}>
                                                <li><MapPin size={16} /> Nairobi, Kenya</li>
                                                <li><Phone size={16} /> +254 728 581 959</li>
                                                <li><Mail size={16} /> maitaifarm@gmail.com</li>
                                        </ul>
                                </div>

                                {/* Socials */}
                                <div className={styles.section}>
                                        <h4 className={styles.heading}>Follow Us</h4>
                                        <div className={styles.socials}>
                                                <a href="#"><Facebook size={18} /></a>
                                                <a href="#"><Instagram size={18} /></a>
                                                <a href="#"><Linkedin size={18} /></a>
                                        </div>
                                </div>
                        </div>

                        {/* Bottom bar */}
                        <div className={styles.bottom}>
                                <p>© {new Date().getFullYear()} Maitai Farm. All rights reserved.</p>
                        </div>
                </footer>
        );
};

export default AdminFooter;