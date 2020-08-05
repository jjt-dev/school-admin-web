import { Button } from 'antd'
import React from 'react'
import { useHistory } from 'react-router'

const LinkBtn = ({ path, children, ...rest }) => {
  const history = useHistory()

  return (
    <Button onClick={() => history.push(path)} {...rest}>
      {children}
    </Button>
  )
}

export default LinkBtn
