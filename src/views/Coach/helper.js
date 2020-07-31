import React from 'react'
import { Button } from 'antd'
import getEditClass from './CoachClassList/EditClass'

export const classListColumns = (
  history,
  confirmDeleteClass,
  classInEdit,
  setClassInEdit,
  updateClass,
  setSelectedClass
) => [
  {
    title: '序号',
    key: 'index',
    render: (text, record, index) => `${index + 1}`,
  },
  {
    title: '班级名称',
    dataIndex: 'name',
    width: classInEdit ? '250px' : '150px',
    render: (text, record) =>
      getEditClass(record, classInEdit, setClassInEdit, updateClass),
  },
  {
    title: '班级学生',
    render: (text, record) => {
      return (
        <span>
          <Button size="small" onClick={() => setSelectedClass(record)}>
            查看班级学生
          </Button>
        </span>
      )
    },
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span
        className="table-action"
        onClick={() => {
          confirmDeleteClass(record)
        }}
      >
        删除
      </span>
    ),
  },
]
