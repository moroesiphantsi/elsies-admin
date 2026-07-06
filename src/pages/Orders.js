import React, {useEffect,useState} from "react";
import "./Orders.css";

import {
FaPaperPlane,
FaCheckCircle
} from "react-icons/fa";


import {database,auth} from "../firebaseConfig";

import {
ref,
onValue,
push
} from "firebase/database";

import {
onAuthStateChanged
} from "firebase/auth";




function Orders(){



const [services,setServices]=useState([]);


// NOW ARRAY
const [selected,setSelected]=useState([]);



const [order,setOrder]=useState({

fullname:"",
phone:"",
email:"",
quantity:"",
address:"",
city:"",
province:"",
deliveryDate:"",
paymentMethod:"",
notes:""

});


const [currentUser,setCurrentUser]=useState(null);

useEffect(()=>{


const unsubscribe =
onAuthStateChanged(auth,(user)=>{


if(user){

setCurrentUser(user);

}


});


return ()=>unsubscribe();


},[]);


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








// SELECT MULTIPLE SERVICES

const selectService=(service)=>{


const exists = selected.find(
(item)=>item.id===service.id
);



if(exists){


// remove

setSelected(

selected.filter(
(item)=>item.id!==service.id
)

);



}else{


// add

setSelected([

...selected,

service

]);


}



};









const handleChange=(e)=>{


setOrder({

...order,

[e.target.name]:e.target.value

});


};








const totalPrice = selected.reduce(

(total,item)=>{

const price = Number(item.price);

return total + (isNaN(price) ? 0 : price);

},

0

);










const submitOrder = async(e)=>{


e.preventDefault();



if(!currentUser){

alert("Please login before placing an order");

return;

}



if(selected.length===0){

alert(
"Please select at least one service"
);

return;

}





const trackingNumber =
"ELS-" +
Math.floor(Math.random()*999999);





await push(

ref(database,"orders"),


{


...order,


userId:currentUser.uid,


userEmail:currentUser.email,



services:selected.map(
service=>service.name
),



totalAmount:totalPrice,


trackingNumber,


status:"Pending",


date:new Date().toLocaleDateString(),


time:new Date().toLocaleTimeString()



}

);




alert(

"Order Submitted Successfully\nTracking: "+trackingNumber

);




setSelected([]);




setOrder({

fullname:"",
phone:"",
email:"",
quantity:"",
address:"",
city:"",
province:"",
deliveryDate:"",
paymentMethod:"",
notes:""

});



};









return(



<div className="orders-page">






<section className="orders-hero">


<h1>

Online Ordering

</h1>


<p>

Select multiple services and place your order

</p>


</section>









<div className="orders-container">







<div className="services-card">



<h2>

Choose Services

</h2>





<div className="service-grid">





{

services.map(service=>(





<div


key={service.id}


className={


selected.some(
(item)=>item.id===service.id
)

?

"service active"

:

"service"



}



onClick={()=>selectService(service)}



>





<img

src={service.image}

alt={service.name}

/>





<h3>

{service.name}

</h3>





<p>

{service.description}

</p>





<strong>

R {service.price}

</strong>






{


selected.some(
(item)=>item.id===service.id
)

&&


<div className="selected-icon">


<FaCheckCircle/> Selected


</div>



}




</div>




))


}







</div>













<div className="cart-summary">


<h3>

Selected Services

</h3>



{


selected.map(item=>(


<p key={item.id}>


{item.name}


-
R {item.price}


</p>


))


}





<h2>


Total: R {totalPrice}


</h2>



</div>







</div>















<form

className="order-form"

onSubmit={submitOrder}

>


<h2>

Complete Your Order

</h2>





<input

name="fullname"

placeholder="Full Name"

value={order.fullname}

onChange={handleChange}

required

/>





<input

name="phone"

placeholder="Phone Number"

value={order.phone}

onChange={handleChange}

required

/>







<input

name="email"

placeholder="Email Address"

value={order.email}

onChange={handleChange}

/>







<input

name="quantity"

placeholder="Quantity"

value={order.quantity}

onChange={handleChange}

/>









<input

name="address"

placeholder="Delivery Address"

value={order.address}

onChange={handleChange}

required

/>








<input

name="city"

placeholder="City"

value={order.city}

onChange={handleChange}

/>







<input

name="province"

placeholder="Province"

value={order.province}

onChange={handleChange}

/>









<input

type="date"

name="deliveryDate"

value={order.deliveryDate}

onChange={handleChange}

required

/>









<select

name="paymentMethod"

value={order.paymentMethod}

onChange={handleChange}

required

>



<option value="">

Choose Payment

</option>


<option>
Cash
</option>


<option>
EFT
</option>


<option>
Card
</option>


<option>
PayFast
</option>



</select>







<textarea

name="notes"

placeholder="Design requirements..."

value={order.notes}

onChange={handleChange}

/>








<button>


<FaPaperPlane/>

Place Order


</button>






</form>










</div>






</div>


);


}


export default Orders;