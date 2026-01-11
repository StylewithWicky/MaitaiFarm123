import React from "react";
import styles from "@/styles/AboutSection.module.css";
import { Cpu, Wifi, ShieldCheck } from "lucide-react";

const AboutSection = () => {
	return (
    		<section className={styles.aboutSection}>
      			<div className={styles.container}>
        			<h2 className={styles.title}>About Maitai Farm</h2>

        			<p className={styles.subtitle}>
          				Maitai Farm is a family-owned farm located in Ndaragwa, specializing in high-quality Dorper sheep, natural honey, and sustainable bee hives. We are committed to ethical and eco-friendly farming practices, ensuring our animals are healthy, our honey is pure, and our products meet the highest standards. With a focus on superior genetics, careful animal husbandry, and expert care, Maitai Farm delivers freshness, quality, and reliability directly from the farm to your table.
					</p>
        			<div className={styles.features}>
          				<div className={styles.card}>
            					<Wifi className={styles.icon} />
            					<h3>Networking Experts</h3>
            					<p>
              						From routers to enterprise switches, we supply dependable
              						networking hardware for every environment.
            					</p>
         				 </div>

          				<div className={styles.card}>
            					<Cpu className={styles.icon} />
            					<h3>Quality Tech Devices</h3>
            					<p>
              						We offer computers, laptops, monitors, and accessories from
              						trusted brands, ensuring top performance.
            					</p>
          				</div>

          				<div className={styles.card}>
            					<ShieldCheck className={styles.icon} />
            					<h3>Trusted & Reliable</h3>
            					<p>
              						Every product we sell is verified for reliability and backed by a
              						commitment to excellent customer service.
            					</p>
          				</div>
        			</div>
      			</div>
    		</section>
  	);
};

export default AboutSection;
