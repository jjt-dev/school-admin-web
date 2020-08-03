import React from 'react'
import { useSelector } from 'react-redux'
import ActionBar from './ActionBar'
import { Modal, Table, message } from 'antd'
import './index.less'
import { examSignListColumns } from '../helper'
import api from 'src/utils/api'
import useListSearch from 'src/hooks/useListSearch'
import useFetch from 'src/hooks/useFetch'
import { local, TOKEN } from 'src/utils/storage'

const { confirm } = Modal

const ExamSignList = ({ match, history }) => {
  const examId = match.params.id
  const { allCoaches } = useSelector((state) => state.app)
  const [exam] = useFetch(`/examination/item?id=${examId}`, {})
  const {
    data: examSignList,
    refetchList: fetchSignList,
    pagination,
    filter,
  } = useListSearch('/exam/sign/signPage', { examinationId: examId })

  const handleSign = () => {
    history.push(`/exam/${examId}/sign`)
  }

  const printExamCertifs = () => {
    let path = `/exam/${examId}/print-batch/exam-certif?`
    if (!!filter.coachId) {
      path += `coachId=${filter.coachId}`
    }
    if (!!filter.coachClassId) {
      path += `&coachClassId=${filter.coachClassId}`
    }
    history.push(path)
  }

  const confirmDeleteExamSign = (examSign) => {
    confirm({
      title: '请问您确认要删除该报名吗?',
      content: `考生名: ${examSign.name}`,
      onOk: async () => {
        await api.post(`/exam/sign/delSign?signId=${examSign.signId}`)
        message.success('报名删除成功')
        fetchSignList()
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  const confirmPaySignExam = (sign) => {
    confirm({
      title: '请问您确认要支付该报名吗?',
      content: `考生名: ${sign.name}`,
      onOk: async () => {
        await api.post(`/exam/sign/payOffline?signId=${sign.signId}`)
        message.success('支付考试报名成功')
        fetchSignList()
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  const downloadExamineeInfo = () => {
    window.open(
      `${
        process.env.REACT_APP_API_ROOT
      }/statistics/getSomeExamAllResults?examinationId=${examId}&token=${encodeURIComponent(
        local.getItem(TOKEN)
      )}`,
      '_blank'
    )
  }

  return (
    <div className="page sign-list">
      <ActionBar
        examSignList={examSignList}
        fetchSignList={fetchSignList}
        handleSign={handleSign}
        examState={exam.currState}
        allCoaches={allCoaches}
        printExamCertifs={printExamCertifs}
        downloadExamineeInfo={downloadExamineeInfo}
      />
      <Table
        className="sign-list__table"
        columns={examSignListColumns(
          examId,
          history,
          confirmDeleteExamSign,
          confirmPaySignExam
        )}
        dataSource={examSignList}
        rowKey="signId"
        size="middle"
        bordered={true}
        pagination={pagination}
        onChange={(value) => fetchSignList({ paginator: value })}
      />
    </div>
  )
}

export default ExamSignList
