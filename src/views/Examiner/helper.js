import React from 'react'
import { formatTime } from 'src/utils/common'
import { Divider } from 'antd'

export const coachListColumns = (history, confirmDeleteExaminer) => [
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
    title: '电话',
    dataIndex: 'phone',
    key: 'phone',
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
        <span
          className="table-action"
          onClick={() => history.push(`/examiner/${record.id}`)}
        >
          编辑
        </span>
        <Divider type="vertical" />
        <span
          className="table-action"
          onClick={() => {
            confirmDeleteExaminer(record)
          }}
        >
          删除
        </span>
      </>
    ),
  },
]
