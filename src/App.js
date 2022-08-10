import logo from './logo.svg';
import './App.scss';
import Appbar from './Components/Appbar/Appbar';
import BoardBar from './Components/BoardBar/BoardBar';
import BoardContent from './Components/BoardContent/BoardContent';

function App() {
  return (
    <div className="App">
      <Appbar/>
      <BoardBar/>
      <BoardContent/>
    </div>
  );
}

export default App;
