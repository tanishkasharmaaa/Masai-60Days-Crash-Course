import logo from './logo.svg';
import {useState} from 'react'
import './App.css';
function Counter({count,setCount}){
  
  function increment(){
setCount((prev)=>prev+1)
  }
  function decrement(){
    setCount((prev)=>prev-1)
  }
  function reset(){
    setCount(0)
  }
  return<div>
    <h1>Counter {count}</h1>
    <button onClick={increment}>Increment by 1</button>
    <button onClick={decrement}>Decrement by 1</button>
    <button onClick={reset}>Reset by 0</button>

  </div>
}
function App() {
  let [count,setCount]=useState(0)
  return (
    <div className="App">
   <Counter count={count} setCount={setCount}/>

    </div>
  );
}

export default App;
