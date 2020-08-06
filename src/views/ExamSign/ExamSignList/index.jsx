import React from 'react'
import { useSelector } from 'react-redux'
import Header from './Header'
import { Modal, message, Avatar, Divider } from 'antd'
import './index.less'
import api from 'src/utils/api'
import useFetch from 'src/hooks/useFetch'
import { local, TOKEN } from 'src/utils/storage'
import CustomTable from 'src/components/CustomTable'
import {
  tableOrder,
  getRow,
  getCustomRow,
  getDomain,
  getDateRow,
} from 'src/utils/common'
import { SignStates } from 'src/utils/const'
import { Link } from 'react-router-dom'
import PageListCustom from 'src/components/PageListCustom'

const { confirm } = Modal
const { useTableFetch } = CustomTable

const ExamSignList = ({ match, history }) => {
  const examId = match.params.id
  const { allCoaches } = useSelector((state) => state.app)
  const [exam] = useFetch(`/examination/item?id=${examId}`, {})
  const signTableList = useTableFetch('/exam/sign/signPage', {
    examinationId: examId,
  })
  const { search, fetchTable } = signTableList

  const handleSign = () => {
    history.push(`/exam/${examId}/sign`)
  }

  const printExamCertifs = () => {
    let path = `/exam/${examId}/print-batch/exam-certif?`
    if (!!search.coachId) {
      path += `coachId=${search.coachId}`
    }
    if (!!search.coachClassId) {
      path += `&coachClassId=${search.coachClassId}`
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
        fetchTable()
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
    <PageListCustom title="报考列表">
      <Header
        examSignList={signTableList.dataSource}
        fetchTable={fetchTable}
        handleSign={handleSign}
        examState={exam.currState}
        allCoaches={allCoaches}
        printExamCertifs={printExamCertifs}
        downloadExamineeInfo={downloadExamineeInfo}
      />
      <CustomTable
        {...signTableList}
        columns={getColumns(examId, confirmDeleteExamSign)}
        rowKey="signId"
      />
    </PageListCustom>
  )
}

export default ExamSignList

const getColumns = (examId, deleteSign) => [
  tableOrder,
  getRow('姓名', 'name'),
  getRow('身份证号', 'cardId'),
  getCustomRow('头像', (record) => (
    <Avatar size={45} src={`${getDomain()}${record.faceUrl}`} />
  )),
  getDateRow('报名时间', 'signTime'),
  getCustomRow('当前状态', (record) => SignStates[record.currState]),
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
