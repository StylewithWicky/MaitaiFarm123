import React from "react";
import styles from '@/styles/HeroText.module.css';


const HeroText = () => {
	return (
		<section className={styles.heroSection}>
			<div className={styles.heroContainer}>
				<h1 className={styles.heroTitle}>Raising Quality, Delivering Excellence – Welcome to Maitai Farm</h1>


				<p className={styles.heroSubtitle}>Home of healthy Dorper sheep, premium honey, and sustainable farm produce.</p>

			</div>
		</section>
	);
};

export default HeroText;