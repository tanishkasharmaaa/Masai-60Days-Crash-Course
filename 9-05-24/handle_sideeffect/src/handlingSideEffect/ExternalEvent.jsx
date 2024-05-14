import { useEffect,useState } from "react";

export function ExternalEvent(){
let[moveMouse,setMouseMove]=useState({x:0,y:0});

useEffect(()=>{
   function handleMouseMove(event){
    setMouseMove({x:event.clientX,y:event.clientY});
  
}
window.addEventListener('mousemove',handleMouseMove);
return ()=>{
    window.removeEventListener('mousemove',handleMouseMove)
}
},[])
return<div>
    <div><h1>Subscribing to External Events:</h1></div>
    <div>
        <h2>Mouse Postioning:</h2>
        <p style={{fontSize:'30px'}}>X: {moveMouse.x} , Y: {moveMouse.y}</p>
    </div>
</div>
}