import React,{useEffect,useState} from "react";
import "./PlaceOrders.css";

import {
  
  FaTruck,
  FaCalendarAlt,
  FaCreditCard,
  FaUniversity,
  FaPaperPlane
} from "react-icons/fa";

import {
database,
auth
} from "../firebaseConfig";
import {
ref,
push
} from "firebase/database";

import {
onAuthStateChanged
} from "firebase/auth";


function PlaceOrders() {

const [selectedServices,setSelectedServices]=useState([]);



const [order,setOrder]=useState({

fullname:"",
phone:"",
email:"",
services:[],
quantity:"",
address:"",
city:"",
province:"",
deliveryDate:"",
paymentMethod:"",
notes:""

});
const [currentUser,setCurrentUser]=useState(null);

  const handleChange = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value
    });
  };

  const submitOrder = async (e) => {

    e.preventDefault();

    const trackingNumber =
      "ELS-" +
      Math.floor(Math.random() * 999999);

 await push(

ref(database,"orders"),

{


...order,


userId:
currentUser.uid,


userEmail:
currentUser.email,


services:selectedServices.map(
service=>service.name
),


totalAmount:selectedServices.reduce(

(total,item)=>{

return total + Number(item.price);

},0),


trackingNumber,


status:"Pending",


date:new Date().toLocaleDateString(),


time:new Date().toLocaleTimeString()


}

);

    alert(
      `Order Submitted Successfully\nTracking Number: ${trackingNumber}`
    );

    setOrder({
      fullname: "",
      phone: "",
      email: "", 
      service: "",
      quantity: "",
      address: "",
      city: "",
      province: "",
      deliveryDate: "",
      paymentMethod: "",
      notes: ""
    });

  };

  useEffect(()=>{


const unsub =
onAuthStateChanged(auth,(user)=>{


if(user){

setCurrentUser(user);

}


});


return ()=>unsub();


},[]);

  useEffect(()=>{


const savedCart = localStorage.getItem(
"elsiesCart"
);


if(savedCart){


const cartItems =
JSON.parse(savedCart);



setSelectedServices(cartItems);



setOrder(prev=>({

...prev,

services:
cartItems.map(
(item)=>item.name
)


}));


}



},[]);

  return (
    <div className="place-order-page">

      <section className="order-hero">

        <h1>
          Place Your Order
        </h1>

        <p>
          Professional Printing, Embroidery,
          Branding and IT Supplies
        </p>

      </section>

      <form
        className="order-card"
        onSubmit={submitOrder}
      >

        <h2>
          Customer Information
        </h2>

        <div className="form-grid">

          <input
            name="fullname"
            placeholder="Full Name"
            value={order.fullname}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={order.phone}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            placeholder="Email Address"
            value={order.email}
            onChange={handleChange}
          />

        </div>

        <h2>
          Order Details
        </h2>

        <div className="form-grid">

          <div className="selected-services">


<h3>
Selected Services
</h3>


{
selectedServices.map(service=>(


<div 
className="selected-service"
key={service.id}
>


<img

src={service.image}

alt={service.name}

/>


<div>

<h4>
{service.name}
</h4>


<p>

R {service.price}

</p>


</div>



</div>



))

}


</div>

          <input
            name="quantity"
            placeholder="Quantity"
            value={order.quantity}
            onChange={handleChange}
            required
          />

        </div>

        <h2>
          Delivery Information
        </h2>

        <div className="form-grid">

          <input
            name="address"
            placeholder="Street Address"
            value={order.address}
            onChange={handleChange}
            required
          />

          <input
            name="city"
            placeholder="City"
            value={order.city}
            onChange={handleChange}
            required
          />

          <input
            name="province"
            placeholder="Province"
            value={order.province}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="deliveryDate"
            value={order.deliveryDate}
            onChange={handleChange}
          />

        </div>

        <h2>
          Payment Method
        </h2>

        <div className="payment-options">

          <label>

            <input
              type="radio"
              name="paymentMethod"
              value="Cash"
              onChange={handleChange}
            />

            Cash

          </label>

          <label>

            <input
              type="radio"
              name="paymentMethod"
              value="EFT"
              onChange={handleChange}
            />

            EFT

          </label>

          <label>

            <input
              type="radio"
              name="paymentMethod"
              value="Card"
              onChange={handleChange}
            />

            Card

          </label>

        </div>

        <textarea
          name="notes"
          placeholder="Special Instructions..."
          value={order.notes}
          onChange={handleChange}
        />

        <div className="features">

          <div>
            <FaTruck />
            <span>Fast Delivery</span>
          </div>

          <div>
            <FaCalendarAlt />
            <span>Schedule Delivery</span>
          </div>

          <div>
            <FaCreditCard />
            <span>Secure Payments</span>
          </div>

          <div>
            <FaUniversity />
            <span>EFT Supported</span>
          </div>

        </div>

        <button
          type="submit"
          className="submit-btn"
        >
          <FaPaperPlane />
          Submit Order
        </button>

      </form>

    </div>
  );
}
 
export default PlaceOrders; 