import React, { useState } from 'react'
import Header from './Header'
import { Button } from 'antd'
import './index.less'
import QRCodeModal from './QRCodeModal'
import useFetch from 'src/hooks/useFetch'
import PageList from 'src/components/PageList'
import {
  copyToClipboard,
  getActionRow,
  getCustomRow,
  getDateRow,
  getLinkRow,
  getRow,
  tableOrder,
  confirmUpdate,
  getSwitchRow,
} from 'src/utils/common'
import { ExamStates } from 'src/utils/const'
import CustomTable from 'src/components/CustomTable'
import { pathMockBtn, pathExamList, pathExamEnable } from 'src/utils/httpUtil'

const { useTableFetch } = CustomTable

const ExamList = () => {
  const [canAddMockExam, refetch] = useFetch(pathMockBtn)
  const [selectedExam, setSelectedExam] = useState()
  const examList = useTableFetch(pathExamList)

  const updateExamStatus = (exam) => {
    const { isEnable } = exam
    const entity = {
      status: isEnable ? '禁用' : '启用',
      title: '考试',
      titleValue: exam.title,
      path: pathExamEnable({ id: exam.id, isEnable: !isEnable }),
      callback: () => examList.fetchTable(),
    }
    confirmUpdate(entity)
  }

  return (
    <>
      <PageList
        columns={getColumns(setSelectedExam, updateExamStatus)}
        deleteCallback={refetch}
        defaultTableList={examList}
        size="small"
      >
        <Header
          fetchTable={examList.fetchTable}
          canAddMockExam={canAddMockExam}
        />
      </PageList>
      {selectedExam && (
        <QRCodeModal exam={selectedExam} setSelectedExam={setSelectedExam} />
      )}
    </>
  )
}

export default ExamList

const getColumns = (setSelectedExam, updateExamStatus) => (deleteCoach) => [
  tableOrder,
  getRow('名称', 'title'),
  getExamlinkRow(setSelectedExam),
  getDateRow('考试时间', 'examStartTime'),
  getDateRow('报名时间', 'signStartTime'),
  getCustomRow('当前状态', (record) => ExamStates[record.currState]),
  getSwitchRow(updateExamStatus),
  getCustomRow('考试类型', (record) => (record.isFormal ? '正式' : '模拟')),
  getLinkRow('考生列表', '/exam/::/signs', ['id']),
  getLinkRow('考试分组', '/exam/::/group', ['id']),
  getActionRow(
    (record) => `/exam/${record.id}?isFormal=${record.isFormal}`,
    deleteCoach
  ),
]

const getExamlinkRow = (setSelectedExam) => ({
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
          打开
        </Button>
        <Button
          style={{ marginRight: '5px' }}
          size="small"
          onClick={() => copyToClipboard(link)}
        >
          复制
        </Button>
        <Button size="small" onClick={() => setSelectedExam(record)}>
          二维码
        </Button>
      </span>
    )
  },
})
