import React from 'react';
import Hero from '../../components/Hero';
import Features from '../../components/Features';
import Features3 from '../../components/Features3';
import Projects from '../../components/Projects';
import UseCases from '../../components/UseCases';
import Reviews from '../../components/Reviews';
import Pricing from '../../components/Pricing';
import FAQ from '../../components/FAQ';
import CTA from '../../components/CTA';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const LandingPage = () => {
    return (
        <div className="wrapper d-flex flex-column justify-between">
            <Navbar />
            <main className="flex-grow-1 mt-16">
                <Hero />
                <Features />
                <Features3 />
                <Projects />
                <UseCases />
                <Reviews />
                <Pricing />
                <FAQ />
                <CTA />
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;
