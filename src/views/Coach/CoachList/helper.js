import { Divider } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { formatTime } from 'src/utils/common'

export const getColumns = (deleteCoach) => [
  {
    title: '序号',
    key: 'index',
    render: (text, record, index) => `${index + 1}`,
  },
  {
    title: '姓名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    key: 'nickname',
  },
  {
    title: '电话',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '所带班级',
    render: (text, record) => {
      return (
        <Link to={`/coach/${record.id}/classes?coachName=${record.username}`}>
          查看班级
        </Link>
      )
    },
  },
  {
    title: '已启用',
    dataIndex: 'isEnable',
    key: 'isEnable',
    render: (text, record) => <span>{record.isEnable ? '是' : '否'}</span>,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    render: (text, record) => <span>{formatTime(record.createTime)}</span>,
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <>
        <Link to={`/coach/${record.id}`}>编辑</Link>
        <Divider type="vertical" />
        <span
          className="table-action"
          onClick={() => {
            deleteCoach(record)
          }}
        >
          删除
        </span>
      </>
    ),
  },
]
