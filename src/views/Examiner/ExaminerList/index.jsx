import React from 'react'
import { useDispatch } from 'react-redux'
import PageList from 'src/components/PageList'
import {
  getActionRow,
  getDateRow,
  getRow,
  tableOrder,
  getSwitchRow,
} from 'src/utils/common'
import * as appAction from 'src/actions/app'

const ExaminerList = () => {
  const dispatch = useDispatch()
  const getAllExaminers = () => dispatch(appAction.getAllExaminers())

  return <PageList columns={getColumns} updateCallback={getAllExaminers} />
}

export default ExaminerList

const getColumns = (deleteExaminer, updateExaminerStatus) => [
  tableOrder,
  getRow('姓名', 'username'),
  getRow('电话', 'phone'),
  getSwitchRow(updateExaminerStatus),
  getDateRow('创建时间', 'createTime'),
  getActionRow((record) => `/examiner/${record.id}`, deleteExaminer),
]
