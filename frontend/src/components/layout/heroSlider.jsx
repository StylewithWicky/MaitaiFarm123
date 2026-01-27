"use client";

import React from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import styles from "@/styles/ProductSlider.module.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import dorperImg from "@/images/Dorper.png";
import honeyImg from "@/images/honey.png";
import k9Img from "@/images/k9.png";
import beehiveImg from "@/images/beehives.png";

const products = [
  { id: "p1", name: "Dorper Sheep", image: dorperImg }, 
  { id: "p2", name: "Pure Forest Honey", image: honeyImg },
  { id: "p3", name: "Trained Dogs/K9s", image: k9Img },
  { id: "p4", name: "Modern Beehives", image: beehiveImg },
];


const NextArrow = ({ onClick }) => (
  <button className={`${styles.arrow} ${styles.next}`} onClick={onClick} aria-label="Next">
    <ChevronRight size={24} />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button className={`${styles.arrow} ${styles.prev}`} onClick={onClick} aria-label="Previous">
    <ChevronLeft size={24} />
  </button>
);

const ProductSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dotsClass: `slick-dots ${styles.customDots}`,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.heading}>What We Offer at Maitai Farm</h2>
        <p className={styles.subheading}>Quality livestock and premium farm products from Ndaragwa.</p>
      </div>

      <Slider {...settings} className={styles.sliderWrap}>
        {products.map((product) => (
          <div key={product.id} className={styles.slide}>
            <div className={styles.card}>
              <div className={styles.media}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.productImage}
                />
              </div>
              <div className={styles.content}>
                <h3 className={styles.productName}>{product.name}</h3>
                <button className={styles.viewBtn}>
                  View Details <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default ProductSlider;
