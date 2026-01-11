"use client";

import React from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "@/styles/ProductSlider.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Product categories
const products = [
  { id: "p1", name: "Dorper Sheep", image: "/products/router.png" },
  { id: "p2", name: "Pure Forest Honey", image: "/products/switch.png" },
  { id: "p3", name: "Trained Dogs/K9s", image: "/products/ap.png" },
  { id: "p4", name: "Mordern Beehives", image: "/products/monitor.png" },
 
];

// Custom arrows
const NextArrow = ({ onClick }) => (
  <button className={`${styles.arrow} ${styles.next}`} onClick={onClick} type="button">
    <ChevronRight size={18} />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button className={`${styles.arrow} ${styles.prev}`} onClick={onClick} type="button">
    <ChevronLeft size={18} />
  </button>
);

const ProductSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className={styles.wrapper} aria-label="Product categories">
      <h2 className={styles.heading}>What We Offer at Maitai Farm</h2>
      <Slider {...settings} className={styles.sliderWrap}>
        {products.map((product) => (
          <div key={product.id} className={styles.slide}>
            <div className={styles.card}>
              <div className={styles.media}>
                <div className={styles.mediaInner}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={styles.productImage}
                  />
                </div>
              </div>
              <h3 className={styles.productName}>{product.name}</h3>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default ProductSlider;
