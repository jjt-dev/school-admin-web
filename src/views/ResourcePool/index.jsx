import './index.less'

import { Avatar, Divider } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import PageList from 'src/components/PageList'
import useFetch from 'src/hooks/useFetch'
import {
  findSignStatus,
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
    />
  )
}

export default ResourcePool

const getColumns = (examId) => (deleteSign) => [
  tableOrder,
  getRow('姓名', 'name'),
  getRow('身份证号', 'cardId'),
  getCustomRow('头像', (record) => (
    <Avatar size={45} src={`${getDomain()}${record.faceUrl}`} />
  )),
  getDateRow('报名时间', 'signTime'),
  getCustomRow('当前状态', (record) => findSignStatus(record.currState).title),
  getRow('联系电话', 'phone'),
  {
    title: '操作',
    render: (text, record) => (
      <>
        <Link to={`/exam/${examId}/sign/${record.signId}`}>编辑</Link>
        <Divider type="vertical" />
        <Link to={`/exam/${examId}/sign/${record.signId}/detail`}>详情</Link>
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
