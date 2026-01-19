import React from "react";
import styles from "@/styles/AboutSection.module.css";
import { Leaf, HeartHandshake, ShieldCheck } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about-section" className={styles.aboutSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>About Maitai Farm</h2>

        <p className={styles.subtitle}>
          Maitai Farm is a family-owned farm based in Ndaragwa, dedicated to
          raising high-quality Dorper sheep and producing pure, natural honey.
          We focus on ethical farming, strong genetics, and sustainable practices
          that protect animal welfare, bees, and the land. Our goal is simple:
          deliver healthy livestock and honest farm products you can trust.
        </p>

        <div className={styles.features}>
          <div className={styles.card}>
            <Leaf className={styles.icon} />
            <h3>Sustainable Farming</h3>
            <p>
              We use natural, eco-friendly methods that promote animal health,
              bee conservation, and long-term soil sustainability.
            </p>
          </div>

          <div className={styles.card}>
            <ShieldCheck className={styles.icon} />
            <h3>Quality & Care</h3>
            <p>
              Our Dorper sheep are carefully bred and managed to ensure strong
              genetics, fast growth, and disease-free stock.
            </p>
          </div>

          <div className={styles.card}>
            <HeartHandshake className={styles.icon} />
            <h3>Trusted by Farmers</h3>
            <p>
              We believe in transparency, fair pricing, and building long-term
              relationships with farmers, buyers, and partners.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

