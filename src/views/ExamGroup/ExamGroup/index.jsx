import React from 'react'
import Header from './Header'
import PageList from 'src/components/PageList'
import CustomTable from 'src/components/CustomTable'
import { getActionRow, getRow, tableOrder } from 'src/utils/common'
import useFetch from 'src/hooks/useFetch'
import './index.less'

const { useTableFetch } = CustomTable

const ExamGroup = ({ match }) => {
  const examinationId = match.params.id
  const [exam] = useFetch(`/examination/item?id=${examinationId}`)
  const groupStdList = useTableFetch(`/examination/examinationStudentGrouped`, {
    examinationId,
  })

  return (
    <PageList
      defaultTableList={groupStdList}
      columns={getColumns(examinationId)}
    >
      {exam && (
        <Header
          fetchTable={groupStdList.fetchTable}
          exam={exam}
          defaultSearch={groupStdList.search}
        />
      )}
    </PageList>
  )
}

export default ExamGroup

const getColumns = (examId) => () => [
  tableOrder,
  getRow('姓名', 'studentName'),
  getRow('教练', 'coachName'),
  getRow('考评级别', 'levelName'),
  getRow('带色', 'levelAlias'),
  getRow('组号', 'roundNum'),
  getRow('考试序号', 'subOrderNum'),
  getActionRow((record) => `/exam/${examId}/group/${record.id}`),
]
