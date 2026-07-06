import React,{useEffect,useState} from "react";
import "./AdminRevenue.css";


import {
FaPlus,
FaEdit,
FaTrash,
FaSearch,
FaMoneyBillWave,
FaChartLine
} from "react-icons/fa";


import {
ref,
push,
onValue,
remove,
update
} from "firebase/database";
import * as XLSX from "xlsx";
import { FaFileExcel } from "react-icons/fa";
import {database} from "../firebaseConfig";



import {

ResponsiveContainer,
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
CartesianGrid

} from "recharts";






function AdminRevenue(){



const [revenues,setRevenues]=useState([]);



const [editId,setEditId]=useState(null);



const [search,setSearch]=useState("");



const [filter,setFilter]=useState("All");






const [form,setForm]=useState({

customer:"",
orderId:"",
service:"",
amount:"",
paymentMethod:"Cash",
status:"Paid",
notes:""

});









useEffect(()=>{


const revenueRef=ref(database,"revenues");



onValue(revenueRef,(snapshot)=>{


const data=snapshot.val();



if(data){


setRevenues(

Object.entries(data).map(([id,value])=>({

id,
...value

}))

);


}else{


setRevenues([]);

}



});



},[]);









const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value


});


};









const saveRevenue=()=>{



if(!form.customer || !form.amount)

return alert("Please complete details");





const revenueData={


...form,


date:
new Date().toLocaleDateString(),


time:
new Date().toLocaleTimeString()


};






if(editId){


update(

ref(database,`revenues/${editId}`),

revenueData


);



setEditId(null);



}

else{


push(

ref(database,"revenues"),

revenueData


);


}






setForm({

customer:"",
orderId:"",
service:"",
amount:"",
paymentMethod:"Cash",
status:"Paid",
notes:""


});



};









const editRevenue=(item)=>{


setEditId(item.id);



setForm({

customer:item.customer,

orderId:item.orderId,

service:item.service,

amount:item.amount,

paymentMethod:item.paymentMethod,

status:item.status,

notes:item.notes


});



};










const deleteRevenue=(id)=>{


if(window.confirm("Delete revenue record?")){


remove(

ref(database,`revenues/${id}`)

);


}



};









const filtered = revenues.filter(item=>{


const searchMatch =

item.customer
.toLowerCase()
.includes(search.toLowerCase());



const statusMatch=

filter==="All"

||

item.status===filter;



return searchMatch && statusMatch;



});









const totalRevenue = revenues.reduce(

(sum,item)=>

sum + Number(item.amount || 0),

0

);



const paidRevenue = revenues.filter(

r=>r.status==="Paid"

).reduce(

(sum,item)=>sum+Number(item.amount),

0

);



const pendingRevenue = revenues.filter(

r=>r.status==="Pending"

).reduce(

(sum,item)=>sum+Number(item.amount),

0

);






const chartData = revenues.map(item=>(

{

date:item.date,

amount:Number(item.amount)

}

));



const exportRevenueExcel = () => {


const excelData = revenues.map(item => ({


"Customer Name":
item.customer,


"Order ID":
item.orderId || "-",


"Service":
item.service || "-",


"Amount":
`R ${item.amount}`,


"Payment Method":
item.paymentMethod,


"Status":
item.status,


"Date":
item.date,


"Time":
item.time,


"Notes":
item.notes || "-"



}));





const worksheet =
XLSX.utils.json_to_sheet(excelData);



const workbook =
XLSX.utils.book_new();



XLSX.utils.book_append_sheet(

workbook,

worksheet,

"Elsies Revenue Report"

);




XLSX.writeFile(

workbook,

"Elsies_Revenue_Report.xlsx"

);



};






return(


<div className="admin-revenue">







<section className="revenue-header">


<h1>

Revenue Management

</h1>


<p>

Track payments, income and business growth.

</p>


</section>











<section className="revenue-stats">



<div>

<FaMoneyBillWave/>

<h2>
R {totalRevenue}
</h2>

<p>
Total Revenue
</p>

</div>





<div>

<FaChartLine/>

<h2>
R {paidRevenue}
</h2>

<p>
Paid
</p>

</div>





<div>

<FaMoneyBillWave/>

<h2>
R {pendingRevenue}
</h2>

<p>
Pending
</p>

</div>



</section>









<section className="revenue-form">


<h2>

{editId?
"Edit Revenue":
"Add Revenue"

}

</h2>





<input

name="customer"

placeholder="Customer Name"

value={form.customer}

onChange={handleChange}

/>




<input

name="orderId"

placeholder="Order ID"

value={form.orderId}

onChange={handleChange}

/>





<input

name="service"

placeholder="Service"

value={form.service}

onChange={handleChange}

/>






<input

name="amount"

placeholder="Amount"

value={form.amount}

onChange={handleChange}

/>






<select

name="paymentMethod"

value={form.paymentMethod}

onChange={handleChange}

>

<option>
Cash
</option>

<option>
Card
</option>


<option>
EFT
</option>


<option>
WhatsApp Payment
</option>


</select>







<select

name="status"

value={form.status}

onChange={handleChange}

>


<option>
Paid
</option>


<option>
Pending
</option>


</select>







<textarea

name="notes"

placeholder="Notes"

value={form.notes}

onChange={handleChange}

/>






<button

onClick={saveRevenue}

>


<FaPlus/>

Save Revenue


</button>

<button

className="excel-btn"

onClick={exportRevenueExcel}

>

<FaFileExcel/>

Export Excel Report

</button>




</section>









<section className="revenue-tools">


<div className="search">


<FaSearch/>


<input

placeholder="Search customer"

value={search}

onChange={
e=>setSearch(e.target.value)
}


/>

</div>





<select

onChange={
e=>setFilter(e.target.value)
}

>

<option>
All
</option>

<option>
Paid
</option>

<option>
Pending
</option>


</select>

</section>






<section className="revenue-table">



<table>


<thead>


<tr>

<th>
Customer
</th>


<th>
Service
</th>


<th>
Amount
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


filtered.map(item=>(


<tr key={item.id}>


<td>
{item.customer}
</td>


<td>
{item.service}
</td>


<td>
R {item.amount}
</td>



<td>

<span className={item.status}>

{item.status}

</span>


</td>



<td>

{item.date}

</td>



<td>


<button

onClick={()=>editRevenue(item)}

>

<FaEdit/>

</button>



<button

onClick={()=>deleteRevenue(item.id)}

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









<section className="chart">


<h2>
Revenue Growth
</h2>



<ResponsiveContainer

width="100%"

height={350}

>


<LineChart data={chartData}>


<CartesianGrid strokeDasharray="3 3"/>


<XAxis dataKey="date"/>


<YAxis/>


<Tooltip/>


<Line

type="monotone"

dataKey="amount"

/>


</LineChart>


</ResponsiveContainer>



</section>







</div>


);


}



export default AdminRevenue;
