import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import CartDetails from './components/CartDetails';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<CartDetails />} />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
