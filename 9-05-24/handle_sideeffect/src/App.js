import logo from './logo.svg';
import { FetchData } from './handlingSideEffect/FetchData';
import './App.css';
import { ExternalEvent } from './handlingSideEffect/ExternalEvent';
import { UpdateTitle } from './handlingSideEffect/UpdateTitle';

function App() {
  return (
    <div className="App">

     <FetchData/>
     <ExternalEvent/>
     <UpdateTitle/>
    </div>
  );
}

export default App;
