'use client';

import React, { useState } from 'react';

const FAQ = () => {
    const [openItems, setOpenItems] = useState({ 0: true }); // First item open by default

    const toggleItem = (index) => {
        setOpenItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const faqData = [
        {
            question: "What Services Does Ijaad Labs Offer?",
            answer: "Ijaad Labs offers comprehensive software development services including web development, mobile app development, custom software solutions, generative AI integration, digital transformation, and cloud computing services. We provide end-to-end solutions from concept to deployment."
        },
        {
            question: "What Technologies Do You Work With?",
            answer: "We work with modern technologies including React, Node.js, Python, JavaScript, TypeScript, AWS, Azure, Google Cloud, mobile frameworks like React Native and Flutter, and cutting-edge AI technologies to deliver robust and scalable solutions."
        },
        {
            question: "How Long Does a Typical Project Take?",
            answer: "Project timelines vary based on complexity and requirements. Simple websites typically take 2-4 weeks, mobile apps 6-12 weeks, and enterprise software solutions 3-6 months. We provide detailed project timelines during our initial consultation."
        },
        {
            question: "Do You Provide Ongoing Support?",
            answer: "Yes, we provide comprehensive ongoing support and maintenance services. This includes bug fixes, updates, security patches, performance optimization, and feature enhancements to ensure your software continues to perform optimally."
        },
        {
            question: "What is Your Development Process?",
            answer: "Our development process follows industry best practices: Discovery & Planning, Design & Prototyping, Development & Testing, Deployment, and Ongoing Support. We maintain transparent communication throughout the project lifecycle and provide regular updates on progress."
        }
    ];

    return (
        <section className="py-10 lg:py-15">
            <div className="container mx-auto px-4">
                <div className="flex justify-center mb-18">
                    <div className="max-w-4xl text-center">
                        <h1 className="mb-0 text-white text-3xl md:text-4xl font-bold" data-aos="fade-up-sm" data-aos-delay="50">
                            Questions About our Services? <br className="hidden md:block" />
                            We have Answers!
                        </h1>
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="max-w-4xl w-full" data-aos="fade-up-sm" data-aos-delay="100">
                        <div className="flex flex-col gap-6">
                            {faqData.map((faq, index) => (
                                <div key={index} className="border-b border-gray-700 pb-6">
                                    <button
                                        onClick={() => toggleItem(index)}
                                        className="w-full flex items-center justify-center py-4 px-6 bg-transparent border-none cursor-pointer hover:bg-slate-800/30 rounded-lg transition-colors duration-200 group"
                                    >
                                        <div className="flex items-center gap-4 max-w-4xl w-full">
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 flex-shrink-0 ${openItems[index]
                                                ? 'border-yellow-400 bg-yellow-400'
                                                : 'border-gray-500 group-hover:border-yellow-400'
                                                }`}>
                                                <svg
                                                    className={`w-3 h-3 transition-transform duration-200 ${openItems[index] ? 'rotate-180' : ''
                                                        }`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                            <span className="text-white text-lg font-medium group-hover:text-yellow-400 transition-colors duration-200 text-center flex-1">
                                                {faq.question}
                                            </span>
                                        </div>
                                    </button>

                                    <div className={`overflow-hidden transition-all duration-300 ${openItems[index] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                        }`}>
                                        <div className="px-6 pb-4">
                                            <p className="text-gray-300 text-base leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
