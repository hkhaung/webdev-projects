import {Routes, Route, BrowserRouter} from 'react-router-dom';
import './App.css'
import SearchAndDisplay from "./components/SearchAndDisplay/SearchAndDisplay.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<SearchAndDisplay />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
