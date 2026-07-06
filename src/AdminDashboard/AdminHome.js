import React, { useEffect, useState } from "react";
import "./AdminHome.css";

import {
  FaClipboardList,
  FaBoxOpen,
  FaMoneyBillWave,
  FaUsers,
  FaPrint,
  FaWhatsapp,
  FaPlus,
  FaChartLine,
  FaCog,
  FaCalculator,
  FaCheckCircle,
  FaFileInvoiceDollar
} from "react-icons/fa";


import { database } from "../firebaseConfig";
import { ref, onValue } from "firebase/database";


import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";


import heroBg from "../images/header-bg.jpg";




function AdminHome() {


const [orders,setOrders] = useState([]);

const [services,setServices] = useState([]);

const [revenues,setRevenues] = useState([]);

const [selectedImage,setSelectedImage] = useState(null);


useEffect(()=>{


const ordersRef = ref(database,"orders");

const servicesRef = ref(database,"services");

const revenueRef = ref(database,"revenues");

const printRef = ref(database,"printOrders");


onValue(printRef,(snapshot)=>{


const data=snapshot.val();



if(data){


setPrintOrders(

Object.entries(data).map(([id,value])=>({

id,
...value

}))


);


}else{


setPrintOrders([]);

}



});


/* ORDERS */

onValue(ordersRef,(snapshot)=>{


const data = snapshot.val();


if(data){


const orderList = Object.entries(data).map(

([id,value])=>({

id,
...value

})

);


setOrders(orderList);



}else{


setOrders([]);


}


});





/* SERVICES */


onValue(servicesRef,(snapshot)=>{


const data = snapshot.val();



if(data){


const serviceList = Object.entries(data).map(

([id,value])=>({

id,
...value

})

);



setServices(serviceList);



}else{


setServices([]);


}



});







/* REVENUE */


onValue(revenueRef,(snapshot)=>{


const data = snapshot.val();



if(data){


const revenueList = Object.entries(data).map(

([id,value])=>({

id,
...value

})

);



setRevenues(revenueList);



}else{


setRevenues([]);


}



});



},[]);



const totalOrders = orders.length;


const totalServices = services.length;




const today = new Date().toLocaleDateString();



const todayOrders = orders.filter(order=>{


if(!order.date)
return false;


return order.date.includes(today);


}).length;





const pendingOrders = orders.filter(

order=>order.status==="Pending"

).length;




const completedOrders = orders.filter(

order=>order.status==="Completed"

).length;




const totalCustomers = new Set(

orders.map(order=>order.email)

).size;




const monthlyRevenue = revenues.reduce(

(total,revenue)=>

total + Number(revenue.amount || 0),

0

);







const chartData=[

{
month:new Date().toLocaleString(
"default",
{
month:"short"
}
),

revenue:monthlyRevenue

}

];



const [printOrders,setPrintOrders]=useState([]);


const [calculator,setCalculator]=useState({

quantity:1,
price:5,
color:"Colour"

});



const calculateTotal = ()=>{


let total =

Number(calculator.quantity) *

Number(calculator.price);



if(calculator.color==="Colour"){

total += 20;

}


return total;


};





const changeCalculator=(e)=>{


setCalculator({

...calculator,

[e.target.name]:e.target.value

});


};




return (


<div className="admin-home">





<section

className="admin-hero"

style={{

backgroundImage:`url(${heroBg})`

}}

>


<div className="admin-overlay">


<div className="admin-hero-content">


<h1>

Elsies Admin

<span>

Dashboard

</span>


</h1>



<p>

Manage services, monitor orders,
track business growth.

</p>



</div>


</div>


</section>









<section className="dashboard-stats">



<div className="stat-card">

<FaClipboardList/>

<h2>{totalOrders}</h2>

<p>Total Orders</p>


</div>






<div className="stat-card">

<FaBoxOpen/>

<h2>{totalServices}</h2>

<p>Total Services</p>


</div>






<div className="stat-card">

<FaMoneyBillWave/>

<h2>
R {monthlyRevenue}
</h2>


<p>Monthly Revenue</p>


</div>






<div className="stat-card">

<FaUsers/>

<h2>{totalCustomers}</h2>

<p>Customers</p>


</div>




</section>









<section className="today-summary">


<div className="summary-card">

<h3>{todayOrders}</h3>

<p>
Today's Orders
</p>


</div>



<div className="summary-card">

<h3>{pendingOrders}</h3>

<p>
Pending Orders
</p>


</div>




<div className="summary-card">

<h3>{completedOrders}</h3>

<p>
Completed Orders
</p>


</div>



</section>









<section className="quick-actions">


<h2>
Quick Actions
</h2>



<div className="action-grid">


<a 
href="/admin-services"
className="action-card"
>

<FaPlus/>

<h3>
Add Service
</h3>


</a>




<a
href="/admin-orders"
className="action-card"
>


<FaClipboardList/>

<h3>
Manage Orders
</h3>


</a>





<a
href="/admin-revenue"
className="action-card"
>

<FaCog/>

<h3>
Edit Revenue
</h3>


</a>





<a
href="/admin-analytics"
className="action-card"
>

<FaChartLine/>

<h3>
Analytics
</h3>


</a>



</div>


</section>







<section className="services-overview">

  <div className="section-header">

    <div>

      <h2>Services Available</h2> 

      <p>
        Professional services currently offered by Elsies
      </p>

    </div>

    <span className="service-count">
      {services.length} Services
    </span>
 
  </div>

  <div className="service-admin-grid">

    {
      services.map(service => (

        <div
          className="admin-service-card"
          key={service.id}
        >

          <div 
className="service-image-container"
onClick={() =>
setSelectedImage(service.image)
}
>


<img
src={service.image}
alt={service.name}
/>


<div className="image-overlay">


<span>

View Preview

</span>


</div>


</div>

          <div className="service-content">

            <span className="service-category">
              {service.category}
            </span>

            <h3>
              {service.name}
            </h3>

            <p>
              {service.description}
            </p>

            <h4>
              R {service.price}
            </h4>

          </div>

        </div>

      ))
    }

  </div>

</section>


<section className="print-dashboard">


<h2>
Print Out Management
</h2>


<div className="print-grid">



<div className="print-card">


<FaPrint/>


<h3>
{printOrders.length}
</h3>


<p>
Total Print Requests
</p>


</div>





<div className="print-card">


<FaFileInvoiceDollar/>


<h3>

{

printOrders.filter(
p=>p.status==="Pending"
).length

}

</h3>


<p>
Pending Prints
</p>


</div>





<div className="print-card">


<FaCheckCircle/>


<h3>

{

printOrders.filter(
p=>p.status==="Completed"
).length

}

</h3>


<p>
Completed Prints
</p>


</div>



</div>





<a

href="/admin-print-orders"

className="manage-print"

>

<FaPrint/>

Manage Print Orders


</a>



</section>









<section className="calculator-section">


<h2>

Printing Calculator

</h2>




<div className="calculator-box">



<input

type="number"

name="quantity"

value={calculator.quantity}

onChange={changeCalculator}

placeholder="Quantity"

/>






<select

name="price"

value={calculator.price}

onChange={changeCalculator}

>


<option value="5">

A4 Black & White - R5

</option>


<option value="10">

A4 Colour - R10

</option>


<option value="20">

A3 Colour - R20

</option>



</select>







<select

name="color"

value={calculator.color}

onChange={changeCalculator}

>


<option>
Colour
</option>


<option>
Black & White
</option>


</select>






<div className="calculation-result">


<FaCalculator/>


<h2>

Total: R {calculateTotal()}

</h2>


</div>



</div>




</section>




<section className="chart-section">


<h2>
Revenue Overview
</h2>



<ResponsiveContainer

width="100%"

height={400}

>


<LineChart data={chartData}>


<CartesianGrid strokeDasharray="3 3"/>


<XAxis dataKey="month"/>


<YAxis/>


<Tooltip/>


<Line

type="monotone"

dataKey="revenue"

/>



</LineChart>


</ResponsiveContainer>



</section>








<section className="recent-orders">


<h2>
Recent Orders
</h2>



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
Time
</th>


</tr>


</thead>





<tbody>


{


orders

.slice()

.reverse()

.slice(0,10)

.map(order=>(



<tr key={order.id}>


<td>

{order.fullname}

</td>




<td>

{order.phone}

</td>





<td>

{order.quantity}

</td>





<td>

{order.notes || "No notes"}

</td>





<td>


<span

className={`status ${order.status}`}

>

{order.status}

</span>



</td>





<td>

{order.date}

</td>





<td>

{order.time || "-"}

</td>





</tr>



))



}





</tbody>




</table>



</section>




{
selectedImage && (

<div
className="image-modal"
onClick={()=>setSelectedImage(null)}
>


<div
className="image-viewer"
onClick={(e)=>e.stopPropagation()}
>


<button
className="close-image"
onClick={()=>setSelectedImage(null)}
>

×

</button>



<img
src={selectedImage}
alt="Preview"
/>



<div className="image-actions">


<button>
Download Image
</button>


</div>



</div>


</div>

)

}




<section className="admin-cta">


<h2>

Need Support?

</h2>



<a

href="https://wa.me/27827187044"

target="_blank"

rel="noreferrer"

>

<FaWhatsapp/>

Contact Support


</a>



</section>






</div>


);

}



export default AdminHome;