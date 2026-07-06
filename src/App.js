import React, { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ================= PAGES =================
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import LiveChat from "./pages/LiveChat";
import Services from "./pages/Services";
import PlaceOrders from "./pages/PlaceOrders";
import PrintOut from "./pages/PrintOut";
import PrintCalculator from "./pages/PrintCalculator";


// ================= COMPONENTS =================
import Header from "./components/Header";
import Footer from "./components/Footer";

// AUTH PAGES

import Login from "./pages/Login";
import UserLogin from "./pages/UserLogin";
import ProfileLogin from "./pages/ProfileLogin";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";

// ================= ADMIN =================
import AdminHome from "./AdminDashboard/AdminHome";
import AdminOrders from "./AdminDashboard/AdminOrders";
import AdminServices from "./AdminDashboard/AdminServices";
import AdminRevenue from "./AdminDashboard/AdminRevenue";
import AdminAnalytics from "./AdminDashboard/AdminAnalytics";
import AdminLogin from "./AdminDashboard/AdminLogin";
import AdminPrintOrders from "./AdminDashboard/AdminPrintOrders";
import AdminCalculator from "./AdminDashboard/AdminCalculator";

// ================= FIREBASE =================

import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";


// ================= CSS =================

import "./App.css";









function App() {


const [user,setUser] = useState(null);

const [loading,setLoading] = useState(true);





useEffect(()=>{


const unsubscribe = onAuthStateChanged(

auth,

(currentUser)=>{


setUser(currentUser);

setLoading(false);


}


);


return ()=>unsubscribe();


},[]);









if(loading){


return(


<div className="loading-screen">


<div className="loader">


</div>


<h2>

Loading Elsies Print & Embroidery...

</h2>


</div>


);


}









return(


<Router>



<div className="app">


<Header />





<main className="main-content">


<Routes>





<Route
path="/"
element={<AdminLogin />}
 />





<Route

path="/home"

element={<Home user={user}/>}

/>









{/* ABOUT */}


<Route

path="/about"

element={<About />}

/>


{/* ADMIN */}


<Route

path="/admin-home"

element={<AdminHome />}

/>



<Route

path="/admin-orders"

element={<AdminOrders />}

/>

<Route

path="/admin-analytics"

element={<AdminAnalytics />}

/>

<Route

path="/admin-revenue"

element={<AdminRevenue />}

/>

<Route

path="/admin-services"

element={<AdminServices />}

/>



<Route

path="/place-orders"

element={<PlaceOrders />}

/>


{/* PORTFOLIO */}


<Route

path="/portfolio"

element={<Portfolio />}

/>









{/* CONTACT */}


<Route

path="/contact"

element={<Contact />}

/>




{/* SERVICES */}


<Route

path="/services"

element={<Services />}

/>




{/* LIVE CHAT */}


<Route

path="/live-chat"

element={<LiveChat />}

/>





{/* ORDERS PROTECTED */}



<Route

path="/orders"

element={ <Orders />}


/>








<Route
  path="/print-out"
  element={<PrintOut
 />}
/>


<Route
  path="/admin-print-orders"
  element={<AdminPrintOrders
 />}
/>

<Route
  path="/admin-calculator"
  element={<AdminCalculator
 />}
/>
 
<Route
  path="/print-calculator"
  element={<PrintCalculator
 />}
/>


{/* FALLBACK */}


<Route
path="*"
element={<Navigate to="/admin-login" replace />}
/>




{/* AUTH */}

<Route

path="/login"

element={<Login/>}

/>


<Route

path="/user-login"

element={<UserLogin/>}

/>

<Route

path="/profile-login"

element={<ProfileLogin/>}

/>



<Route

path="/register"

element={<Register/>}

/>




<Route

path="/forgot-password"

element={<ForgotPassword/>}

/>





<Route

path="/profile"

element={<Profile/>}

/>


</Routes>


</main>









<Footer />



</div>



</Router>


);


}


export default App;

