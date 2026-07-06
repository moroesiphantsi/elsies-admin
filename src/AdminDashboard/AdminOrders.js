import React, {useEffect, useState} from "react";
import "./AdminOrders.css";

import {
FaSearch,
FaTrash,
FaEye,
FaWhatsapp,
FaPhone,
FaEnvelope,
FaClipboardList,
FaClock,
FaCheckCircle,
FaSpinner
} from "react-icons/fa";


import {
ref,
onValue,
remove,
update
} from "firebase/database";


import {database} from "../firebaseConfig";




function AdminOrders(){



const [orders,setOrders] = useState([]);

const [search,setSearch] = useState("");

const [filter,setFilter] = useState("All");

const [selectedOrder,setSelectedOrder] = useState(null);






useEffect(()=>{


const ordersRef = ref(database,"orders");



onValue(ordersRef,(snapshot)=>{


const data = snapshot.val();



if(data){



setOrders(


Object.entries(data).map(

([id,value])=>({

id,
...value

})


)


);



}else{


setOrders([]);


}



});



},[]);








// DELETE ORDER


const deleteOrder=(id)=>{


if(window.confirm("Delete this order?")){


remove(
ref(database,`orders/${id}`)
);


}



};









// UPDATE STATUS


const updateStatus=(id,status)=>{


let message="";


if(status==="Pending"){

message=
"Your order has been received successfully. Our team will review your request and update you soon.";

}



if(status==="Processing"){

message=
"Great news! Your order is now being prepared. Our production team is working on your printing/embroidery project.";

}



if(status==="Completed"){

message=
"Your order is ready! 🎉 You can now collect your order. If you selected delivery, your order will be dispatched shortly. Thank you for choosing Elsies Print & Embroidery.";

}




if(status==="Ready for Collection"){

message=
"Your order is ready for collection. Please visit Elsies Print & Embroidery to collect your completed order. For assistance call or WhatsApp +27827187044.";

}





if(status==="Out for Delivery"){

message=
"Your order is on the way 🚚. Our delivery team is bringing your order to you. Please keep your phone available for delivery updates.";

}






update(

ref(database,`orders/${id}`),

{

status,

customerMessage:message,

statusUpdatedAt:
new Date().toLocaleString(),

supportContact:"+27827187044"

}


);



};









const filteredOrders = orders.filter(order=>{


const matchSearch =

order.name?.toLowerCase()
.includes(search.toLowerCase())

||

order.phone?.includes(search);



const matchStatus =

filter==="All"

||

order.status===filter;



return matchSearch && matchStatus;



});








const totalOrders = orders.length;


const pending = orders.filter(
o=>o.status==="Pending"
).length;



const completed = orders.filter(
o=>o.status==="Completed"
).length;



const processing = orders.filter(
o=>o.status==="Processing"
).length;








return(



<div className="admin-orders">







<section className="orders-header">


<h1>

Order Management

</h1>


<p>

Manage customer orders, update progress and communicate instantly.

</p>



</section>









<section className="order-stats">





<div className="order-stat">


<FaClipboardList/>

<h2>

{totalOrders}

</h2>


<p>
Total Orders
</p>


</div>





<div className="order-stat">


<FaClock/>


<h2>

{pending}

</h2>


<p>
Pending
</p>


</div>





<div className="order-stat">


<FaSpinner/>


<h2>

{processing}

</h2>


<p>
Processing
</p>


</div>






<div className="order-stat">


<FaCheckCircle/>


<h2>

{completed}

</h2>


<p>
Completed
</p>


</div>




</section>









<div className="order-tools">



<div className="search-box">


<FaSearch/>


<input

placeholder="Search customer..."

value={search}

onChange={(e)=>setSearch(e.target.value)}


/>


</div>






<select

value={filter}

onChange={(e)=>setFilter(e.target.value)}

>


<option>
All
</option>


<option>
Pending
</option>


<option>
Processing
</option>


<option>
Ready for Collection
</option>


<option>
Out for Delivery
</option>


<option>
Completed
</option>

</select>



</div>









<section className="orders-table-card">





<table>



<thead>


<tr>


<th>
Customer
</th>


<th>
Phone
</th>


<th>
Services
</th>

<th>
Quantity
</th>


<th>
Notes
</th>


<th>
Status
</th>


<th>
Date
</th>


<th>
Actions
</th>


</tr>


</thead>






<tbody>



{


filteredOrders.map(order=>(



<tr key={order.id}>


<td>

{order.fullname}

</td>



<td>

{order.phone}

</td>




<td>

<div className="order-services">

{

Array.isArray(order.services)

?

order.services.map((service,index)=>(

<span key={index}>

{service}

</span>

))

:

<span>
{order.service || "-"}
</span>

}

</div>

</td>


<td>

{order.quantity}

</td>




<td>

{order.notes || "-"}

</td>




<td>



<select

className={`status ${order.status}`}


value={order.status}


onChange={(e)=>

updateStatus(
order.id,
e.target.value
)

}


>


<option>
Pending
</option>


<option>
Processing
</option>


<option>
Ready for Collection
</option>


<option>
Out for Delivery
</option>


<option>
Completed
</option>



</select>



</td>




<td>


{order.date}

<br/>

{order.time}


</td>







<td>


<button

className="view"

onClick={()=>setSelectedOrder(order)}

>

<FaEye/>

</button>






<button

className="delete"

onClick={()=>deleteOrder(order.id)}

>

<FaTrash/>

</button>



</td>





</tr>



))



}





</tbody>





</table>





</section>









{/* MODAL */}



{


selectedOrder &&




<div className="order-modal">



<div className="modal-box">



<h2>

Order Details

</h2>



<p>
Name:
<b>{selectedOrder.fullname}</b>
</p>


<p>
Phone:
<b>{selectedOrder.phone}</b>
</p>


<p>
Email:
<b>{selectedOrder.email}</b>
</p>

<p>
Services:
</p>


<div className="modal-services">


{

Array.isArray(selectedOrder.services)

?


selectedOrder.services.map((service,index)=>(


<span key={index}>

{service}

</span>


))


:

<p>
{selectedOrder.service}
</p>


}


</div>

<p>
Notes:
<b>{selectedOrder.notes}</b>
</p>

<p>
Address:
<b>{selectedOrder.address}</b>
</p>

<p>
City:
<b>{selectedOrder.city}</b>
</p>

<p>
Payment:
<b>{selectedOrder.paymentMethod}</b>
</p>

<p>
Delivery Date:
<b>{selectedOrder.date}</b>
</p>



<div className="contact-buttons">



<a

href={`https://wa.me/${selectedOrder.phone}`}

>

<FaWhatsapp/>

WhatsApp


</a>



<a

href={`tel:${selectedOrder.phone}`}

>

<FaPhone/>

Call


</a>





<a

href={`mailto:${selectedOrder.email}`}

>

<FaEnvelope/>

Email


</a>




</div>






<button

className="close"

onClick={()=>setSelectedOrder(null)}

>

Close

</button>



</div>



</div>



}






</div>



);


}



export default AdminOrders;