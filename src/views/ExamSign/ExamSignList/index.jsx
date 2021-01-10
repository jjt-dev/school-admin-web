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
  confirmUpdate,
  findSignStatus,
} from 'src/utils/common'
import { SignStatus } from 'src/utils/const'
import { Link } from 'react-router-dom'
import PageListCustom from 'src/components/PageListCustom'
import {
  pathExam,
  pathExamSignList,
  pathDelSign,
  pathDownloadResults,
  pathPaySign,
} from 'src/utils/httpUtil'
import { routePrintExamCertif, routeExamSign } from 'src/utils/routeUtil'
import useTableFetch from 'src/hooks/useTableFetch'

const ExamSignList = ({ examId: examinationId, history }) => {
  const { allCoaches } = useSelector((state) => state.app)
  const [exam = {}, fetchExam] = useFetch(pathExam(examinationId))
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

  const confirmPayExamSign = (sign) => {
    const entity = {
      status: '支付',
      title: '报名',
      titleValue: sign.name,
      path: pathPaySign(sign),
      callback: fetchTable,
      contentTitle: '考生',
    }
    confirmUpdate(entity)
  }

  const confirmDeleteExamSign = (sign) => {
    confirmDelete('报名', sign.name, pathDelSign(sign), fetchTable, '考生')
  }

  const downloadExamineeInfo = () => {
    window.open(pathDownloadResults(examinationId), '_blank')
  }

  return (
    <PageListCustom title={`${exam.title}报考列表`}>
      <Header
        examSignList={signTableList.dataSource}
        fetchTable={fetchTable}
        defaultSearch={signTableList.search}
        handleSign={handleSign}
        exam={exam}
        fetchExam={fetchExam}
        allCoaches={allCoaches}
        printExamCertifs={printExamCertifs}
        downloadExamineeInfo={downloadExamineeInfo}
      />
      <CustomTable
        {...signTableList}
        columns={getColumns(
          examinationId,
          confirmPayExamSign,
          confirmDeleteExamSign
        )}
        rowKey="signId"
        size="small"
      />
    </PageListCustom>
  )
}

export default ExamSignList

const getColumns = (examId, payExamSign, deleteSign) => [
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
        <Link
          to={`/exam/${examId}/sign/${record.signId}?key=signs&comp=ExamSign`}
        >
          编辑
        </Link>
        <Divider type="vertical" />
        <Link
          to={`/exam/${examId}/sign/${record.signId}/detail?key=signs&comp=ExamSign`}
        >
          详情
        </Link>
        <Divider type="vertical" />
        {record.currState === SignStatus.notPay.id && (
          <>
            <span className="table-action" onClick={() => payExamSign(record)}>
              支付考试报名
            </span>
            <Divider type="vertical" />
          </>
        )}
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
