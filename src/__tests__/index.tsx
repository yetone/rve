import React from 'react'
import { render, fireEvent, getByTestId } from '@testing-library/react'
import { useState } from '../../src'

const App: React.FC = () => {
    const state = useState({ count: 0 })
    return (
        <div>
            <div>
                count: <span data-testid='count'>{state.count}</span>
            </div>
            <button onClick={() => state.count++}>increment</button>
            <button onClick={() => state.count--}>decrement</button>
        </div>
    )
}

test('render App', async () => {
    const { container, getByText } = render(<App />)
    const countValue = getByTestId(container, 'count')
    const increment = getByText('increment')
    const decrement = getByText('decrement')
    expect(countValue.textContent).toBe('0')
    fireEvent.click(increment)
    expect(countValue.textContent).toBe('1')
    fireEvent.click(decrement)
    expect(countValue.textContent).toBe('0')
})
