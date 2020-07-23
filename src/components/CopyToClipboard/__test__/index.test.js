import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import CopyToClipboard from '..'
import * as common from 'src/utils/common'

test('calls the copy to clipboard callback handler', () => {
  const spy = jest.spyOn(common, 'copyToClipboard')
  render(<CopyToClipboard value=""></CopyToClipboard>)
  userEvent.click(screen.getByRole('button'))
  expect(spy).toHaveBeenCalledTimes(1)
})
