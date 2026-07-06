import React, {useState} from "react";
import "./Contact.css";

import {
FaEnvelope,
FaWhatsapp,
FaPhone,
FaMapMarkerAlt,
FaPaperPlane,
FaArrowRight
} from "react-icons/fa";


function Contact(){


const [form,setForm] = useState({

email:"",
subject:"",
message:""

});



const handleChange = (e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


}




const sendEmail = (e)=>{


e.preventDefault();



const mail = 

`mailto:elsiesinternet@gmail.com
?subject=${form.subject}
&body=

From: ${form.email}

${form.message}
`;



window.location.href = mail;



}




return(


<div className="contact-page">



<section className="contact-hero">


<h1>

Let's Create Something Amazing

</h1>


<p>

Contact Elsies Print & Embroidery for premium printing,
branding and embroidery solutions.

</p>


</section>







<section className="contact-container">





{/* CONTACT CARDS */}



<div className="contact-info">



<div className="contact-card">


<FaWhatsapp/>


<h3>

WhatsApp

</h3>


<p>

Chat with us instantly

</p>


<a 
href="https://wa.me/27827187044"
>

+27 82 718 7044

<FaArrowRight/>

</a>


</div>







<div className="contact-card">


<FaPhone/>


<h3>

Call Us

</h3>


<p>

Speak directly with our team

</p>


<a 
href="tel:+27827187044"
>

+27 82 718 7044

<FaArrowRight/>

</a>


</div>







<div className="contact-card">


<FaEnvelope/>


<h3>

Email

</h3>


<p>

Send us your project details

</p>


<a href="mailto:elsiesinternet@gmail.com">

elsiesinternet@gmail.com

<FaArrowRight/>

</a>


</div>





<div className="contact-card">


<FaMapMarkerAlt/>


<h3>

Location

</h3>


<p>

3 Rembrandt Crescent,
Asbury,
Bloemfontein 9323
(Near Twin City Mall)

</p>


</div>



</div>









{/* EMAIL FORM */}



<div className="email-box">


<h2>

Send Us A Message

</h2>


<p>

Complete the form and send your enquiry directly.

</p>




<form onSubmit={sendEmail}>


<input

type="email"

name="email"

placeholder="Your Email Address"

required

value={form.email}

onChange={handleChange}

/>





<input

type="text"

name="subject"

placeholder="Email Subject"

required

value={form.subject}

onChange={handleChange}

/>






<textarea

name="message"

placeholder="Compose your message..."

rows="6"

required

value={form.message}

onChange={handleChange}

/>






<button type="submit">


<FaPaperPlane/>

Send Email


</button>




</form>



</div>







</section>



</div>


)


}


export default Contact;