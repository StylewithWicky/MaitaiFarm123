import React from "react";
import HeroText from "@/components/layout/heroText";
import ProductSlider from "@/components/layout/heroSlider";
import WhyChooseUs from "@/components/layout/WhyChooseUs";
import AboutSection from "@/components/layout/AboutUs";
import NavBar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const LandingPage = () => {
        return (
                <main>
                        <NavBar />
                        <HeroText />
                        <ProductSlider />
                        <WhyChooseUs />
                        <AboutSection />
                        <Footer />
                        
                </main>
        );
};

export default LandingPage;