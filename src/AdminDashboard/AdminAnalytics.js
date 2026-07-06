import React,{useEffect,useState} from "react";
import "./AdminAnalytics.css";


import {
FaChartLine,
FaShoppingBag,
FaUsers,
FaMoneyBillWave,
FaDownload,
FaDatabase
} from "react-icons/fa";


import {

ref,
onValue,
push

} from "firebase/database";


import {database} from "../firebaseConfig";



import {

ResponsiveContainer,
BarChart,
Bar,
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
CartesianGrid,
PieChart,
Pie,
Cell

} from "recharts";






function AdminAnalytics(){



const [orders,setOrders]=useState([]);

const [revenues,setRevenues]=useState([]);

const [services,setServices]=useState([]);





useEffect(()=>{


onValue(

ref(database,"orders"),

snapshot=>{


const data=snapshot.val();


setOrders(

data?

Object.entries(data)
.map(([id,value])=>({

id,
...value

}))

:

[]

);



}

);







onValue(

ref(database,"revenues"),

snapshot=>{


const data=snapshot.val();


setRevenues(

data?

Object.entries(data)
.map(([id,value])=>({

id,
...value

}))

:

[]

);



}

);








onValue(

ref(database,"services"),

snapshot=>{


const data=snapshot.val();


setServices(

data?

Object.entries(data)
.map(([id,value])=>({

id,
...value

}))

:

[]

);



}

);






},[]);









const totalOrders=orders.length;




const totalCustomers =
new Set(
  orders.map(o => o.email || o.phone)
).size;





const totalRevenue=

revenues.reduce(

(sum,item)=>

sum+

Number(item.amount || 0),

0

);







const pendingOrders=

orders.filter(

o=>o.status==="Pending"

).length;






const completedOrders=

orders.filter(

o=>o.status==="Completed"

).length;







const serviceData = services.map(service => ({

  name: service.name,

  value: orders.filter(order => {

    if (!order.services) return false;

    return order.services.some(
      s => s.name === service.name
    );

  }).length

}));








const revenueData=

revenues.map(item=>(

{

date:item.date,

amount:Number(item.amount)

}

));









const orderData=[


{

name:"Pending",

value:pendingOrders

},


{

name:"Completed",

value:completedOrders

}


];










// SAVE ANALYTICS SNAPSHOT


const saveAnalytics = () => {

  push(
    ref(database,"analytics"),
    {

      totalOrders,

      totalRevenue,

      totalCustomers,

      totalServices: services.length,

      pendingOrders,

      completedOrders,

      date: new Date().toLocaleDateString(),

      time: new Date().toLocaleTimeString()

    }
  );

  alert(
    "Analytics Snapshot Saved Successfully"
  );

};









// EXPORT CSV


const exportCSV = () => {

  let csv =
    "Customer,Order ID,Service,Amount,Payment Method,Status,Notes,Date\n";

  revenues.forEach((r) => {

    csv +=
      `"${r.customer || ""}",` +
      `"${r.orderId || ""}",` +
      `"${r.service || ""}",` +
      `"${r.amount || ""}",` +
      `"${r.paymentMethod || ""}",` +
      `"${r.status || ""}",` +
      `"${r.notes || ""}",` +
      `"${r.date || ""}"\n`;

  });

  const blob = new Blob(
    [csv],
    {
      type: "text/csv;charset=utf-8;"
    }
  );

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download =
    `Elsies-Revenue-Report-${new Date().toLocaleDateString()}.csv`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

};










return(



<div className="admin-analytics">







<section className="analytics-header">


<h1>

Business Analytics

</h1>


<p>

Monitor growth, customers, orders and revenue performance.

</p>


</section>









<section className="analytics-cards">






<div>

<FaShoppingBag/>

<h2>

{totalOrders}

</h2>

<p>
Orders
</p>

</div>







<div>

<FaMoneyBillWave/>


<h2>

R {totalRevenue}

</h2>


<p>
Revenue
</p>


</div>






<div>

<FaUsers/>


<h2>

{totalCustomers}

</h2>


<p>
Customers
</p>


</div>







<div>

<FaChartLine/>


<h2>

{services.length}

</h2>


<p>
Services
</p>


</div>






</section>









<div className="analytics-buttons">


<button onClick={saveAnalytics}>

<FaDatabase/>

Save Analytics

</button>




<button onClick={exportCSV}>

<FaDownload/>

Export CSV

</button>


</div>









<section className="charts">





<div className="chart-card">


<h2>

Revenue Growth

</h2>



<ResponsiveContainer

height={350}

width="100%"

>


<LineChart data={revenueData}>


<CartesianGrid strokeDasharray="3 3"/>


<XAxis dataKey="date"/>


<YAxis/>


<Tooltip/>


<Line

dataKey="amount"

type="monotone"

/>


</LineChart>


</ResponsiveContainer>



</div>









<div className="chart-card">


<h2>

Order Status

</h2>




<ResponsiveContainer

height={350}

width="100%"

>


<PieChart>


<Pie

data={orderData}

dataKey="value"

>

{

orderData.map(

(entry,index)=>(


<Cell key={index}/>


)

)

}

</Pie>


<Tooltip/>


</PieChart>


</ResponsiveContainer>



</div>









<div className="chart-card">


<h2>

Popular Services

</h2>



<ResponsiveContainer

height={350}

width="100%"

>


<BarChart data={serviceData}>


<CartesianGrid strokeDasharray="3 3"/>


<XAxis dataKey="name"/>


<YAxis/>


<Tooltip/>


<Bar dataKey="value"/>



</BarChart>


</ResponsiveContainer>



</div>





</section>






</div>


);



}


export default AdminAnalytics;