import React,{useEffect,useState} from "react";
import "./Services.css";

import {
FaSearch,
FaShoppingCart,
FaWhatsapp,
FaArrowRight,
FaFilter
} from "react-icons/fa";


import {database} from "../firebaseConfig";

import {
ref,
onValue
} from "firebase/database";


import {Link} from "react-router-dom";



function Services(){



const [services,setServices]=useState([]);

const [search,setSearch]=useState("");

const [category,setCategory]=useState("All");


const [cart,setCart]=useState([]);






useEffect(()=>{


const serviceRef=ref(database,"services");



onValue(serviceRef,(snapshot)=>{


const data=snapshot.val();



if(data){


setServices(

Object.entries(data).map(([id,value])=>({

id,
...value

}))


);



}else{


setServices([]);


}



});


},[]);









const addToCart=(service)=>{


const updatedCart=[

...cart,

service

];


setCart(updatedCart);


// save for PlaceOrders

localStorage.setItem(
"elsiesCart",
JSON.stringify(updatedCart)
);



alert(
`${service.name} added to cart`
);


};








const filteredServices=services.filter(service=>{


const searchMatch=

service.name
.toLowerCase()
.includes(search.toLowerCase());



const categoryMatch=

category==="All"

||

service.category===category;



return searchMatch && categoryMatch;



});











return(



<div className="services-page">





<section className="services-hero">


<h1>

Our Premium Services

</h1>


<p>

Professional printing, embroidery and business solutions.

</p>



</section>









<section className="service-controls">



<div className="search-box">


<FaSearch/>


<input

placeholder="Search services..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>


</div>






<div className="filter-box">


<FaFilter/>


<select

onChange={(e)=>setCategory(e.target.value)}

>


<option>
All
</option>


<option>
Printing Services
</option>


<option>
Embroidery Services
</option>


<option>
IT and Business Supply
</option>



</select>



</div>







<div className="cart-box">


<FaShoppingCart/>


<span>

{cart.length}

</span>


</div>




</section>









<section className="services-grid">





{

filteredServices.length===0 &&

<h2>
No services available
</h2>


}






{

filteredServices.map(service=>(




<div

className="service-card"

key={service.id}

>





<img

src={service.image}

alt={service.name}

/>






<div className="service-content">



<span>

{service.category}

</span>




<h2>

{service.name}

</h2>





<p>

{service.description}

</p>





<h3>

R {service.price}

</h3>







<button

onClick={()=>addToCart(service)}

>


<FaShoppingCart/>

Add To Cart


</button>




</div>





</div>





))


}





</section>













<section className="service-cart">



<h2>

Your Cart

</h2>




{

cart.length===0 ?

<p>
Your cart is empty
</p>


:


cart.map((item,index)=>(


<div

className="cart-item"

key={index}

>


<img

src={item.image}

alt={item.name}

/>


<div>

<h3>
{item.name}
</h3>

<p>

R {item.price}

</p>

</div>


</div>


))



}







{

cart.length>0 &&


<Link

to="/login"

className="order-btn"

onClick={()=>{

localStorage.setItem(
"elsiesCart",
JSON.stringify(cart)
);


}}

>

Proceed To Order

<FaArrowRight/>

</Link>



}



</section>









<section className="service-contact">



<h2>

Need a custom quotation?

</h2>



<a

href="https://wa.me/27827187044"

target="_blank"

rel="noreferrer"

>

<FaWhatsapp/>

Chat On WhatsApp

</a>



</section>






</div>


);



}


export default Services;

