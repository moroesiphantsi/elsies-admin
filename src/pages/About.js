import React from "react";
import "./About.css";

import {


FaAward,
FaUsers,
FaLightbulb,
FaCheckCircle

} from "react-icons/fa";


function About(){


return(


<div className="about-page">





{/* HERO */}



<section className="about-hero">


<div>


<h1>

About Elsies

<span>
Print & Embroidery
</span>

</h1>


<p>

Creating professional designs, premium branding
and quality printing solutions that help businesses
stand out.

</p>


</div>


</section>









{/* STORY */}



<section className="about-story">


<div className="story-text">


<h2>

Our Story

</h2>



<p>


Elsies Print & Embroidery is a creative branding
company dedicated to delivering high-quality
printing, embroidery and personalised designs.


</p>


<p>


We help individuals, companies and organisations
transform ideas into professional products that
represent their identity.


</p>




<div className="features">


<div>

<FaCheckCircle/>

Quality First

</div>



<div>

<FaCheckCircle/>

Creative Designs

</div>



<div>

<FaCheckCircle/>

Professional Service

</div>


</div>


</div>



</section>









{/* VALUES */}



<section className="values">


<h2>

What Makes Us Different

</h2>




<div className="value-grid">





<div className="value-card">


<FaAward/>


<h3>

Quality

</h3>


<p>

We focus on excellent finishing and premium results.

</p>


</div>







<div className="value-card">


<FaUsers/>


<h3>

Customer Focus

</h3>


<p>

Every project is handled with care and professionalism.

</p>


</div>







<div className="value-card">


<FaLightbulb/>


<h3>

Innovation

</h3>


<p>

Modern designs and creative branding solutions.

</p>


</div>





</div>



</section>



{/* MISSION */}



<section className="mission">



<div>


<h2>

Our Mission

</h2>


<p>

To provide reliable, creative and affordable
printing and embroidery services that help
brands communicate their identity.

</p>


</div>





<div>


<h2>

Our Vision

</h2>


<p>

To become a trusted leader in professional
branding solutions through quality and innovation.

</p>


</div>



</section>








{/* STATS */}



<section className="about-stats">



<div>

<h2>
500+
</h2>

<p>
Happy Customers
</p>

</div>




<div>

<h2>
1000+
</h2>

<p>
Completed Designs
</p>

</div>





<div>

<h2>
100%
</h2>

<p>
Commitment
</p>

</div>




</section>






</div>


)


}

export default About;