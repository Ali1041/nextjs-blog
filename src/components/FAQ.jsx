import React from 'react';

const FAQ = () => {
    return (
        <section className="py-10 py-lg-15">
            <div className="container">
                <div className="row justify-center mb-18">
                    <div className="col-lg-10">
                        <div className="text-center">
                            <h1 className="mb-0 text-white" data-aos="fade-up-sm" data-aos-delay="50">
                                Questions About our Services? <br className="d-none d-md-block" />
                                We have Answers!
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="row justify-center">
                    <div className="col-lg-8" data-aos="fade-up-sm" data-aos-delay="100">
                        <div className="accordion accordion-flush d-flex flex-column gap-6" id="faqAccordion">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapseOne" aria-expanded="false" aria-controls="faq-collapseOne">
                                        <span className="icon"></span>
                                        What Services Does Ijaad Labs Offer?
                                    </button>
                                </h2>
                                <div id="faq-collapseOne" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                                    <div className="accordion-body">
                                        Ijaad Labs offers comprehensive software development services including web development, mobile app development, custom software solutions, generative AI integration, digital transformation, and cloud computing services. We provide end-to-end solutions from concept to deployment.
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapseTwo" aria-expanded="false" aria-controls="faq-collapseTwo">
                                        <span className="icon"></span>
                                        What Technologies Do You Work With?
                                    </button>
                                </h2>
                                <div id="faq-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                    <div className="accordion-body">
                                        We work with modern technologies including React, Node.js, Python, JavaScript, TypeScript, AWS, Azure, Google Cloud, mobile frameworks like React Native and Flutter, and cutting-edge AI technologies to deliver robust and scalable solutions.
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapseThree" aria-expanded="false" aria-controls="faq-collapseThree">
                                        <span className="icon"></span>
                                        How Long Does a Typical Project Take?
                                    </button>
                                </h2>
                                <div id="faq-collapseThree" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                    <div className="accordion-body">
                                        Project timelines vary based on complexity and requirements. Simple websites typically take 2-4 weeks, mobile apps 6-12 weeks, and enterprise software solutions 3-6 months. We provide detailed project timelines during our initial consultation.
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapseFour" aria-expanded="false" aria-controls="faq-collapseFour">
                                        <span className="icon"></span>
                                        Do You Provide Ongoing Support?
                                    </button>
                                </h2>
                                <div id="faq-collapseFour" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                    <div className="accordion-body">
                                        Yes, we provide comprehensive ongoing support and maintenance services. This includes bug fixes, updates, security patches, performance optimization, and feature enhancements to ensure your software continues to perform optimally.
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapseFive" aria-expanded="false" aria-controls="faq-collapseFive">
                                        <span className="icon"></span>
                                        What is Your Development Process?
                                    </button>
                                </h2>
                                <div id="faq-collapseFive" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                    <div className="accordion-body">
                                        Our development process follows industry best practices: Discovery & Planning, Design & Prototyping, Development & Testing, Deployment, and Ongoing Support. We maintain transparent communication throughout the project lifecycle and provide regular updates on progress.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
