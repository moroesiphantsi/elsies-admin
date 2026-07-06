import React, {useState} from "react";
import "./Portfolio.css";


import service1 from "../images/service1.jpg";
import service2 from "../images/service2.jpg";
import service3 from "../images/service3.jpg";
import service4 from "../images/service4.jpg";
import service5 from "../images/service5.jpg";

import service6 from "../images/service6.jpeg";
import service7 from "../images/service7.jpeg";
import service8 from "../images/service8.jpeg";
import service9 from "../images/service9.jpeg";
import service10 from "../images/service10.jpeg";

import service11 from "../images/service11.jpg";
import service12 from "../images/service12.jpg";



function Portfolio(){


const [selected,setSelected] = useState(null);



const projects=[


{
img:service1,
title:"Custom Embroidery",
category:"Embroidery"
},


{
img:service2,
title:"Corporate Branding",
category:"Branding"
},



{
img:service3,
title:"Premium Clothing Design",
category:"Fashion"
},



{
img:service4,
title:"Business Uniforms",
category:"Corporate"
},



{
img:service5,
title:"Creative Printing",
category:"Printing"
},



{
img:service6,
title:"Personalised Designs",
category:"Custom"
},



{
img:service7,
title:"Modern Logo Branding",
category:"Design"
},



{
img:service8,
title:"Quality Merchandise",
category:"Products"
},



{
img:service9,
title:"Event Branding",
category:"Events"
},



{
img:service10,
title:"Professional Prints",
category:"Printing"
},



{
img:service11,
title:"Premium Embroidery",
category:"Embroidery"
},



{
img:service12,
title:"Complete Branding",
category:"Business"
}


];




return(


<div className="portfolio-page">





<section className="portfolio-hero">


<h1>

Our Creative Portfolio

</h1>


<p>

Explore our premium printing and embroidery projects.

</p>


</section>







<section className="portfolio-grid">



{

projects.map((item,index)=>(


<div 
className="portfolio-card"
key={index}
onClick={()=>setSelected(item.img)}
>



<img

src={item.img}

alt={item.title}

/>



<div className="portfolio-overlay">


<h3>

{item.title}

</h3>


<span>

{item.category}

</span>


</div>



</div>



))

}


</section>







{

selected &&

<div 
className="lightbox"
onClick={()=>setSelected(null)}
>


<img

src={selected}

alt="preview"

/>


</div>


}





</div>


)


}


export default Portfolio;