import React, {useState} from "react";
import "./Login.css";

import {
signInWithEmailAndPassword
} from "firebase/auth";

import {auth} from "../firebaseConfig";

import {
FaEye,
FaEyeSlash,
FaLock,
FaEnvelope,
FaArrowRight
} from "react-icons/fa";

import {useNavigate} from "react-router-dom";


function UserLogin(){


const navigate = useNavigate();


const [email,setEmail]=useState("");

const [password,setPassword]=useState("");

const [show,setShow]=useState(false);

const [loading,setLoading]=useState(false);

const [error,setError]=useState("");





const login = async(e)=>{

e.preventDefault();

setLoading(true);
setError("");


try{


await signInWithEmailAndPassword(
auth,
email,
password
);


// LOGIN SUCCESS → HOME PAGE

navigate("/orders");


}

catch(err){


if(err.code === "auth/invalid-credential"){

setError("Invalid email or password");

}
else if(err.code === "auth/user-not-found"){

setError("Account does not exist");

}
else if(err.code === "auth/wrong-password"){

setError("Wrong password");

}
else{

setError("Something went wrong. Try again.");

}


}


setLoading(false);


};





return(


<div className="login-page">



<div className="login-glow one"></div>

<div className="login-glow two"></div>





<div className="login-card">



<div className="brand">


<h1>

Elsies

<span>
Login
</span>


</h1>


<p>
Welcome back
</p>


</div>





<form onSubmit={login}>


<div className="input-box">


<FaEnvelope/>


<input

type="email"

placeholder="Email address"

value={email}

onChange={
e=>setEmail(e.target.value)
}

/>


</div>







<div className="input-box">


<FaLock/>

<input


type={
show?
"text":
"password"
}


placeholder="Password"


value={password}


onChange={
e=>setPassword(e.target.value)
}


/>



<button

type="button"

className="eye"

onClick={
()=>setShow(!show)
}

>


{
show?
<FaEyeSlash/>
:
<FaEye/>
}


</button>


</div>








<div className="login-options">


<label>


<input type="checkbox"/>


Remember me


</label>




<span

onClick={
()=>navigate("/forgot-password")
}

>

Forgot password?


</span>


</div>








<button

className="login-btn"

disabled={loading}

>


{
loading?

"Signing in..."

:

<>

Login

<FaArrowRight/>

</>


}


</button>





{
error &&

<p className="error">

{error}

</p>

}





<p className="register">


Don't have an account?


<span

onClick={
()=>navigate("/register")
}

>

Create account


</span>


</p>






</form>




</div>





</div>


)



}


export default UserLogin;