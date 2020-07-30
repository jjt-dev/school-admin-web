import React from 'react'
import { formatTime, getDomain, findSignStateId } from 'src/utils/common'
import { SignStates, dateFormat } from 'src/utils/const'
import { Divider, message, Avatar } from 'antd'
import api from 'src/utils/api'

export const examSignListColumns = (
  examId,
  history,
  confirmDeleteSign,
  confirmPaySignExam
) => [
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
    title: '身份证号',
    dataIndex: 'cardId',
    key: 'cardId',
  },
  {
    title: '头像',
    dataIndex: 'faceUrl',
    key: 'faceUrl',
    render: (text, record) => (
      <span>
        <Avatar size={45} src={`${getDomain()}${record.faceUrl}`} />
      </span>
    ),
  },
  {
    title: '报名时间',
    dataIndex: 'signTime',
    key: 'signTime',
    render: (text, record) => <span>{formatTime(record.signTime)}</span>,
  },
  {
    title: '当前状态',
    dataIndex: 'currState',
    key: 'currState',
    render: (text, record) => <span>{SignStates[record.currState]}</span>,
  },
  {
    title: '联系电话',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '操作',
    render: (text, record) => (
      <>
        <span
          className="table-action"
          onClick={() => history.push(`/exam/${examId}/sign/${record.signId}`)}
        >
          编辑
        </span>
        <Divider type="vertical" />
        <span
          className="table-action"
          onClick={() =>
            history.push(`/exam/${examId}/sign/${record.signId}/detail`)
          }
        >
          详情
        </span>
        <Divider type="vertical" />
        {record.currState === findSignStateId('待付款') && (
          <>
            <span
              className="table-action"
              onClick={() => confirmPaySignExam(record)}
            >
              支付考试报名
            </span>
            <Divider type="vertical" />
          </>
        )}
        <span
          className="table-action"
          onClick={() => {
            confirmDeleteSign(record)
          }}
        >
          删除
        </span>
      </>
    ),
  },
]

export const getExamItemValue = (exam, item) => {
  if (!exam) return 0
  const itemInExam = exam.itemes.find((i) => i.examItemId === item.id)
  if (!itemInExam) return 0
  return itemInExam.ratio * 100
}

export const updateExamSign = async (history, examId, values) => {
  let currState = 0
  if (values.isPayed) {
    currState = 10
  }

  await api.post(
    `/exam/sign/signOffLine?examinationId=${examId}&address=${
      values.address
    }&birthday=${values.birthday.format(dateFormat)}&cardId=${
      values.cardId
    }&coachId=${values.coachId}&currLevelId=${
      values.currLevelId
    }&currState=${currState}&faceUrl=${values.faceUrl}&gender=${
      values.gender
    }&levels=${values.levels.join(',')}&name=${values.name}&note=${
      values.note
    }&parentName=${values.parentName}&phone=${values.phone}&relationship=${
      values.relationship
    }&coachClassId=${values.coachClassId}`
  )
  message.success(`报名成功`)
  history.push(`/exam/${examId}/signs`)
}
