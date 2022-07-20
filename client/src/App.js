
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';

function App(props) {
  return (
    <div className="App">
      <Header/>
      {props.children}
      <Footer/>
    </div>
  );
}

export default App;
