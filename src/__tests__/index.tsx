/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { render, fireEvent, getByTestId } from '@testing-library/react'
import { useState } from '../../src'

const App: React.FC = () => {
    const state = useState({
        count: 0,
        user: {
            name: '',
            age: 0,
        },
        users: [
            {
                name: 'a',
                age: 1,
            },
            {
                name: 'b',
                age: 2,
            },
        ],
    })

    return (
        <div>
            <div>
                count: <span data-testid='count'>{state.count}</span>
            </div>
            <div>
                <span data-testid='username'>{state.user.name}</span>
                <span data-testid='age'>{state.user.age}</span>
            </div>
            <ul>
                {state.users.map((u, idx) => (
                    <li date-testid={`user-${idx}`} key={`user-${idx}`}>
                        <span date-testid={`user-${idx}-name`}>{u.name}</span>
                        <span date-testid={`user-${idx}-age`}>{u.age}</span>
                    </li>
                ))}
            </ul>
            <div>
                <button onClick={() => state.count++}>increment</button>
                <button onClick={() => state.count--}>decrement</button>
            </div>
            <div>
                <input
                    type='text'
                    data-testid='username-ipt'
                    value={state.user.name}
                    onChange={e => (state.user.name = e.target.value)}
                />
                <input
                    type='number'
                    data-testid='age-ipt'
                    value={state.user.age}
                    onChange={e => (state.user.age = parseInt(e.target.value))}
                />
                <button data-testid='add-user-btn' onClick={() => (state.users = [...state.users, { ...state.user }])}>
                    Add
                </button>
            </div>
            <div>
                {state.users.map((u, i) => (
                    <button data-testid={`user-btn-${i}`} key={`user-btn-${i}`} onClick={() => u.age++}>
                        Increase {u.name}'s age
                    </button>
                ))}
            </div>
        </div>
    )
}

test('renders correctly', () => {
    const { asFragment } = render(<App />)
    expect(asFragment()).toMatchSnapshot()
})

test('increment and decrement', async () => {
    const { asFragment, getByText } = render(<App />)
    const incrBtn = getByText('increment')
    const decrBtn = getByText('decrement')
    fireEvent.click(incrBtn)
    fireEvent.click(incrBtn)
    fireEvent.click(incrBtn)
    expect(asFragment()).toMatchSnapshot()
    fireEvent.click(decrBtn)
    fireEvent.click(decrBtn)
    fireEvent.click(decrBtn)
    expect(asFragment()).toMatchSnapshot()
})

test('change user', async () => {
    const { asFragment, getByTestId } = render(<App />)
    const userNameIpt = getByTestId('username-ipt')
    const ageIpt = getByTestId('age-ipt')
    fireEvent.change(userNameIpt, {
        target: {
            value: 'yetone',
        },
    })
    fireEvent.change(ageIpt, {
        target: {
            value: '21',
        },
    })
    expect(asFragment()).toMatchSnapshot()
})

test('add users', async () => {
    const { asFragment, getByTestId } = render(<App />)
    const userNameIpt = getByTestId('username-ipt')
    const ageIpt = getByTestId('age-ipt')
    const addUserBtn = getByTestId('add-user-btn')
    fireEvent.change(userNameIpt, {
        target: {
            value: 'yetone',
        },
    })
    fireEvent.change(ageIpt, {
        target: {
            value: '21',
        },
    })
    fireEvent.click(addUserBtn)
    fireEvent.change(userNameIpt, {
        target: {
            value: 'yetone1',
        },
    })
    fireEvent.change(ageIpt, {
        target: {
            value: '23',
        },
    })
    fireEvent.click(addUserBtn)
    expect(asFragment()).toMatchSnapshot()
    const userBtn0 = getByTestId('user-btn-0')
    const userBtn1 = getByTestId('user-btn-1')
    const userBtn2 = getByTestId('user-btn-2')
    const userBtn3 = getByTestId('user-btn-3')
    fireEvent.click(userBtn0)
    fireEvent.click(userBtn1)
    fireEvent.click(userBtn1)
    fireEvent.click(userBtn2)
    fireEvent.click(userBtn2)
    fireEvent.click(userBtn2)
    fireEvent.click(userBtn3)
    fireEvent.click(userBtn3)
    fireEvent.click(userBtn3)
    fireEvent.click(userBtn3)
    expect(asFragment()).toMatchSnapshot()
})
