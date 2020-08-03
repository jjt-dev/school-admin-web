import React, { useState } from 'react'
import Header from './Header'
import { Modal } from 'antd'
import './index.less'
import { examListColumns } from '../helper'
import { useHistory } from 'react-router'
import QRCodeModal from './QRCodeModal'
import useFetch from 'src/hooks/useFetch'
import CustomTable from 'src/components/CustomTable'

const { useTableFetch } = CustomTable

const ExamList = () => {
  const history = useHistory()
  const [canAddMockExam, refetch] = useFetch(`/examination/canShowMockBtn`)
  const [selectedExam, setSelectedExam] = useState()
  const examList = useTableFetch(`/examination/page`)

  // const confirmDeleteExam = (exam) => {
  //   confirm({
  //     title: '请问您确认要删除该考试吗?',
  //     content: `考试名: ${exam.title}`,
  //     onOk: async () => {
  //       await api.post(`/examination/del?id=${exam.id}`)
  //       message.success('删除考试成功')
  //       dispatch(examAction.getExamList(filter))
  //       refetch()
  //     },
  //     onCancel() {
  //       console.log('Cancel')
  //     },
  //   })
  // }

  return (
    <div className="page exam-list">
      <div className="exam-list__title">考试列表</div>
      <Header
        fetchTable={examList.fetchTable}
        canAddMockExam={canAddMockExam}
      />
      <CustomTable
        columns={examListColumns(history, confirmDeleteExam, setSelectedExam)}
        dataSource={examList}
      />
      {selectedExam && (
        <QRCodeModal exam={selectedExam} setSelectedExam={setSelectedExam} />
      )}
    </div>
  )
}

export default ExamList
