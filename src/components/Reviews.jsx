'use client';

import React, { useEffect, useRef } from 'react';

const Reviews = () => {
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;

        if (!scrollContainer) return;

        let scrollAmount = 0;
        const scrollSpeed = 1; // Adjust speed as needed

        const scrollStep = () => {
            scrollAmount += scrollSpeed;
            scrollContainer.scrollLeft = scrollAmount;

            // Reset when reaching the end
            if (scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
                scrollAmount = 0;
            }

            requestAnimationFrame(scrollStep);
        };

        scrollStep();

        // Cleanup function
        return () => {
            // Cleanup if needed
        };
    }, []);

    const reviews = [
        {
            id: 1,
            name: "Kashif M.",
            role: "TKC Kitchen, Manager",
            image: "/assets/images/review/1.png",
            rating: 5,
            text: "Having worked with over 5 different freelance developers at Ziegal, I can honestly say that devs at Ijaad Labs are one of the best developers we've worked with. They are expert Python developers and very good at understanding the needs of the client."
        },
        {
            id: 2,
            name: "Karlyle Smith",
            role: "Party on the Weekend, Founder",
            image: "/assets/images/review/2.png",
            rating: 5,
            text: "It has been a pleasure working with Ijaad Labs. They understood the requirements exceptionally well and delivered the app ahead of schedule. Their professionalism in every interaction was commendable, and they even provided free scraped data to help me get started. Highly recommend!"
        },
        {
            id: 3,
            name: "Jackson",
            role: "Varisource, Founder",
            image: "/assets/images/review/1.png",
            rating: 5,
            text: "Ijaad Labs have been a pleasure to work with as they are dedicated to their work and craft, great with communication and punctual in the delivery of their assignments. True team players!"
        },
        {
            id: 4,
            name: "Brian Jobling",
            role: "RightAircraft, Product Manager",
            image: "/assets/images/review/2.png",
            rating: 5,
            text: "Ijaad Labs have excellent developers, who have the right level of communication. Pressed me when they needed answers and were always ready to assist. Great communication and delivered on the tasks requested. The 5* developers."
        },
        {
            id: 5,
            name: "Ryan",
            role: "Jarospace, Founder/CTO",
            image: "/assets/images/review/3.png",
            rating: 5,
            text: "Devs at Ijaad Labs were very responsive and engaging. They completed every task required and added their own ideas to improve the efficiency and functionality of the code. They will be a standout addition to any team, we highly recommend them."
        },
        {
            id: 6,
            name: "HRK Media",
            role: "Founder",
            image: "/assets/images/review/4.png",
            rating: 5,
            text: "Great guys to work with, and keep everything professional and organized."
        }
    ];

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 15 14"
                className="w-4 h-4 text-yellow-400"
            >
                <path d="m4.824 4.225-4.253.617-.075.015A.667.667 0 0 0 .202 5.98l3.082 3-.727 4.236-.009.073a.667.667 0 0 0 .976.63l3.804-2 3.796 2 .066.03a.666.666 0 0 0 .902-.733l-.728-4.237 3.083-3 .052-.056a.667.667 0 0 0-.422-1.08l-4.253-.618L7.922.372a.667.667 0 0 0-1.196 0L4.824 4.225Z" />
            </svg>
        ));
    };

    const ReviewCard = ({ review }) => (
        <div className="review-card rounded-lg p-6 border bg-slate-800 border-white border-opacity-10 w-[300px] mr-6 flex-shrink-0">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                        src={review.image}
                        alt={review.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <h6 className="text-white mb-1 font-semibold">{review.name}</h6>
                    <p className="mb-0 text-sm text-gray-300">{review.role}</p>
                </div>
            </div>
            <div>
                <div className="stars flex items-center gap-1 mb-3">
                    {renderStars(review.rating)}
                </div>
                <p className="review-text mb-0 text-gray-200 text-sm leading-relaxed">
                    {review.text}
                </p>
            </div>
        </div>
    );

    return (
        <section className="overflow-hidden py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-white text-3xl md:text-4xl font-bold" data-aos="fade-up-sm" data-aos-delay="50">
                        <span className="text-yellow-400">Ijaad Labs</span> Received ⭐ 4.9/5 Stars in Over hundreds of Reviews.
                    </h1>
                </div>
            </div>

            {/* Single scrolling row */}
            <div>
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-hidden"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <div className="flex animate-scroll">
                        {reviews.map((review) => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                        {reviews.map((review) => (
                            <ReviewCard key={`${review.id}-duplicate`} review={review} />
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(calc(-100% / 3));
                    }
                }

                .animate-scroll {
                    animation: scroll 40s linear infinite;
                }

                .animate-scroll:hover {
                    animation-play-state: paused;
                }

                /* Hide scrollbar for webkit browsers */
                div::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
};

export default Reviews;
