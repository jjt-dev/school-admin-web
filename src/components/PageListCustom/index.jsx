import React from 'react'

const PageListCustom = ({ title, customClass, children }) => {
  return (
    <div className={`page page-list ${customClass}`}>
      <div className="page-list__title">{title}</div>
      {children}
    </div>
  )
}

export default PageListCustom
