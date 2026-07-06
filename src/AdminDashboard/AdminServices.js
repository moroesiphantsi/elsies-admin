import React,{useEffect,useState} from "react";
import "./AdminServices.css";


import {
FaEdit,
FaTrash,
FaSearch,
FaSave,
FaImage
} from "react-icons/fa";


import {
ref,
push,
onValue,
remove,
update
} from "firebase/database";


import {database} from "../firebaseConfig";





function AdminServices(){



const [services,setServices]=useState([]);

const [search,setSearch]=useState("");

const [category,setCategory]=useState("All");

const [editId,setEditId]=useState(null);



const [form,setForm]=useState({

name:"",
category:"",
subcategory:"",
description:"",
price:"",
image:""

});







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









// HANDLE TEXT INPUTS

const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};










// IMAGE UPLOAD TO BASE64

const uploadImage=(e)=>{


const file=e.target.files[0];


if(!file)
return;



const reader=new FileReader();



reader.onloadend=()=>{


setForm({

...form,

image:reader.result

});


};



reader.readAsDataURL(file);



};









// SAVE SERVICE


const saveService=()=>{


if(!form.name || !form.price)
return alert("Complete service details");






if(editId){


update(

ref(database,`services/${editId}`),

{

...form

}

);



setEditId(null);



}

else{



push(

ref(database,"services"),

{


...form,


dateCreated:new Date().toLocaleString()


}


);



}






setForm({

name:"",
category:"Printing Services",
description:"",
price:"",
image:""

});



};









// EDIT


const editService=(service)=>{


setEditId(service.id);


setForm({

name:service.name,

category:service.category,

description:service.description,

price:service.price,

image:service.image


});


};











// DELETE


const deleteService=(id)=>{


if(window.confirm("Delete this service?")){


remove(

ref(database,`services/${id}`)

);


}



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



<div className="admin-services">






<section className="service-header">


<h1>
Services Management
</h1>


<p>
Add, edit, delete and manage Elsies services.
</p>


</section>









<section className="service-form">



<h2>

{editId ? "Edit Service":"Add New Service"}

</h2>







<input

name="name"

placeholder="Service Name"

value={form.name}

onChange={handleChange}

/>









<select

name="category"

value={form.category}

onChange={handleChange}
required
>


<option>
Select Catagory
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


<option>
Tshirt Printing
</option>

<option>
Pocket size
</option>

<option>
Photo Enlargement
</option>

<option>
Internet Cafe Sevices
</option>

<option>
Laminating
</option>

<option>
Typing
</option>

<option>
Printing Docs
</option>

<option>
Scan to email
</option>

<option>
Print Pictures
</option>

<option>
Building Plans
</option>

<option>
Gifts
</option>


</select>
 {form.category === "Gifts" && (

    <select
    name="subcategory"
    value={form.subcategory}
    onChange={handleChange}
    required>

        <option value="">
            Select Gift type
            </option>

<option value="Magic Mug">Magic Mug</option>

<option value="Colour Mug">Colour Mug</option>

<option value="White Mug">White Mug</option>

<option value="Travel Mug">Travel Mug</option>

<option value="Water Bottle">Water Bottle</option>

<option value="Sports Bottle">Sports Bottle</option>

<option value="Tumbler">Tumbler</option>

<option value="Plate">Plate</option>

<option value="Number Plate">Number Plate</option>

<option value="Wooden Plaque">Wooden Plaque</option>

<option value="Glass Frame">Glass Frame</option>

<option value="Photo Frame">Photo Frame</option>

<option value="Wall Clock">Wall Clock</option>

<option value="Mouse Pad">Mouse Pad</option>

<option value="Key Holder">Key Holder</option>

<option value="Key Ring">Key Ring</option>

<option value="Puzzle">Puzzle</option>

<option value="Coaster">Coaster</option>

<option value="Notebook">Notebook</option>

<option value="Diary">Diary</option>

<option value="Calendar">Calendar</option>

<option value="Pen">Pen</option>

<option value="USB Flash Drive">USB Flash Drive</option>

<option value="Phone Cover">Phone Cover</option>

<option value="Apron">Apron</option>

<option value="Shopping Bag">Shopping Bag</option>

<option value="Cushion">Cushion</option>

<option value="Blanket">Blanket</option>

<option value="Glass">Glass</option>

<option value="Beer Mug">Beer Mug</option>

    </select>


 )}

{form.category === "Photo Enlargement" && (

<select
name="subcategory"
value={form.subcategory}
onChange={handleChange}
required
>

<option value="">
Select Photo Size
</option>

<option value="Passport Size">
Passport Size
</option>

<option value="ID Photo">
ID Photo
</option>

<option value="Mini Print">
Mini Print
</option>

<option value="4 x 6 Inches">
4 x 6 Inches
</option>

<option value="5 x 7 Inches">
5 x 7 Inches
</option>

<option value="6 x 8 Inches">
6 x 8 Inches
</option>

<option value="8 x 10 Inches">
8 x 10 Inches
</option>

<option value="10 x 12 Inches">
10 x 12 Inches
</option>

<option value="12 x 18 Inches">
12 x 18 Inches
</option>

<option value="16 x 20 Inches">
16 x 20 Inches
</option>

<option value="20 x 30 Inches">
20 x 30 Inches
</option>

<option value="24 x 36 Inches">
24 x 36 Inches
</option>

<option value="A6">
A6
</option>

<option value="A5">
A5
</option>

<option value="A4">
A4
</option>

<option value="A3">
A3
</option>

<option value="A2">
A2
</option>

<option value="A1">
A1
</option>

<option value="A0">
A0
</option>

<option value="Canvas Print">
Canvas Print
</option>

<option value="Gloss Photo">
Gloss Photo
</option>

<option value="Matte Photo">
Matte Photo
</option>

<option value="Photo Poster">
Photo Poster
</option>

<option value="Wall Art">
Wall Art
</option>

</select>

)}

{form.category==="Tshirt Printing" && (

<select
name="subcategory"
value={form.subcategory}
onChange={handleChange}
>

<option value="">Select Type</option>

<option>Vinyl Printing</option>

<option>DTF Printing</option>

<option>Sublimation</option>

<option>Screen Printing</option>

<option>Heat Press</option>

<option>Sports Jerseys</option>

<option>Golf Shirts</option>

<option>School Uniforms</option>

<option>Corporate Wear</option>

<option>Caps</option>

<option>Hoodies</option>

<option>Baby Shirts</option>

<option>Long Sleeve Shirts</option>

<option>Reflective Shirts</option>

</select>

)}

{form.category==="Printing Services" && (

<select
name="subcategory"
value={form.subcategory}
onChange={handleChange}
>

<option value="">Select Service</option>

<option>Black & White Printing</option>

<option>Colour Printing</option>

<option>Book Printing</option>

<option>Flyers</option>

<option>Brochures</option>

<option>Business Cards</option>

<option>Certificates</option>

<option>Posters</option>

<option>Banners</option>

<option>Invoices</option>

<option>Letterheads</option>

<option>Receipt Books</option>

<option>Stickers</option>

<option>Menus</option>

<option>Wedding Cards</option>

<option>Funeral Programmes</option>

<option>Invitation Cards</option>

<option>Booklets</option>

<option>Calendars</option>

<option>PVC Cards</option>

</select>

)}

{form.category==="Internet Cafe Sevices" && (

<select
name="subcategory"
value={form.subcategory}
onChange={handleChange}
>

<option>Scanning</option>

<option>Emailing</option>

<option>Typing</option>

<option>CV Creation</option>

<option>Job Applications</option>

<option>Online Applications</option>

<option>Photocopy</option>

<option>Binding</option>

<option>Laminating</option>

<option>Passport Photos</option>

<option>ID Photos</option>

<option>Internet Browsing</option>

<option>Printing</option>

<option>Wi-Fi Access</option>

</select>

)}

{form.category==="Embroidery Services" && (

<select
name="subcategory"
value={form.subcategory}
onChange={handleChange}
>

<option>Caps</option>

<option>Golf Shirts</option>

<option>T-Shirts</option>

<option>Hoodies</option>

<option>Jackets</option>

<option>School Uniforms</option>

<option>Corporate Uniforms</option>

<option>Overalls</option>

<option>Towels</option>

<option>Blankets</option>

<option>Bags</option>

<option>Beanies</option>

<option>Aprons</option>

<option>Patches</option>

</select>

)}




<input

name="price"

placeholder="Price"

value={form.price}

onChange={handleChange}

/>









<label className="upload-box">


<FaImage/>


Upload Service Image


<input

type="file"

accept="image/*"

onChange={uploadImage}

/>


</label>







{

form.image &&

<img

src={form.image}

className="preview"

alt="preview"

/>

}









<textarea

name="description"

placeholder="Service description"

value={form.description}

onChange={handleChange}

/>









<button

onClick={saveService}

>


<FaSave/>

{

editId

?

"Update Service"

:

"Add Service"

}


</button>






</section>













<section className="service-tools">



<div className="search">


<FaSearch/>


<input

placeholder="Search services..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>


</div>







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



</section>









<section className="service-grid">





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






<h2>

{service.name}

</h2>



<span>

{service.category}

</span>





<p>

{service.description}

</p>





<h3>

R {service.price}

</h3>








<div className="actions">



<button

onClick={()=>editService(service)}

>

<FaEdit/>

</button>






<button

onClick={()=>deleteService(service.id)}

>

<FaTrash/>

</button>



</div>





</div>




))


}






</section>







</div>


);


}


export default AdminServices;

