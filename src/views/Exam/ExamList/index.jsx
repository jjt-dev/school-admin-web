import './index.less'

import { Button } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PageList from 'src/components/PageList'
import useFetch from 'src/hooks/useFetch'
import useTableFetch from 'src/hooks/useTableFetch'
import {
  copyToClipboard,
  findExamStatus,
  getActionRow,
  getCustomRow,
  getDateRow,
  getLinkRow,
  getRow,
  getSwitchRow,
  tableOrder,
} from 'src/utils/common'
import { pathExamList, pathMockBtn } from 'src/utils/httpUtil'

import Header from './Header'
import QRCodeModal from './QRCodeModal'

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
  getExamLinkRow(setSelectedExam),
  getDateRow('考试时间', 'examStartTime'),
  getDateRow('报名时间', 'signStartTime'),
  getCustomRow('状态', (record) => findExamStatus(record.currState).title),
  getSwitchRow(updateExamStatus, '启用'),
  getCustomRow('类型', (record) => (record.isFormal ? '正式' : '模拟')),
  getCustomRow('考生', (record) => (
    <Link to={`/exam/${record.id}/signs?key=signs&comp=ExamSignList`}>
      查看
    </Link>
  )),
  getCustomRow('分组', (record) => (
    <Link to={`/exam/${record.id}/group?key=group&comp=ExamGroup`}>查看</Link>
  )),
  getCustomRow('考场', (record) => (
    <Link to={`/exam/${record.id}/round-room?key=round-room&comp=RoundAndRoom`}>
      查看
    </Link>
  )),
  getCustomRow('考官', (record) => (
    <Link
      to={`/exam/${record.id}/room-examiner?key=room-examiner&comp=RoomAndExaminerList`}
    >
      查看
    </Link>
  )),
  getLinkRow('待考列表', '/exam/::/resource-pool', ['id']),
  getActionRow(
    (record) =>
      `/exam/${record.id}/exam?isFormal=${record.isFormal}&key=exam&comp=Exam`,
    deleteExam
  ),
]

const getExamLinkRow = (setSelectedExam) => ({
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
