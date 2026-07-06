import React,{useState} from "react";
import "./Register.css";

import {
createUserWithEmailAndPassword
} from "firebase/auth";

import {
ref,
set
} from "firebase/database";


import {
auth,
database
} from "../firebaseConfig";


import {
FaUser,
FaEnvelope,
FaLock,
FaEye,
FaEyeSlash,
FaUserPlus
} from "react-icons/fa";

import {useNavigate} from "react-router-dom";



function Register(){


const navigate = useNavigate();


const [show,setShow]=useState(false);


const [form,setForm]=useState({

name:"",
email:"",
password:""

});


const [loading,setLoading]=useState(false);



const change=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};





const register=async(e)=>{


e.preventDefault();


setLoading(true);


try{


const userCredential =
await createUserWithEmailAndPassword(

auth,

form.email,

form.password

);



const user =
userCredential.user;



await set(

ref(database,"users/"+user.uid),

{


name:form.name,

email:form.email,

role:"customer",

createdAt:new Date().toISOString()


}


);



alert("Account created successfully");


navigate("/login");



}

catch(error){


alert(error.message);


}


setLoading(false);


};





return(


<div className="register-page">



<div className="register-box">



<div className="register-title">


<FaUserPlus/>


<h1>
Create Account
</h1>


<p>

Join Elsies Print & Embroidery

</p>


</div>







<form onSubmit={register}>


<div className="input-box">

<FaUser/>

<input

type="text"

name="name"

placeholder="Full Name"

required

onChange={change}

/>


</div>







<div className="input-box">


<FaEnvelope/>


<input

type="email"

name="email"

placeholder="Email Address"

required

onChange={change}

/>


</div>








<div className="input-box">


<FaLock/>


<input


type={show?"text":"password"}


name="password"


placeholder="Password"


required


onChange={change}



/>


<span

onClick={()=>setShow(!show)}

>


{
show ?

<FaEyeSlash/>

:

<FaEye/>

}


</span>


</div>







<button disabled={loading}>


{
loading ?

"Creating..."

:

"Register"

}


</button>







<p className="login-link">


Already have account?


<span onClick={()=>navigate("/login")}>

 Login

</span>


</p>




</form>




</div>




</div>



);


}



export default Register;