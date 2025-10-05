"use client";

import { useEffect } from 'react';
import AOS from 'aos';
import Typed from 'typed.js';
import { Swiper } from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const AOSInitializer = () => {
    useEffect(() => {
        // Initialize AOS
        AOS.init({
            disable: false,
            startEvent: "DOMContentLoaded",
            initClassName: "aos-init",
            animatedClassName: "aos-animate",
            useClassNames: false,
            disableMutationObserver: false,
            debounceDelay: 50,
            throttleDelay: 99,
            offset: 120,
            delay: 50,
            duration: 600,
            easing: "cubic-bezier(0.77, 0, 0.175, 1)",
            once: true,
            mirror: false,
            anchorPlacement: "top-bottom",
        });

        // Initialize Typed.js
        const typedElements = document.querySelectorAll(".typed-animation");
        if (typedElements.length > 0) {
            typedElements.forEach((typedElement) => {
                const typedAnimation = new Typed(typedElement, {
                    strings: JSON.parse(typedElement.dataset.strings),
                    typeSpeed: 80,
                    backSpeed: 40,
                    backDelay: 3000,
                    startDelay: 1000,
                    fadeOut: true,
                    loop: true,
                });
            });
        }

        // Initialize Swiper carousels
        const projectsCarousel = new Swiper(".projects-carousel", {
            modules: [Navigation, Pagination, Autoplay],
            loop: false,
            freemode: true,
            slidesPerView: 1,
            spaceBetween: 24,
            speed: 1000,
            autoplay: {
                delay: 3000,
                disableOnInteraction: true,
            },
            pagination: {
                el: ".projects-carousel-container .swiper-pagination",
                type: "bullets",
                clickable: true,
            },
            breakpoints: {
                1: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1200: {
                    slidesPerView: 3,
                },
            },
        });

        // Pricing switch functionality
        const tableWrapper = document.querySelector(".pricing-table");
        if (tableWrapper) {
            const switchInputs = document.querySelectorAll(".switch-wrapper input");
            const prices = tableWrapper.querySelectorAll(".price");
            const toggleClass = "d-none";

            switchInputs.forEach((switchInput) => {
                switchInput.addEventListener("input", function () {
                    prices.forEach((price) => {
                        price.classList.add(toggleClass);
                    });

                    const activePrices = tableWrapper.querySelectorAll(`.price.${switchInput.id}`);
                    activePrices.forEach((activePrice) => {
                        activePrice.classList.remove(toggleClass);
                    });
                });
            });
        }

        // Sticky navbar functionality
        const header = document.querySelector(".navbar");
        const htmlBody = document.querySelector("html");

        if (header) {
            // body padding top of fixed header
            const onSectionTop = header.classList.contains("on-over");
            if (!onSectionTop) {
                const headerHeight = header.offsetHeight;
                htmlBody.style.paddingTop = headerHeight + "px";
                htmlBody.style.scrollPaddingTop = headerHeight + "px";
            }

            // Collapse navbar menu on scroll down
            if (window.matchMedia("(max-width: 991px)").matches) {
                const navbarCollapse = header.querySelector(".navbar-collapse");
                const navbarToggler = header.querySelector(".navbar-toggler");

                window.addEventListener("scroll", () => {
                    const scrollPosition = window.scrollY;
                    const isExpanded = navbarToggler.getAttribute("aria-expanded") === "true";

                    if (isExpanded && scrollPosition > 0) {
                        navbarCollapse.classList.remove("show");
                        navbarToggler.setAttribute("aria-expanded", "false");
                    }
                });
            }
        }
    }, []);

    return null; // This component doesn't render anything
};

export default AOSInitializer;
