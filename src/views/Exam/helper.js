import React from 'react'
import { formatTime, copyToClipboard } from 'src/utils/common'
import { timeFormat } from 'src/utils/const'
import { ExamStates } from 'src/utils/const'
import { Divider, message, Button } from 'antd'
import api from 'src/utils/api'

export const examListColumns = (
  history,
  confirmDeleteCoach,
  setSelectedExam
) => [
  {
    title: '序号',
    key: 'index',
    render: (text, record, index) => `${index + 1}`,
  },
  {
    title: '名称',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '考试链接',
    dataIndex: 'hashCode',
    key: 'hashCode',
    render: (text, record) => {
      const link = `${process.env.REACT_APP_EXAMINER_URL}${record.hashCode}`
      return (
        <span>
          <Button
            style={{ marginRight: '5px' }}
            size="small"
            onClick={() => window.open(link, '_blank')}
          >
            打开链接
          </Button>
          <Button
            style={{ marginRight: '5px' }}
            size="small"
            onClick={() => copyToClipboard(link)}
          >
            复制链接
          </Button>
          <Button size="small" onClick={() => setSelectedExam(record)}>
            二维码
          </Button>
        </span>
      )
    },
  },
  {
    title: '考试时间',
    render: (text, record) => <span>{formatTime(record.examStartTime)}</span>,
  },
  {
    title: '报名时间',
    render: (text, record) => <span>{formatTime(record.signStartTime)}</span>,
  },
  {
    title: '当前状态',
    render: (text, record) => <span>{ExamStates[record.currState]}</span>,
  },
  {
    title: '是否启用',
    render: (text, record) => <span>{record.isEnable ? '是' : '否'}</span>,
  },
  {
    title: '考试类型',
    render: (text, record) => <span>{record.isFormal ? '正式' : '模拟'}</span>,
  },
  {
    title: '考生列表',
    render: (text, record) => (
      <span
        className="table-action"
        onClick={() => history.push(`/exam/${record.id}/signs`)}
      >
        查看
      </span>
    ),
  },
  {
    title: '考试分组',
    render: (text, record) => (
      <span
        className="table-action"
        onClick={() => history.push(`/exam/${record.id}/group`)}
      >
        查看
      </span>
    ),
  },
  {
    title: '操作',
    render: (text, record) => (
      <>
        <span
          className="table-action"
          onClick={() =>
            history.push(`/exam/${record.id}?isFormal=${record.isFormal}`)
          }
        >
          编辑
        </span>
        <Divider type="vertical" />
        <span
          className="table-action"
          onClick={() => {
            confirmDeleteCoach(record)
          }}
        >
          删除
        </span>
      </>
    ),
  },
]

export const updateExam = async (
  history,
  status,
  id,
  values,
  checkedLevels
) => {
  const {
    title,
    examTime,
    signTime,
    note,
    address,
    isEnable,
    isFormal,
  } = values
  const examStartTime = examTime[0].format(timeFormat)
  const examEndTime = examTime[1].format(timeFormat)
  const signStartTime = signTime[0].format(timeFormat)
  const signEndTime = signTime[1].format(timeFormat)

  const levelItems = {}
  checkedLevels.forEach((level) => {
    const { id: levelId, items } = level
    const temp = Object.keys(items).map((itemId) => ({
      examItemId: itemId,
      ratio: items[itemId] / 100,
    }))
    levelItems[levelId] = temp
  })

  const levelsCanSign = checkedLevels.map((level) => level.id).join(',')

  const postData = {
    id,
    address,
    examStartTime,
    examEndTime,
    levelItems,
    levelsCanSign,
    note,
    signStartTime,
    signEndTime,
    title,
    isEnable,
    isFormal,
  }

  await api.post(`/examination/edit`, postData)
  message.success(`${status}考试成功`)
  history.push('/exams')
}

export const getExamItemValue = (exam, item) => {
  if (!exam) return 0
  const itemInExam = exam.itemes.find((i) => i.examItemId === item.id)
  if (!itemInExam) return 0
  return itemInExam.ratio * 100
}
