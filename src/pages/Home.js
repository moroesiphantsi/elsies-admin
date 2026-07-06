import React,{useEffect,useState} from "react";
import "./Home.css";

import {
FaTshirt,
FaPrint,
FaPalette,
FaWhatsapp,
FaCheckCircle,
FaArrowRight,
FaCalculator,
FaRocket,
FaShieldAlt,
FaClock,
FaUsers,
FaChevronUp
} from "react-icons/fa";


function Home(){


const [showTop,setShowTop]=useState(false);



useEffect(()=>{


window.addEventListener("scroll",()=>{


if(window.scrollY>400)

setShowTop(true);

else

setShowTop(false);


});


},[]);




return(


<div className="home">



{/* HERO */}


<section className="hero">


<div className="hero-content">


<div className="badge">

Elsies Print And Embroidery

</div>


<h1>

Creative Printing

<span>

That Builds Brands

</span>


</h1>



<p>

Professional embroidery, printing,
branding and personalised products
for companies, events and individuals.

</p>




<div className="hero-buttons">


<a
href="https://wa.me/27827187044"
className="primary-btn"
>

<FaWhatsapp/>

Get Quote

</a>

<a
href="/print-out"
className="secondary-btn"
>

<FaCalculator/>

Print Out

</a>


<a
href="/print-calculator"
className="secondary-btn"
>

<FaCalculator/>

Calculate Price

</a>


<a
href="/services"
className="secondary-btn"
>

<FaCalculator/>

Explore Services

</a>


</div>


</div>



<div className="floating-shape one"></div>

<div className="floating-shape two"></div>



</section>








{/* SERVICES */}


<section className="services">


<h2>

Our Premium Services

</h2>


<p className="section-text">

Modern printing solutions designed for the future.

</p>




<div className="service-grid">



<div className="service-card">

<FaTshirt/>

<h3>
Embroidery
</h3>


<p>
Premium clothing branding and uniforms.
</p>


<FaArrowRight className="arrow"/>

</div>





<div className="service-card">


<FaPrint/>


<h3>
Printing
</h3>


<p>
High quality business and personal printing.
</p>


<FaArrowRight className="arrow"/>


</div>






<div className="service-card">


<FaPalette/>


<h3>
Creative Designs
</h3>


<p>
Professional artwork and digital branding.
</p>


<FaArrowRight className="arrow"/>


</div>



</div>



</section>









{/* WHY */}



<section className="why">



<div>


<h2>

Why Elsies?

</h2>



<ul>


<li>
<FaCheckCircle/>
 Premium Quality
</li>



<li>
<FaClock/>
 Fast Delivery
</li>



<li>
<FaShieldAlt/>
 Trusted Service
</li>


<li>
<FaUsers/>
 Happy Customers
</li>


</ul>


</div>





<div className="stats">



<div>

<h1>
500+
</h1>

<p>
Clients
</p>

</div>



<div>

<h1>
1000+
</h1>

<p>
Projects
</p>

</div>




<div>

<h1>
24/7
</h1>

<p>
Support
</p>

</div>



</div>



</section>










{/* HOW IT WORKS */}



<section className="process">


<h2>

How It Works

</h2>



<div className="process-grid">


<div>

<span>
1
</span>

<h3>
Upload Design
</h3>

<p>
Send your picture or document.
</p>

</div>



<div>

<span>
2
</span>

<h3>
Choose Service
</h3>

<p>
Select printing or embroidery.
</p>

</div>



<div>

<span>
3
</span>

<h3>
Get Finished Product
</h3>

<p>
Professional final results.
</p>

</div>



</div>


</section>









{/* TRUST */}



<section className="trust">


<FaRocket/>


<h2>

Your Brand.
Our Creativity.

</h2>


<p>

We combine technology,
design and quality printing
to create products that stand out.

</p>


</section>









{/* CTA */}



<section className="cta">


<h2>

Ready For Something Amazing?

</h2>


<a href="/print-out">

Start Printing

</a>


</section>









{/* FLOATING WHATSAPP */}



<a

href="https://wa.me/27827187044"

className="floating-whatsapp"

>

<FaWhatsapp/>

</a>






{

showTop &&

<button

className="top-btn"

onClick={()=>window.scrollTo(0,0)}

>

<FaChevronUp/>

</button>


}



</div>


)


}


export default Home;