import { useEffect, useRef } from 'react'

import './App.css'

function ManagingUncontrolledComponents(){
  
let nameRef=useRef(null); 
let studentIdRef=useRef(null);
let batchRef=useRef(null);

let name;
let studentId;
let batch;

function handleSubmit(e){
e.preventDefault();

name=nameRef.current.value;
studentId=studentIdRef.current.value;
batch=batchRef.current.value;
console.log(name,studentId,batch)
}

  return<div style={{border:'solid ' ,padding:'none'}}>
    <h2>ManagingUncontrolledComponents</h2>
  <input type="text" ref={nameRef} placeholder='name'/><br />
  <input type="text" ref={studentIdRef} placeholder='student ID'/><br />
  <input type="text" ref={batchRef} placeholder='batch'/><br />
  <input type="submit" onClick={((e)=>handleSubmit(e))} />
  
  </div>
}

function CreatingAFocusableInputField(){
  let inputRef=useRef(null)

  useEffect(()=>{

  inputRef.current.focus()

  },[])

  return<div style={{border:'solid'}}>
  <h2>Creating A Focusable Input Field</h2>
  <input type="text" ref={inputRef} placeholder='Sample Input'/>
  </div>
}

function InteractinDomElement(){

  let valRef=useRef(null)
 
  function handleSubmit(e){
e.preventDefault()

let bgColor=valRef.current.value;
document.getElementById('display').style.backgroundColor=bgColor

  }

  return<div style={{border:'solid'}}>
  <h2>Interacting With Dom Element</h2>
  <input id='sample' type='color' ref={valRef} placeholder='sample input'/><br />
  <input type="submit" onClick={(e)=>handleSubmit(e)} />
  <div id='display' style={{width:'450px',border:'solid',height:'200px'}}>

  </div>
  </div>
}


function App() {
 
  return (
    <>
<CreatingAFocusableInputField/><br />

    <ManagingUncontrolledComponents/><br />
      
      <InteractinDomElement/>
     
    
    </>
  )
}

export default App
