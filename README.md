## rve
React mixed Vue 3.0 API with type safe

### INSTALL

```sh
npm install rve --save
```

### USAGE

```jsx
import React from 'react'
import { value, useState, useEffect, render } from 'rve'

function App() {
  const count = value(0)

  const state = useState({
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

  const incr = () => count.value++

  useEffect(() => {
    document.title = `${state.user.name} clicked ${count.value} times`
  })

  return (
    <div>
      <p>{state.user.name} clicked {state.count} times</p>
      <p>a.b.c.d is {state.a.b.c.d}</p>
      <input type="text" value={state.user.name} onChange={e => state.user.name = e.target.value} />
      <input type="text" value={state.a.b.c.d} onChange={e => state.a.b.c.d = e.target.value} />
      <button onClick={() => state.a.b = {c: {d: 233}}}>Reset a.b</button>
      <button onClick={incr}>Click me</button>
    </div>
  )
}

render(<App />, document.getElementById('app'))
```
