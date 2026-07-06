import React,{useEffect,useState} from "react";
import "./Profile.css";

import {
getAuth,
updateProfile,
onAuthStateChanged
} from "firebase/auth";


import {
ref,
set,
onValue
} from "firebase/database";


import {
database
} from "../firebaseConfig";


import {
FaUser,
FaCamera,
FaSave,
FaShoppingBag
} from "react-icons/fa";

import {
FaBell,
FaWhatsapp,
FaPhone
} from "react-icons/fa";


function Profile(){


const auth=getAuth();


const [user,setUser]=useState(null);



const [profile,setProfile]=useState({

name:"",
phone:"",
image:""

});



const [orders,setOrders]=useState([]);





// CHECK USER LOGIN

useEffect(() => {

const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{

if(currentUser){

setUser(currentUser);

}else{

setUser(null);

}

});

return unsubscribe;

},[auth]);





// LOAD USER DATA


useEffect(()=>{


if(!user)return;



const profileRef =
ref(
database,
`users/${user.uid}`
);



onValue(profileRef,(snap)=>{


if(snap.exists()){


setProfile(prev => ({

...prev,

...snap.val()

}));


}



});






const ordersRef =
ref(database,"orders");



onValue(ordersRef,(snap)=>{


const data=snap.val();



if(data){



const myOrders = Object.entries(data)

.map(([id,value])=>({

id,
...value

}))


.filter(order=>

order.userId === user.uid

);



setOrders(myOrders);



}

else{


setOrders([]);

}



});

},[user]);









const handleChange=(e)=>{


setProfile({

...profile,

[e.target.name]:
e.target.value

});


};









const uploadImage=(e)=>{


const file=e.target.files[0];


if(!file)return;



const reader =
new FileReader();



reader.onload=()=>{


setProfile({

...profile,

image:reader.result

});


};



reader.readAsDataURL(file);



};









const saveProfile=async()=>{


if(!user){

alert("Please login first");

return;

}



try{


await updateProfile(user,{


displayName:
profile.name,


photoURL:
profile.image



});





await set(

ref(
database,
`users/${user.uid}`
),

{


...profile,


email:user.email


}


);



alert("Profile updated successfully");


}

catch(error){


console.log(error);


alert(error.message);


}



};








if(!user){


return(


<div className="profile-page">


<h2>

Please login to view profile

</h2>


</div>


);


}









return(


<div className="profile-page">







<section className="profile-header">


<h1>

My Profile

</h1>


<p>

Manage your Elsies account

</p>


</section>









<div className="profile-container">







<div className="profile-card">





<div className="avatar">





{

profile.image ?


<img

src={profile.image}

alt="profile"

/>


:


<FaUser/>


}





<label>


<FaCamera/>


<input

type="file"

accept="image/*"

onChange={uploadImage}


/>


</label>





</div>







<h2>


{profile.name || "Customer"}


</h2>





<p>


{user.email}


</p>








<input

name="name"

placeholder="Full Name"

value={profile.name}

onChange={handleChange}

/>








<input

name="phone"

placeholder="Phone Number"

value={profile.phone}

onChange={handleChange}

/>







<button

onClick={saveProfile}

>



<FaSave/>


Save Profile



</button>









</div>









<div className="orders-card">



<h2>


<FaShoppingBag/>


My Orders


</h2>





{

orders.length===0 ?


<p>

No orders yet

</p>


:


orders.map(order=>(


<div
className="order-item"
key={order.id}
>



<h3>

<FaShoppingBag/>

Order Details

</h3>




<div className="order-info">


<p>

<strong>
Customer:
</strong>

{order.fullname}

</p>



<p>

<strong>
Phone:
</strong>

{order.phone}

</p>




<p>

<strong>
Email:
</strong>

{order.userEmail || order.email}

</p>





<p>

<strong>
Services:
</strong>

</p>


<ul>


{

order.services &&

order.services.map((service,index)=>(

<li key={index}>

{service}

</li>

))


}


</ul>







<p>

<strong>
Quantity:
</strong>

{order.quantity || "Not provided"}

</p>







<p>

<strong>
Delivery Address:
</strong>


{order.address},

{order.city},

{order.province}


</p>







<p>

<strong>
Delivery Date:
</strong>


{order.deliveryDate || "Not selected"}


</p>







<p>

<strong>
Payment:
</strong>


{order.paymentMethod}


</p>








<p>

<strong>
Amount:
</strong>


R {order.totalAmount || 0}


</p>









<p>

<strong>
Tracking Number:
</strong>


{order.trackingNumber}


</p>









<p>

<strong>
Placed On:
</strong>


{order.date}


at


{order.time}


</p>



{


order.customerMessage &&


<div className="customer-alert">


<h4>

<FaBell/>

 Order Update

</h4>


<p>

{order.customerMessage}

</p>


<small>

Updated:

{order.statusUpdatedAt}

</small>



<div className="profile-contact">


<a

href="https://wa.me/27827187044"

target="_blank"

rel="noreferrer"

>

<FaWhatsapp/>

WhatsApp Support

</a>





<a

href="tel:+27827187044"

>

<FaPhone/>

Call Support

</a>



</div>



</div>


}


<span

className={

`status ${order.status?.toLowerCase()}`

}

>


{

order.status || "Pending"

}


</span>




</div>





</div>


))


}






</div>









</div>






</div>



)



}


export default Profile;