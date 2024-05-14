import { useEffect, useState } from "react";

export function ScrollComponent(){
    let [scroll,setScroll]=useState('')
    function comp(){
        setScroll('The component is scrolling')
        console.log('scrolled!')
    }
    useEffect(()=>{
    
    window.addEventListener('scroll',comp())
    return ()=>{
        window.removeEventListener('scroll',comp)
    }
    },[])
return<div>
    <h1>{scroll}</h1>
</div>
}