import React from 'react'

const ListHeaderCustom = ({ customClass, children }) => {
  return <div className={`list-header ${customClass ?? ''}`}>{children}</div>
}

export default ListHeaderCustom
