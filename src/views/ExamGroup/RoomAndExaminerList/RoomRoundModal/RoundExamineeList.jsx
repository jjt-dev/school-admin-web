import React from 'react'
import CustomTable from 'src/components/CustomTable'
import { tableOrder, getRow, getCustomRow, getDateRow } from 'src/utils/common'
import { Genders } from 'src/utils/const'

const { useTableFetch } = CustomTable

const RoundExamineeList = ({ examinationId, roundNum }) => {
  const tableList = useTableFetch('/examination/examinationStudentGrouped', {
    examinationId,
    roundNum,
  })

  return <CustomTable {...tableList} columns={columns} />
}

export default RoundExamineeList

const columns = [
  tableOrder,
  getRow('姓名', 'studentName'),
  getCustomRow('性别', (record) => Genders[record.gender]),
  getDateRow('出生日期', 'birthday'),
  getCustomRow(
    '申请级别',
    (record) => `${record.levelName}(${record.levelAlias})`
  ),
]
