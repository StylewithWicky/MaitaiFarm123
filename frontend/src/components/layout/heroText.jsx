import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from 'lucide-react';
import styles from '@/styles/HeroText.module.css';
import cattle from '@/videos/cattle.mp4';

const HeroText = () => {
    return (
        <section className={styles.heroSection}>
            {/* The Video Layer */}
            <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className={styles.heroVideo}
            >
                <source src="/videos/cattle.mp4" type="video/mp4" />
                {/* Fallback image if video fails */}
                <img src="/images/image.png" title="Maitai Farm" alt="Farm Background" />
            </video>

            {/* The Tint Overlay (Gradient) */}
            <div className={styles.heroOverlay}></div>

            {/* The Content Layer */}
            <div className={styles.heroContainer}>
                <motion.h1 
                    className={styles.heroTitle}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Raising Quality, Delivering Excellence – Welcome to Maitai Farm
                </motion.h1>

                <motion.p 
                    className={styles.heroSubtitle}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                >
                    Home of healthy Dorper sheep, premium honey, and sustainable farm produce.
                </motion.p>
                
                <motion.button 
                    className={styles.heroCTA}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ delay: 1 }}
                >
                    Explore Our Produce
                </motion.button>
				 


				<motion.div 
					className={styles.scrollIndicator}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1.5, duration: 1 }}
					onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
				>
    			<span>Discover More</span>
				<motion.div
					animate={{ y: [0, 10, 0] }}
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