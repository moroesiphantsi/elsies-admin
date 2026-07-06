import React,{useState} from "react";

import "./ForgotPassword.css";


import {
sendPasswordResetEmail
}
from "firebase/auth";


import {
auth
}
from "../firebaseConfig";


import {

FaEnvelope,
FaKey,
FaArrowLeft

}
from "react-icons/fa";


import {
useNavigate
}
from "react-router-dom";




function ForgotPassword(){


const navigate=useNavigate();



const [email,setEmail]=useState("");

const [loading,setLoading]=useState(false);



const resetPassword=async(e)=>{


e.preventDefault();


setLoading(true);



try{


await sendPasswordResetEmail(

auth,

email

);



alert(
"Password reset link sent. Check your email."
);



navigate("/login");



}

catch(error){


alert(error.message);


}



setLoading(false);



};





return(


<div className="forgot-page">





<div className="forgot-box">





<div className="forgot-header">


<FaKey/>


<h1>

Forgot Password

</h1>



<p>

Enter your email to reset your Elsies account password

</p>



</div>








<form onSubmit={resetPassword}>


<div className="forgot-input">


<FaEnvelope/>


<input


type="email"


placeholder="Your email address"


required


value={email}


onChange={(e)=>

setEmail(e.target.value)

}


/>


</div>








<button>


{

loading

?

"Sending..."

:

"Send Reset Link"

}



</button>








<div

className="back-login"

onClick={()=>navigate("/login")}

>


<FaArrowLeft/>

Back to Login


</div>






</form>







</div>





</div>


);


}


export default ForgotPassword;