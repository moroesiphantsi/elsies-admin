import React from "react";
import "./Footer.css";
import logo from "../images/logo.png"; 

import {
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram
} from "react-icons/fa";


function Footer(){


return(

<footer className="footer">


{/* FOOTER MAIN */}


<div className="footer-container">



{/* BRAND */}


<div className="footer-column brand">


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
          Professional printing and embroidery services.
We create quality designs that make your brand stand out.
        </p>
    
    

<div className="social-icons">


<a href="Elsies Print And Embroid">
<FaFacebook/>
</a>


<a href="Elsies Print And Embroid">
<FaInstagram/>
</a>


<a href="https://wa.me/27827187044">
<FaWhatsapp/>
</a>


</div>


</div>



</div>
    
    
    </div>

{/* LOCATION MAP */}

<div className="footer-column map-column">

<h3>
Find Us
</h3>

<p className="map-text">
3 Rembrandt Crescent,
Asbury,
Bloemfontein 9323
Near Twin City Mall
</p>

<div className="footer-map">

<iframe
title="Elsies Print & Embroidery Location"
src="https://maps.google.com/maps?q=3%20Rembrandt%20Crescent%20Asbury%20Bloemfontein%209323&t=&z=15&ie=UTF8&iwloc=&output=embed"
loading="lazy"
allowFullScreen
/>

</div>

<a
className="directions-btn"
href="https://www.google.com/maps/search/?api=1&query=3+Rembrandt+Crescent+Asbury+Bloemfontein+9323"
target="_blank"
rel="noopener noreferrer"

>

📍 Get Directions

</a>

</div>



{/* SERVICES */}


<div className="footer-column">


<h3>
Our Services
</h3>


<p>
Embroidery Services (High-quality pocket logos and badges.)
</p>


<p>
Printing Services (Posters, banners, and more.)
</p>


<p>
IT & Business Supply (Wholesale fabrics and small biz tech.)
</p>


<p>
Business cards, Graphic design
</p>


<p>
websites, mobile applicatons
</p>


</div>






{/* CONTACT */}



<div className="footer-column">


<h3>
Contact Us
</h3>



<div className="contact">

<FaWhatsapp/>

<a href="https://wa.me/27827187044">

+27 82 718 7044

</a>

</div>




<div className="contact">

<FaPhone/>

<a href="tel:+27827187044">

+27 82 718 7044

</a>

</div>




<div className="contact">

<FaEnvelope/>

<a href="mailto:elsiesinternet@gmail.com">

elsiesinternet@gmail.com

</a>

</div>




<div className="contact">

<FaMapMarkerAlt/>

<span>
3 Rembrandt Crescent,
Asbury,
Bloemfontein 9323
(Near Twin City Mall)
</span>

</div>



</div>





</div>





{/* NEWSLETTER */}


<div className="newsletter">


<h3>
Ready to brand your business?
</h3>


<p>
Contact Elsies Print & Embroidery today for premium quality designs.
</p>


<a 
href="https://wa.me/27827187044"
className="footer-btn"
>

Get Quote on WhatsApp

</a>


</div>





{/* COPYRIGHT */}



<div className="copyright">


© {new Date().getFullYear()} Elsies Print & Embroidery.
All Rights Reserved.


</div>



</footer>


)

}


export default Footer;
