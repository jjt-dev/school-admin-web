import React from 'react'
import PageList from 'src/components/PageList'
import {
  getActionRow,
  getDateRow,
  getEnableRow,
  getRow,
  tableOrder,
} from 'src/utils/common'

const ExaminerList = () => {
  return <PageList columns={getColumns} />
}

export default ExaminerList

const getColumns = (deleteExaminer) => [
  tableOrder,
  getRow('姓名', 'username'),
  getRow('电话', 'phone'),
  getEnableRow(),
  getDateRow('创建时间', 'createTime'),
  getActionRow((record) => `/examiner/${record.id}`, deleteExaminer),
]
