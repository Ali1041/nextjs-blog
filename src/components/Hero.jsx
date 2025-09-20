import React from 'react';

const Hero = () => {
    return (
        <section className="hero-section style-1 overflow-hidden bg-dark py-10 py-lg-15" data-bs-theme="dark">
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
                                <a href="/contact" className="btn btn-lg btn-gradient-1" data-aos="fade-up-sm" data-aos-delay="200">
                                    Get Started - Contact Us
                                </a>
                            </div>
                            <div data-aos="fade-up-sm" data-aos-delay="300">
                                <div className="image-with-shape">
                                    <img src="/assets/images/shapes/blurry-shape-1.svg" alt="" className="shape animate-scale" />
                                    <div className="mt-12 rounded-5 border border-primary-dark shadow-lg overflow-hidden position-relative z-1">
                                        <img className="img-fluid d-inline-block" src="/assets/images/business.jpeg" alt="" />
                                    </div>
                                </div>
                            </div>
                            <ul className="d-flex flex-wrap gap-4 gap-md-8 gap-lg-10 align-center justify-center mt-8 mb-0">
                                <li>Develop Websites Quickly</li>
                                <li>Build Scalable Mobile Apps</li>
                                <li>Innovative Software Solutions</li>
                            </ul>
                            <div className="d-flex gap-8 align-center justify-center mt-12 review-badges">
                                <img className="img-fluid" src="/assets/images/review-logos/trustpilot_reviews.svg" alt="" />
                                <img className="img-fluid" src="/assets/images/review-logos/capterra_reviews.svg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
