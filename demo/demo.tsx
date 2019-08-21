import React from 'react'
import { value, useState, useEffect, render } from 'rve'

interface IUser {
  name: string
  age: number
}

function App() {
  const state = useState({
    user: {
      name: 'yetone',
      age: 0,
    } as IUser,
    users: [
      {
        name: 'a',
        age: 0,
      },
      {
        name: 'b',
        age: 1,
      },
    ] as IUser[],
    a: {
      b: {
        c: {
          d: 0,
        },
      },
    },
  })

  const count = value(0)

  const incr = () => count.value++

  useEffect(() => {
    document.title = `${state.user.name} clicked ${count.value} times`
  })

  return (
    <div>
      <p>{state.user.age}-year-old {state.user.name} clicked {count.value} times</p>
      <p>a.b.c.d is {state.a.b.c.d}</p>
      <p>a.b is {JSON.stringify(state.a.b)}</p>
      <ul>
        {
          state.users.map((u, i) => <li key={`user-${i}`}>{u.name} is {u.age} years old</li>)
        }
      </ul>
      <div style={{marginTop: 20}}>
        <p>
          name: <input type='text' value={state.user.name} onChange={e => state.user.name = e.target.value} />
        </p>
        <p>
          age: <input type='number' value={state.user.age} onChange={e => state.user.age = parseInt(e.target.value, 10)} />
        </p>
        <p>
          <button onClick={() => state.users = [...state.users, {...state.user}]}>Add user</button>
        </p>
      </div>
      <div style={{marginTop: 20}}>
        <button onClick={incr}>Click me</button>
      </div>
      <div style={{marginTop: 20}}>
        a.b.c.d: <input type='number' value={state.a.b.c.d} onChange={e => state.a.b.c.d = parseInt(e.target.value, 10)} />
      </div>
      <div style={{marginTop: 20}}>
        <button onClick={() => state.a.b = { c: { d: 233 } }}>Reset a.b</button>
      </div>
      <div style={{marginTop: 20}}>
        {
          state.users.map((u, i) => <button key={`user-btn-${i}`} onClick={() => u.age++}>Increase {u.name}'s age</button>)
        }
      </div>
    </div>
  )
}

render(<App />, document.getElementById('app'))
