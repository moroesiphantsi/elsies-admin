import React,{useState} from "react";
import "./PrintOut.css";

import {database} from "../firebaseConfig";
import {ref,push} from "firebase/database";

import {
FaCloudUploadAlt,
FaFilePdf,
FaFileWord,
FaFileExcel,
FaImage,
FaPaperPlane,
FaTrash
} from "react-icons/fa";
import { Link} from "react-router-dom";

function PrintOut(){


const [files,setFiles]=useState([]);



const [form,setForm]=useState({

name:"",
phone:"",
email:"",
quantity:1,
paper:"A4",
color:"Colour",
notes:""

});





// INPUT CHANGE

const change=(e)=>{

setForm({

...form,

[e.target.name]:e.target.value

});


};







// FILE UPLOAD CONVERT BASE64


const handleFiles=(e)=>{


const selected=[...e.target.files];


selected.forEach(file=>{


const reader=new FileReader();


reader.onloadend=()=>{


setFiles(prev=>[

...prev,

{

name:file.name,

type:file.type,

size:file.size,

data:reader.result


}

]);


};


reader.readAsDataURL(file);



});



};








// REMOVE FILE


const removeFile=(index)=>{


setFiles(

files.filter(
(_,i)=>i!==index
)

);


};









// ICON


const fileIcon=(file)=>{


if(file.type.includes("image"))

return <FaImage/>;


if(file.type.includes("pdf"))

return <FaFilePdf/>;


if(file.type.includes("word"))

return <FaFileWord/>;


if(file.type.includes("excel"))

return <FaFileExcel/>;


return <FaFilePdf/>;


};









// SUBMIT


const submit=async(e)=>{


e.preventDefault();



if(files.length===0){

alert("Please upload picture or document");

return;

}





await push(

ref(database,"printOrders"),

{


...form,


documents:files,


status:"Pending",


date:new Date().toLocaleString()


}


);




alert(
"Print request submitted successfully"
);



setFiles([]);


setForm({

name:"",
phone:"",
email:"",
quantity:1,
paper:"A4",
color:"Colour",
notes:""

});



};











return(


<div className="print-page">



<section className="print-hero">


<h1>
Elsie's Print Out Services
</h1>


<p>
Upload pictures, PDFs and documents for professional printing
</p>


</section>







<form

className="print-card"

onSubmit={submit}

>







<label className="upload-box">


<FaCloudUploadAlt/>


<h2>
Upload Files
</h2>



<p>
Pictures / PDF / Word / Excel
</p>



<input

type="file"

multiple

accept="
image/*,
.pdf,
.doc,
.docx,
.xls,
.xlsx
"

onChange={handleFiles}

/>



</label>









<div className="preview">



{

files.map((file,index)=>(


<div className="file-card" key={index}>


{

file.type.includes("image")

&&

<img

src={file.data}

alt="preview"

/>

}



<div>


{fileIcon(file)}


<p>
{file.name}
</p>


<small>
{Math.round(file.size/1024)} KB
</small>


</div>





<button

type="button"

onClick={()=>removeFile(index)}

>


<FaTrash/>

</button>




</div>


))


}



</div>









<input

name="name"

placeholder="Full Name"

value={form.name}

onChange={change}

required

/>







<input

name="phone"

placeholder="Phone Number"

value={form.phone}

onChange={change}

required

/>








<input

name="email"

placeholder="Email"

value={form.email}

onChange={change}

/>










<select

name="paper"

value={form.paper}

onChange={change}

>


<option>A4</option>

<option>A3</option>

<option>A5</option>


</select>









<select

name="color"

value={form.color}

onChange={change}

>


<option>
Colour
</option>


<option>
Black & White
</option>



</select>









<input


type="number"


name="quantity"


value={form.quantity}


onChange={change}


/>










<textarea

name="notes"

placeholder="Special printing instructions..."

value={form.notes}

onChange={change}

/>








<button

className="submit-btn"

>


<FaPaperPlane/>

Submit Print Request


</button>



<Link
  to="/print-calculator"
  className="submit-btn"
>
  <FaPaperPlane />
  Check Prices
</Link>



</form>






</div>



);



}



export default PrintOut;


