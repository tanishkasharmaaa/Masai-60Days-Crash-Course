import { useEffect, useState } from "react";

export function SubscribingToATimer(){
    let [timer,setTimer]=useState(0)
   let interval;
    function showTimer(){
   interval= setInterval(()=>{
            setTimer(timer++)
        },1000)
    }
   
    useEffect(()=>{
    
     showTimer()

     return()=> clearInterval(interval)
    },[])

return<div>
  <h1>timer:{timer}</h1>  
</div>
}