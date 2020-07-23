import React from 'react'
import { formatTime } from 'src/utils/common'

export const examineeListColumns = (history, confirmDeleteExaminee) => [
  {
    title: '序号',
    key: 'index',
    render: (text, record, index) => `${index + 1}`,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '身份证',
    dataIndex: 'cardId',
    key: 'cardId',
  },
  {
    title: '联系方法',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '考试次数',
    dataIndex: 'examCount',
    key: 'examCount',
  },
  {
    title: '最新考级',
    dataIndex: 'latestLevelName',
    key: 'latestLevelName',
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <>
        <span
          className="table-action"
          onClick={() => history.push(`/examinee/${record.id}`)}
        >
          详情
        </span>
      </>
    ),
  },
]

export const examResultsColumns = () => [
  {
    title: '序号',
    key: 'index',
    render: (text, record, index) => `${index + 1}`,
  },
  {
    title: '级别',
    dataIndex: 'levelName',
    key: 'levelName',
  },
  {
    title: '结果',
    dataIndex: 'result',
    key: 'result',
  },
  {
    title: '考试时间',
    dataIndex: 'createTime',
    key: 'createTime',
    render: (text, record) => <span>{formatTime(record.createTime)}</span>,
  },
]
