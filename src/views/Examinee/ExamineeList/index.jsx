import React from 'react'
import PageList from 'src/components/PageList'
import { getDetailRow, getRow, tableOrder } from 'src/utils/common'

const ExamineeList = () => {
  return (
    <PageList
      columns={getColumns}
      path="/student/examResults"
      showAdd={false}
    />
  )
}

export default ExamineeList

const getColumns = () => [
  tableOrder,
  getRow('姓名', 'name'),
  getRow('身份证', 'cardId'),
  getRow('联系方法', 'phone'),
  getRow('考试次数', 'examCount'),
  getRow('最新考级', 'latestLevelName'),
  getDetailRow((record) => `/examinee/${record.id}`),
]
