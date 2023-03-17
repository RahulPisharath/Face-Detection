import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Facedetection from './components/Facedetection';

function App() {
  return (
    <>
      <Header/>
      <div className='flex-wrapper'>
         <Facedetection/>
      </div>
    </>
  );
}

export default App;
