import React from 'react'
import renderer from 'react-test-renderer'
import BackBtn from '..'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

const mockHistoryPush = jest.fn()

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

it('renders correctly back button', () => {
  const tree = renderer.create(<BackBtn />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('test the correct text is rendered', () => {
  render(<BackBtn />)
  // .toBeInTheDocument() is an assertion that comes from jest-dom
  // otherwise you could use .toBeDefined()
  expect(screen.getByText('返 回')).toBeInTheDocument()
})
