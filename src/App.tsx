import { useState } from 'react'
import './App.css'
import Home from './component/pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className=' text-white'>
    <Home/>
    </div>
  )
}

export default App
