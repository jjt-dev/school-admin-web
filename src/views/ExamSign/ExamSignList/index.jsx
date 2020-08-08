import React from 'react'
import { useSelector } from 'react-redux'
import Header from './Header'
import { Avatar, Divider } from 'antd'
import useFetch from 'src/hooks/useFetch'
import CustomTable from 'src/components/CustomTable'
import {
  tableOrder,
  getRow,
  getCustomRow,
  getDomain,
  getDateRow,
  confirmDelete,
} from 'src/utils/common'
import { SignStates } from 'src/utils/const'
import { Link } from 'react-router-dom'
import PageListCustom from 'src/components/PageListCustom'
import {
  pathExam,
  pathExamSignList,
  pathDelSign,
  pathDownloadResults,
} from 'src/utils/httpUtil'
import { routePrintExamCertif, routeExamSign } from 'src/utils/routeUtil'

const { useTableFetch } = CustomTable

const ExamSignList = ({ match, history }) => {
  const examinationId = match.params.id
  const { allCoaches } = useSelector((state) => state.app)
  const [exam = {}] = useFetch(pathExam(examinationId))
  const signTableList = useTableFetch(pathExamSignList, { examinationId })
  const {
    search: { coachId, coachClassId },
    fetchTable,
  } = signTableList

  const handleSign = () => {
    history.push(routeExamSign(examinationId))
  }

  const printExamCertifs = () => {
    history.push(routePrintExamCertif(examinationId, { coachId, coachClassId }))
  }

  const confirmDeleteExamSign = (examSign) => {
    confirmDelete(
      '报名',
      examSign.name,
      pathDelSign(examSign),
      fetchTable,
      '考生'
    )
  }

  const downloadExamineeInfo = () => {
    window.open(pathDownloadResults(examinationId), '_blank')
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
        columns={getColumns(examinationId, confirmDeleteExamSign)}
        rowKey="signId"
        size="small"
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
