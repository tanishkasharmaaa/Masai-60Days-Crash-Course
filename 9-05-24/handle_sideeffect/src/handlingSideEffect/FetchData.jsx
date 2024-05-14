import { useEffect, useState } from "react";

export function FetchData(){
let[data,setData]=useState([]);
let [loading,setLoading]=useState(false);
let [err,setErr]=useState(false)
 async function fetching(){
    setLoading(true)
       try {
        let res= await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10`);
        let data=await res.json();
        setData(data)
        setLoading(false)
        
    } catch (error) {
        setErr(true)
        setLoading(false)
        console.log(error)
        
    }  
    }

useEffect(()=>{
  fetching()
  
},[])
if(loading){
    return <h1>Loading...</h1>
}
if(err===true){
return <h1>Something went wrong</h1>
}
return(<>
<h1>Fetching Data from an API</h1>
    <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gridGap:'10px'}}>
    
{
    data.length>0?(data.map((ele,i)=>(
        <div style={{border:'solid black'}} key={i}>
            
            <p><span style={{color:'blue'}}><b>Title:</b></span>{ele.title}</p>
            <p> <span style={{color:'blue'}}><b>Body:</b></span>{ele.body}</p>
        </div>
    ))):(<>
        <h1>No Data is present here</h1>
    </>)
}
    </div></>
)
}
