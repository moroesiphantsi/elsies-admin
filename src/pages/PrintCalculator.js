import React,{useEffect,useState} from "react";

import "./PrintCalculator.css";

import {
ref,
onValue
} from "firebase/database";

import {database} from "../firebaseConfig";

import {
FaCalculator
} from "react-icons/fa";





function PrintCalculator(){



const [prices,setPrices]=useState([]);



const [selected,setSelected]=useState(null);



const [pages,setPages]=useState(1);











// GET PRICES FROM ADMIN

useEffect(()=>{


const priceRef = ref(
database,
"printPrices"
);



onValue(priceRef,(snapshot)=>{


const data=snapshot.val();



if(data){


const list = Object.entries(data).map(([id,value])=>(

{

id,
...value

}

));



setPrices(list);



}

else{


setPrices([]);


}



});



},[]);











// CALCULATE PRICE

const calculate = () => {

if(!selected) return 0;

const first = Number(selected.firstPage) || 0;

const remaining = Number(selected.remainingPage) || 0;

const totalPages = Math.max(Number(pages),1);

if(totalPages===1){

return first;

}

return first + ((totalPages-1) * remaining);

};









return(



<div className="print-calculator">


<section className="calculator-header">

<h1>
Smart Print Calculator
</h1>

<p>
Calculate printing prices instantly with Elsies Print & Embroidery
</p>

</section>



<div className="calculator-box">



<h1>

<FaCalculator/>

Print Price Calculator

</h1>





<label>

Select Printing Type

</label>



<select

onChange={(e)=>{


const item =
prices.find(

p=>p.name===e.target.value

);


setSelected(item);


}}


>


<option>

Choose Service

</option>



{


prices.map(item=>(


<option

key={item.id}

value={item.name}

>


{item.name}


</option>



))


}



</select>







<label>

Number of Pages

</label>


<input

type="number"

min="1"

value={pages}

onChange={e=>

setPages(e.target.value)

}

/>










<div className="price-result">

<h2>

Estimated Total

</h2>

{
selected &&

<div className="calculation">

<p>

First Page:

<b>

R {Number(selected.firstPage).toFixed(2)}

</b>

</p>

{
Number(pages) > 1 &&

<p>

Remaining Pages ({pages-1}) × R {Number(selected.remainingPage).toFixed(2)}

=

<b>

R {((pages-1) * Number(selected.remainingPage)).toFixed(2)}

</b>

</p>

}

<hr/>

<h3>

Total =

R {calculate().toFixed(2)}

</h3>

</div>

}

<h1>

R {calculate().toFixed(2)}

</h1>

</div>







{

selected && (


<div className="rules">


<h3>

Current Price

</h3>


<p>

First Page:

<b>

R {selected.firstPage}

</b>


</p>



<p>

Other Pages:

<b>

R {selected.remainingPage}

</b>


</p>



</div>


)


}





</div>






</div>


);


}



export default PrintCalculator;
