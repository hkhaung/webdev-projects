import { Routes, Route } from 'react-router-dom';
import './App.css'
import SearchAndDisplay from "./components/SearchAndDisplay/SearchAndDisplay.jsx";
import Cart from "./components/Cart/Cart.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SearchAndDisplay />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  )
}

export default App
