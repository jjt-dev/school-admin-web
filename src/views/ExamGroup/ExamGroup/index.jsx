import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as examGroupAction from 'src/actions/examGroup'
import ActionBar from './ActionBar'
import { Table } from 'antd'
import './index.less'
import { groupStudentsColumns } from '../helper'
import { pagConfig } from 'src/utils/const'
import { useHistory } from 'react-router'
import { useCallback } from 'react'

const ExamGroup = ({ match }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { exam, groupStudentList, filter, total } = useSelector(
    (state) => state.examGroup
  )
  const examId = match.params.id
  const { page, rows } = filter.paginator

  useEffect(() => {
    dispatch(examGroupAction.getExam(examId))
  }, [dispatch, examId])

  useEffect(() => {
    return () => dispatch(examGroupAction.resetStore())
  }, [dispatch])

  const getGroupStudentList = useCallback(() => {
    dispatch(examGroupAction.getGroupStudentList(examId, filter))
  }, [dispatch, examId, filter])

  useEffect(() => {
    getGroupStudentList()
  }, [getGroupStudentList])

  const updateFilter = (field, value) => {
    dispatch(examGroupAction.updateFilter(field, value))
  }

  return (
    <div className="page exam-group">
      <div className="exam-group__title">考试分组列表</div>
      {exam && (
        <ActionBar
          updateFilter={updateFilter}
          exam={exam}
          getGroupStudentList={getGroupStudentList}
        />
      )}
      <Table
        className="exam-group__table"
        columns={groupStudentsColumns(history, examId)}
        dataSource={groupStudentList}
        rowKey="id"
        size="middle"
        bordered={true}
        pagination={{
          ...pagConfig,
          current: page,
          pageSize: rows,
          total,
        }}
        onChange={({ current, pageSize }) =>
          updateFilter('paginator', { page: current, rows: pageSize })
        }
      />
    </div>
  )
}

export default ExamGroup
