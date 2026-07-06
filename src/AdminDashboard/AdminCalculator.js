import React,{useEffect,useState} from "react";
import "./AdminCalculator.css";

import {
FaPlus,
FaEdit,
FaTrash,
FaCalculator
} from "react-icons/fa";


import {
ref,
push,
onValue,
update,
remove
} from "firebase/database";

import {database} from "../firebaseConfig";



function AdminCalculator(){


const [items,setItems]=useState([]);

const [editId,setEditId]=useState(null);


const [form,setForm]=useState({

name:"",
firstPage:"",
remainingPage:"",
category:"Printing"

});




useEffect(()=>{


onValue(
ref(database,"printPrices"),
snapshot=>{


const data=snapshot.val();


setItems(

data ?

Object.entries(data).map(([id,value])=>({

id,
...value

}))

:

[]

);


}

);


},[]);





const change=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};







const save=()=>{


if(!form.name)
return alert("Enter name");



if(editId){


update(

ref(database,`printPrices/${editId}`),

form

);


setEditId(null);


}

else{


push(

ref(database,"printPrices"),

form

);


}




setForm({

name:"",
firstPage:"",
remainingPage:"",
category:"Printing"

});



};







const edit=(item)=>{


setEditId(item.id);


setForm({

name:item.name,

firstPage:item.firstPage,

remainingPage:item.remainingPage,

category:item.category

});


};






const removeItem=(id)=>{


if(window.confirm("Delete price?")){


remove(

ref(database,`printPrices/${id}`)

);


}


};





return(


<div className="admin-calculator">


<h1>
<FaCalculator/>
 Print Calculator Management
</h1>



<div className="calculator-form">


<input

name="name"

placeholder="Item Name"

value={form.name}

onChange={change}

/>



<input

name="firstPage"

placeholder="First Page Price"

value={form.firstPage}

onChange={change}

/>



<input

name="remainingPage"

placeholder="Remaining Page Price"

value={form.remainingPage}

onChange={change}

/>





<select

name="category"

value={form.category}

onChange={change}

>


<option>
Printing
</option>

<option>
Colour
</option>


<option>
Black & White
</option>


</select>





<button onClick={save}>


<FaPlus/>

{
editId ?

"Update"

:

"Add"

}

</button>



</div>





<div className="price-grid">


{

items.map(item=>(


<div className="price-card" key={item.id}>


<h2>

{item.name}

</h2>


<p>

First Page:
<b>
R {item.firstPage}
</b>

</p>


<p>

Other Pages:
<b>
R {item.remainingPage}
</b>

</p>




<button

onClick={()=>edit(item)}

>

<FaEdit/>

</button>



<button

onClick={()=>removeItem(item.id)}

>

<FaTrash/>

</button>



</div>


))


}



</div>





</div>


);


}



export default AdminCalculator;