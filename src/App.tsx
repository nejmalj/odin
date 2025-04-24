import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Par Odin</h1>
      <div className="interface">
        <button onClick={() => setCount((count) => count + 1)}>
          Throw dices {count}
        </button>
          <div className="dices"></div>
        <p>
          Par Odin is a simple game where you throw dices and try to find the right combinations.
        </p>
      </div>
    </>
  )
}

export default App
