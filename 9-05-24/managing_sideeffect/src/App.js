import logo from './logo.svg';
import './App.css';
import { SubscribingToATimer } from './components/SubscribingToATimer';
import { ScrollComponent } from './components/SubscribingToADocumentEvent';

function App() {
  return (
    <div className="App">
     <SubscribingToATimer/>
     <ScrollComponent/>
    </div>
  );
}

export default App;
