"use client"
import React, { useState } from 'react';
import ContactModal from './ContactModal';

const Hero = () => {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    const openContactModal = () => {
        setIsContactModalOpen(true);
    };

    const closeContactModal = () => {
        setIsContactModalOpen(false);
    };

    return (
        <>
        <section id="hero" className="hero-section style-1 overflow-hidden bg-dark py-10 py-lg-15" data-bs-theme="dark" role="banner">
            <div className="container">
                <div className="row justify-center">
                    <div className="col-lg-9">
                        <div className="text-center">
                            <div className="position-relative z-1">
                                <p className="text-primary-dark" data-aos="fade-up-sm">
                                    Be the market leader in your industry
                                </p>
                                <h1 className="text-white mb-8" data-aos="fade-up-sm" data-aos-delay="150">
                                    Drastically boost your <br />
                                    <span
                                        className="fw-bold text-gradient-2 typed-animation"
                                        data-strings='["Business", "Web Development", "Mobile Applications", "Software Solutions"]'
                                    >
                                        Business
                                    </span>
                                </h1>
                                <button 
                                    onClick={openContactModal}
                                    className="btn btn-lg btn-gradient-1" 
                                    data-aos="fade-up-sm" 
                                    data-aos-delay="200" 
                                    aria-label="Contact Ijaad Labs for software development services"
                                >
                                    Get Started - Contact Us
                                </button>
                            </div>
                            <div data-aos="fade-up-sm" data-aos-delay="300">
                                <div className="image-with-shape">
                                    <img src="/assets/images/shapes/blurry-shape-1.svg" alt="Decorative background shape" className="shape animate-scale" />
                                    <div className="mt-12 rounded-5 border border-primary-dark shadow-lg overflow-hidden position-relative z-1">
                                        <img className="" src="https://idnrocx8ghz6ymou.public.blob.vercel-storage.com/2023_ultimate_innovation_lab_team_twitter.png" alt="Ijaad Labs - Advanced software development and AI solutions in a futuristic technology environment" />
                                    </div>
                                </div>
                            </div>
                            <ul className="d-flex flex-wrap gap-4 gap-md-8 gap-lg-10 align-center justify-center mt-8 mb-0">
                                <li>Develop Websites Quickly</li>
                                <li>Build Scalable Mobile Apps</li>
                                <li>Innovative Software Solutions</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <ContactModal 
            isOpen={isContactModalOpen} 
            onClose={closeContactModal} 
        />
        </>
    );
};

export default Hero;
