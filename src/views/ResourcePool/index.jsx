import './index.less'

import { Avatar, Divider } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import PageList from 'src/components/PageList'
import useFetch from 'src/hooks/useFetch'
import {
  findResPoolSource,
  findResPoolStatus,
  getCustomRow,
  getDateRow,
  getDomain,
  getRow,
  tableOrder,
} from 'src/utils/common'
import { pathExam } from 'src/utils/httpUtil'

const ResourcePool = ({ match }) => {
  const examId = match.params.id
  const [exam = {}] = useFetch(pathExam(examId))

  return (
    <PageList
      showAdd={false}
      columns={getColumns(examId)}
      title={`${exam.title}资源池`}
      defaultSearch={{ examId }}
      path="/exam/sign/examMakeUpPage"
      size="small"
    />
  )
}

export default ResourcePool

const getColumns = (examId) => (deleteSign) => [
  tableOrder,
  getRow('姓名', 'studentName'),
  getRow('身份证号', 'cardId'),
  getCustomRow('头像', (record) => (
    <Avatar size={45} src={`${getDomain()}${record.faceUrl}`} />
  )),
  getDateRow('报名时间', 'createTime'),
  getCustomRow(
    '当前状态',
    (record) => findResPoolStatus(record.currState).title
  ),
  getCustomRow(
    '来源方式',
    (record) => findResPoolSource(record.createWay).title
  ),
  {
    title: '操作',
    render: (text, record) => (
      <>
        <Link to={`/exam/${examId}/resource-pool-sign/${record.signId}`}>
          编辑
        </Link>
        <Divider type="vertical" />
        <Link to={`/exam/${examId}/resource-pool-sign/${record.signId}/detail`}>
          详情
        </Link>
        <Divider type="vertical" />
        <span
          className="table-action"
          onClick={() => {
            deleteSign(record)
          }}
        >
          删除
        </span>
      </>
    ),
  },
]
