import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from "./components/Navbar/Navbar.jsx";
import SearchAndDisplay from "./components/SearchAndDisplay/SearchAndDisplay.jsx";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <SearchAndDisplay />
      </div>
    </>
  )
}

export default App
