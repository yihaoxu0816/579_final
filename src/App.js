import logo from './logo.svg';
import './App.css';
import MainScreen from './components/MainScreen';

const Comp = () => {
  return <p>This is a comp component</p>
}

function App() {
  return (
    <div className="App" id='root'>

      <MainScreen></MainScreen>
    </div>
  );
}

export default App;
