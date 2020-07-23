import React from 'react'
import Search from 'antd/lib/input/Search'

const getEditClass = (record, classInEdit, setClassInEdit, updateClass) => {
  if (classInEdit?.id !== record.id) {
    return (
      <span className="coach-class-edit">
        {record.name}
        <i
          className="fa fa-pencil click"
          aria-hidden="true"
          onClick={() => setClassInEdit(record)}
        ></i>
      </span>
    )
  }
  return (
    <Search
      enterButton="确定"
      defaultValue={classInEdit.name}
      onSearch={(value) => updateClass(record.id, value)}
    />
  )
}

export default getEditClass
