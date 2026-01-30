"use client";

import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import styles from "@/styles/ProductSlider.module.css";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Verified imports based on your folder screenshot
import dorperImg from "@/images/sheep.jpeg";
import honeyImg from "@/images/Honeys.png";
import k9Img from "@/images/Dog.jpeg";
import beehiveImg from "@/images/Hives.png";

const products = [
  { id: "Dorper", name: "Dorper Sheep", image: dorperImg, path: "/products/Dorper" }, 
  { id: "Honey", name: "Pure Forest Honey", image: honeyImg, path: "/products/Honey" },
  { id: "K9", name: "Trained Dogs/K9s", image: k9Img, path: "/products/K9" },
  { id: "Hives", name: "Modern Beehives", image: beehiveImg, path: "/products/Hives" },
];

const NextArrow = ({ onClick }) => (
  <button className={`${styles.arrow} ${styles.next}`} onClick={onClick}>
    <ChevronRight size={24} />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button className={`${styles.arrow} ${styles.prev}`} onClick={onClick}>
    <ChevronLeft size={24} />
  </button>
);

const ProductSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <section className={styles.sliderContainer}>
      <h2 className={styles.title}>Our Premium Selection</h2>
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className={styles.slide}>
            <div className={styles.card}>
              <img src={product.image} alt={product.name} className={styles.image} />
              <div className={styles.info}>
                <h3>{product.name}</h3>
                <Link to={product.path} className={styles.link}>
                  View Details <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default ProductSlider;
