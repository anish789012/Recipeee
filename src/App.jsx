import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Recipe from './Components/Pages/Recipe'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Recipe/>} />
        {/* <Route path="/model" element={<Modal/>} /> */}
      </Routes>
      {/* <Modal/> */}

      
    </>
  )
}

export default App

