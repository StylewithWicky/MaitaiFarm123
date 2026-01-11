import React from "react";
import { ShieldCheck, Truck, Leaf, Star } from "lucide-react";
import styles from "@/styles/WhyChooseUs.module.css";

const WhyChooseUs = () => {
	const items = [
  {
    id: "v1",
    Icon: ShieldCheck,
    title: "Trusted Quality",
    desc: "Our Dorper sheep, honey, and bee hives are raised and managed with care to ensure premium, healthy produce.",
  },

  {
    id: "v2",
    Icon: Truck,
    title: "Fast Delivery",
    desc: "We provide timely delivery of farm products, so you enjoy fresh and top-quality goods straight from our farm.",
  },

  {
    id: "v3",
    Icon: Leaf,
    title: "Sustainable Farming",
    desc: "Maitai Farm follows eco-friendly and ethical farming practices to preserve the land, animals, and bees.",
  },

  {
    id: "v4",
    Icon: Star,
    title: "Expert Care",
    desc: "Our experienced team ensures the health of our livestock and quality of our honey, guaranteeing satisfaction with every product.",
  },
];


	return (
		<section className={styles.wrap} aria-labelledby="why-choose-us-heading">
      			<div className={styles.container}>
        			<h2 id="why-choose-us-heading" className={styles.heading}>
          				Why Choose Maitai Farm
        			</h2>

        			<p className={styles.lead}>
          				Home of healthy Dorper sheep, premium honey, and sustainable farm produce.
					</p>
        			<ul className={styles.grid} role="list">
          				{items.map(({ id, Icon, title, desc }) => (
            					<li key={id} className={styles.card}>
              						<div className={styles.iconWrap} aria-hidden="true">
                						<Icon size={28} strokeWidth={1.6} />
              						</div>

              						<div className={styles.content}>
                						<h3 className={styles.cardTitle}>{title}</h3>
                						<p className={styles.cardDesc}>{desc}</p>
              						</div>
            					</li>
          				))}
        			</ul>
      			</div>
    		</section>
  	);
};


export default WhyChooseUs;