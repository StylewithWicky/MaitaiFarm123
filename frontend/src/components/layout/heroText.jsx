import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from 'lucide-react';
import styles from '@/styles/HeroText.module.css';

const HeroText = () => {
    // Function to handle the smooth scroll
    const handleScroll = () => {
        window.scrollTo({ 
            top: window.innerHeight, 
            behavior: 'smooth' 
        });
    };

    return (
        <section className={styles.heroSection}>
            <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                poster="/images/image.png" // Displays image until video plays
                className={styles.heroVideo}
            >
                <source src="/videos/cattle.mp4" type="video/mp4" />
            </video>

            {/* The Gradient Scrim */}
            <div className={styles.heroOverlay}></div>

            <div className={styles.heroContainer}>
                <motion.h1 
                    className={styles.heroTitle}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Raising Quality, Delivering Excellence <br /> 
                    <span className={styles.highlight}>Welcome to Maitai Farm</span>
                </motion.h1>

                <motion.p 
                    className={styles.heroSubtitle}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                >
                    Home of healthy Dorper sheep, premium honey, and sustainable farm produce.
                </motion.p>

                {/* Interactive Discover More */}
                <motion.div 
                    className={styles.scrollIndicator}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    onClick={handleScroll}
                >
                    <span>Discover More</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ChevronDown size={32} />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroText;