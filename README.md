## rue
React mixed Vue


### TL;DR

```jsx
import React from 'react'
import { useState, useEffect, render } from 'rue'

function App() {
  const state = useState({
    count: 0,
    user: {
      name: 'yetone',
    },
    a: {
      b: {
        c: {
          d: 0,
        }
      }
    }
  })

  const inc = () => state.count++

  useEffect(() => {
    document.title = `${state.user.name} clicked ${state.count} times`
  })

  return (
    <div>
      <p>{state.user.name} clicked {state.count} times</p>
      <p>a.b.c.d is {state.a.b.c.d}</p>
      <input type="text" value={state.user.name} onChange={e => state.user.name = e.target.value} />
      <input type="text" value={state.a.b.c.d} onChange={e => state.a.b.c.d = e.target.value} />
      <button onClick={() => state.a.b = {c: {d: 233}}}>Reset a.b</button>
      <button onClick={inc}>Click me</button>
    </div>
  )
}

render(<App />, document.getElementById('app'))
```
