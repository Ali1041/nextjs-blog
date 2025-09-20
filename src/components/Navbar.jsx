import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg fixed-top bg-dark" data-bs-theme="dark">
            <div className="container">
                {/* Logo */}
                <a className="navbar-brand" href="/">
                    <img src="/assets/images/logo.png" alt="Ijaad Labs" width="165" />
                </a>

                {/* Navbar toggler button */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                    <div className="navbar-toggler-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>

                {/* Navbar content */}
                <div className="collapse navbar-collapse show" id="navbarContent">
                    <div className="navbar-content-inner ms-lg-auto d-flex flex-column flex-lg-row align-lg-center gap-4 gap-lg-10 p-2 p-lg-0">
                        <ul className="navbar-nav gap-lg-2 gap-xl-5">
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#about">About Us</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white active" href="/contact">Contact</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/blog">Blog</a>
                            </li>
                        </ul>
                        <div className="">
                            <a href="/contact" className="btn btn-outline-primary-dark">Get Started</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
