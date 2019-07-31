import React from 'react'
import { useState, useEffect, render } from 'rue'

function App() {
  const state = useState({
    count: 0
  })

  const inc = () => state.count++

  useEffect(() => {
    document.title = `You clicked ${state.count} times`
  })

  return (
    <div>
      <p>You clicked {state.count} times</p>
      <button onClick={inc}>
        Click me
      </button>
    </div>
  )
}

render(<App />, document.getElementById('app'))
