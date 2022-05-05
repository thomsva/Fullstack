import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Todo from './Todo'

test('renders the text of a todo', () => {

  const todo = {
    text: 'Turn off the lights',
    done: false
  }

  render(<Todo todo={todo} />)

  const element = screen.getByText('Turn off the lights')
  expect(element).toBeDefined()
})