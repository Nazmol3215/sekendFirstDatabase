import { useState } from 'react'
import './App.css'
import OrderComponent from './OrderComponent/OrderComponent'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      hey

      <OrderComponent/>
    </>
  )
}

export default App
