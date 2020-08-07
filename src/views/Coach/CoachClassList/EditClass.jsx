import React from 'react'
import Search from 'antd/lib/input/Search'
import { EditOutlined } from '@ant-design/icons'

const getEditClass = (record, classInEdit, setClassInEdit, updateClass) => {
  if (classInEdit?.id !== record.id) {
    return (
      <span className="coach-class-edit">
        {record.name}
        <EditOutlined onClick={() => setClassInEdit(record)} />
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
