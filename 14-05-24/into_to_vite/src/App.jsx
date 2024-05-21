import { useState } from 'react'

import './App.css'

function App() {
 let[formState,setFormState]=useState({
  name:'',
  batch:'',
  projectName:'',
 isCompleted:false
 })
 let[submitForm,setSubmitForm]=useState([])
function handleChange(e){
let{name,type,checked,value}=e.target;
let newValue=type==='checkbox'?checked:value;
setFormState({...formState,[name]:newValue})
}
function handleSubmit(e){
e.preventDefault()
setSubmitForm([...submitForm,formState])
setFormState({
name:'',
batch:'',
projectName:'',
isCompleted:false})
}

  return (
    <>
      <form action="" onSubmit={(e)=>handleSubmit(e)}>
        <input type="text"  placeholder='name' name='name' value={formState.name} onChange={(e)=>handleChange(e)}/><br />
        <input type="text" placeholder='batch' name='batch' value={formState.batch} onChange={(e)=>handleChange(e)}/><br />
        <input type="text" placeholder='project name' name='projectName' value={formState.projectName} onChange={(e)=>handleChange(e)}/><br />
        <input type="checkbox" name="isCompleted" id=""  checked={formState.isCompleted}  onChange={(e)=>handleChange(e)}/><label htmlFor="">Completed</label><br />
        <input type="submit" />
      </form>
      <div style={{border:'solid'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',width:'400px',color:'burlywood'}}>
          <div>
            <p>Student</p>
          </div>
          <div>
            <p>Batch</p>
          </div>
          <div>
            <p>Project Alloted</p>
          </div>
          <div>
            <p>Status</p>
          </div>
        </div>
        {
          submitForm.map((ele,i)=>(
            <div key={i} style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',width:'400px'}}>
            <div style={{border:'solid', padding:'5px'}}>
              <p>{ele.name}</p>
            </div>
            <div style={{border:'solid' , padding:'5px'}}>
              <p>{ele.batch}</p>
            </div>
            <div style={{border:'solid' , padding:'5px'}}>
              <p>{ele.projectName}</p>
            </div>
            <div style={{border:'solid' , padding:'5px'}}>
              <p>{ele.isCompleted?'project completed':'project incomplete'}</p>
            </div>
            </div>
          ))
        }
      </div>

    </>
  )
}

export default App
