import React from 'react';

const Pricing = () => {
    return (
        <section className="py-10 py-lg-15">
            <div className="container">
                <div className="row justify-center mb-18">
                    <div className="col-lg-10">
                        <div className="text-center">
                            <p className="text-primary-dark" data-aos="fade-up-sm" data-aos-delay="50">
                                Get Your Custom Quote
                            </p>
                            <h1 className="text-white mb-5" data-aos="fade-up-sm" data-aos-delay="100">
                                Ready to Transform Your Business? <br />
                                Let's Discuss Your Project
                            </h1>
                            <p className="mb-8" data-aos="fade-up-sm" data-aos-delay="150">
                                Every project is unique. Contact us for a personalized quote tailored to your specific needs and budget.
                            </p>
                            <div className="d-flex flex-column flex-md-row gap-4 justify-center" data-aos="fade-up-sm" data-aos-delay="200">
                                <a href="/contact" className="btn btn-lg btn-gradient-1">
                                    Get Custom Quote
                                </a>
                                <a href="tel:+923037944966" className="btn btn-lg btn-outline-primary-dark">
                                    Call Us Now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
