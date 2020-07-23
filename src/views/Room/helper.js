import React from 'react'
import { Divider } from 'antd'

export const roomListColumns = (history, confirmDeleteRoom) => [
  {
    title: '序号',
    key: 'index',
    render: (text, record, index) => `${index + 1}`,
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '地点',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <>
        <span
          className="table-action"
          onClick={() => history.push(`/room/${record.id}`)}
        >
          编辑
        </span>
        <Divider type="vertical" />
        <span
          className="table-action"
          onClick={() => {
            confirmDeleteRoom(record)
          }}
        >
          删除
        </span>
      </>
    ),
  },
]
