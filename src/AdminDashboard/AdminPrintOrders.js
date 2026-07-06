import React,{useEffect,useState} from "react";
import "./AdminPrintOrders.css";

import {

FaSearch,
FaTrash,
FaEye,
FaDownload,
FaPrint,
FaWhatsapp,
FaPhone,
FaEnvelope,
FaFilePdf,
FaImage,
FaCheckCircle,
FaClock,
FaSpinner

} from "react-icons/fa";


import {

ref,
onValue,
remove,
update

} from "firebase/database";


import {database} from "../firebaseConfig";





function AdminPrintOrders(){



const [orders,setOrders]=useState([]);

const [search,setSearch]=useState("");

const [filter,setFilter]=useState("All");

const [selected,setSelected]=useState(null);






useEffect(()=>{


onValue(

ref(database,"printOrders"),

snapshot=>{


const data=snapshot.val();


if(data){


setOrders(

Object.entries(data).map(([id,value])=>({

id,
...value

}))

);


}else{


setOrders([]);


}



}



);



},[]);









const deleteOrder=(id)=>{


if(window.confirm("Delete print request?")){


remove(

ref(database,`printOrders/${id}`)

);


}



};









const updateStatus=(id,status)=>{


update(

ref(database,`printOrders/${id}`),

{

status

}

);


};









const downloadFile=(file)=>{


const link=document.createElement("a");


link.href=file.data;


link.download=file.name;


link.click();


};









const printFile=(file)=>{


const win=window.open();


win.document.write(

`

<img src="${file.data}" 

style="max-width:100%"/>

`

);


win.print();



};









const filteredOrders=orders.filter(order=>{


const searchMatch=

order.name
?.toLowerCase()
.includes(search.toLowerCase())

||

order.phone
?.includes(search);



const statusMatch=

filter==="All"

||

order.status===filter;



return searchMatch && statusMatch;


});









const pending=

orders.filter(
o=>o.status==="Pending"
).length;



const processing=

orders.filter(
o=>o.status==="Processing"
).length;



const completed=

orders.filter(
o=>o.status==="Completed"
).length;









return(


<div className="admin-print">







<section className="print-header">


<h1>

Print Orders Management

</h1>


<p>

Manage customer uploaded printing files and requests.

</p>


</section>









<section className="print-stats">



<div>

<FaClock/>

<h2>
{pending}
</h2>

<p>
Pending
</p>


</div>




<div>

<FaSpinner/>

<h2>
{processing}
</h2>

<p>
Processing
</p>


</div>





<div>

<FaCheckCircle/>

<h2>
{completed}
</h2>

<p>
Completed
</p>


</div>



</section>









<section className="tools">


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
Pending
</option>


<option>
Processing
</option>


<option>
Completed
</option>



</select>


</section>









<section className="table-card">



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
Files
</th>


<th>
Quantity
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

{order.name}

</td>





<td>

{order.phone}

</td>







<td>


<div className="files">


{


order.documents?.map((file,index)=>(


<div key={index}>


{

file.type.includes("image")

?

<FaImage/>

:

<FaFilePdf/>

}


{file.name}


</div>



))


}



</div>


</td>








<td>

{order.quantity}

</td>







<td>


<select


className={order.status}


value={order.status}


onChange={
e=>updateStatus(
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
Completed
</option>


</select>



</td>








<td>

{order.date}

</td>








<td>


<button

className="view"

onClick={()=>setSelected(order)}

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















{


selected &&


<div className="modal">


<div className="modal-box">



<h2>
Print Order Details
</h2>




<p>

Customer:

<b>{selected.name}</b>

</p>




<p>

Phone:

<b>{selected.phone}</b>

</p>




<p>

Paper:

<b>{selected.paper}</b>

</p>



<p>

Colour:

<b>{selected.color}</b>

</p>









<h3>
Uploaded Files
</h3>





<div className="gallery">



{


selected.documents?.map((file,index)=>(



<div key={index}>


{

file.type.includes("image")

&&

<img

src={file.data}

alt="file"

/>

}



<p>

{file.name}

</p>




<button

onClick={()=>downloadFile(file)}

>

<FaDownload/>

Download

</button>




<button

onClick={()=>printFile(file)}

>

<FaPrint/>

Print

</button>




</div>



))


}



</div>









<div className="contact">


<a href={`https://wa.me/${selected.phone}`}>

<FaWhatsapp/>

</a>


<a href={`tel:${selected.phone}`}>

<FaPhone/>

</a>


<a href={`mailto:${selected.email}`}>

<FaEnvelope/>

</a>


</div>








<button

className="close"

onClick={()=>setSelected(null)}

>

Close

</button>




</div>


</div>



}








</div>


);



}



export default AdminPrintOrders;