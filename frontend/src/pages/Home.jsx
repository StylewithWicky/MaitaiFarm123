import React from "react";
import AdminNavBar from '@/components/layout/AdminNavbar';
import HeroText from "@/components/layout/heroText";
import ProductSlider from "@/components/layout/heroSlider";
import WhyChooseUs from "@/components/layout/WhyChooseUs";
import AboutSection from "@/components/layout/AboutUs";
import AdminFooter from "@/components/layout/AdminFooter";

const Home = () => {
        return (
                <main>
                        <AdminNavBar />
                        <HeroText />
                        <ProductSlider />
                        <WhyChooseUs />
                        <AboutSection />
                        <AdminFooter />
                </main>
        );
};

export default Home;