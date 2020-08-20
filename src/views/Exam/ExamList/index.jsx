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
  getSwitchRow,
  findExamStatus,
} from 'src/utils/common'
import { pathMockBtn, pathExamList } from 'src/utils/httpUtil'
import useTableFetch from 'src/hooks/useTableFetch'

const ExamList = () => {
  const [canAddMockExam, refetch] = useFetch(pathMockBtn)
  const [selectedExam, setSelectedExam] = useState()
  const examList = useTableFetch(pathExamList)

  return (
    <>
      <PageList
        columns={getColumns(setSelectedExam)}
        deleteCallback={refetch}
        defaultTableList={examList}
        size="small"
        customClass="exam-list"
      >
        <Header
          fetchTable={examList.fetchTable}
          canAddMockExam={canAddMockExam}
          defaultSearch={examList.search}
        />
      </PageList>
      {selectedExam && (
        <QRCodeModal exam={selectedExam} setSelectedExam={setSelectedExam} />
      )}
    </>
  )
}

export default ExamList

const getColumns = (setSelectedExam) => (deleteExam, updateExamStatus) => [
  tableOrder,
  getRow('名称', 'title'),
  getExamlinkRow(setSelectedExam),
  getDateRow('考试时间', 'examStartTime'),
  getDateRow('报名时间', 'signStartTime'),
  getCustomRow('状态', (record) => findExamStatus(record.currState).title),
  getSwitchRow(updateExamStatus, '启用'),
  getCustomRow('类型', (record) => (record.isFormal ? '正式' : '模拟')),
  getLinkRow('考生', '/exam/::/signs', ['id']),
  getLinkRow('分组', '/exam/::/group', ['id']),
  getLinkRow('考场', '/exam/::/round-room', ['id']),
  getLinkRow('考官', '/exam/::/room-examiner', ['id']),
  getActionRow(
    (record) => `/exam/${record.id}?isFormal=${record.isFormal}`,
    deleteExam
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
