import logo from './logo.svg';
import './App.scss';
import Appbar from './Components/Appbar/Appbar';
import BroadBar from './Components/BroadBar/BroadBar';
import BroadContent from './Components/BroadContent/BroadContent';

function App() {
  return (
    <div className="App">
      <Appbar/>
      <BroadBar/>
      <BroadContent/>
    </div>
  );
}

export default App;
