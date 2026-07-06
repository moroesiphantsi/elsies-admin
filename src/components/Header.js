import React, { useState } from "react";
import "./Header.css";

import {
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaBars,
  FaTimes
} from "react-icons/fa";

import { Link } from "react-router-dom";
import logo from "../images/logo.png"; 
import { FaArrowLeft } from "react-icons/fa";


function Header() {

  const [menuOpen, setMenuOpen] = useState(false);


  return (

    <header className="header">


      {/* TOP CONTACT BAR */}

      <div className="top-bar">

        <div className="contact-item">
          <FaWhatsapp />
          <a href="https://wa.me/27827187044">
            +27 82 718 7044
          </a>
        </div>


        <div className="contact-item">
          <FaPhone />
          <a href="tel:+27827187044">
            +27 82 718 7044
          </a>
        </div>


        <div className="contact-item">
          <FaEnvelope />
          <a href="mailto:elsiesinternet@gmail.com">
            elsiesinternet@gmail.com
          </a>
        </div>


        <div className="contact-item">


</div>

  

</div>




      {/* MAIN HEADER */}


      <div className="main-header">


        {/* LOGO */}

<div className="logo">


  <img 
    src={logo}
    alt="Elsies Print & Embroidery Logo"
    className="logo-image"
  />


  <div>

    <h1>
      Elsies
      <span>
        Print & Embroidery
      </span>
    </h1>


    <p>
      Quality Designs • Professional Branding
    </p>


  </div>


</div>






        {/* MENU BUTTON MOBILE */}


        <div
          className="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >

          {
            menuOpen 
            ?
            <FaTimes />
            :
            <FaBars />
          }

        </div>





        {/* NAVIGATION */}


        <nav className={menuOpen ? "nav active" : "nav"}>


          <Link to="/">
            Home
          </Link>






          <Link to="/about">
            About
          </Link>


          <Link to="/contact">
            Contact
          </Link>


         <button
type="button"
className="back-btn"
onClick={() => window.history.back()}
>

<FaArrowLeft />

<span>Back</span>

</button>

        </nav>


      </div>


    </header>

  );

}


export default Header;