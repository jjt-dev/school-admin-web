import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as examinerAction from 'src/actions/examiner'
import ActionBar from './ActionBar'
import { Modal, Table, message } from 'antd'
import './index.less'
import { coachListColumns } from '../helper'
import { pagConfig } from 'src/utils/const'
import { useHistory } from 'react-router'
import api from 'src/utils/api'

const { confirm } = Modal

const ExaminerList = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { examinerList, filter, total } = useSelector((state) => state.examiner)
  const { page, rows } = filter.paginator

  useEffect(() => {
    dispatch(examinerAction.getExaminerList(filter))
    dispatch(examinerAction.resetEdit())
  }, [dispatch, filter])

  useEffect(() => {
    return () => dispatch(examinerAction.resetStore())
  }, [dispatch])

  const updateFilter = (field, value) => {
    dispatch(examinerAction.updateFilter(field, value))
  }

  const confirmDeleteExaminer = (examiner) => {
    confirm({
      title: '请问您确认要删除该考官吗?',
      content: `考官名: ${examiner.username}`,
      onOk: async () => {
        await api.post(`/examiner/del?id=${examiner.id}`)
        message.success('删除考官成功')
        dispatch(examinerAction.getExaminerList(filter))
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  return (
    <div className="page examiner-list">
      <div className="examiner-list__title">考官列表</div>
      <ActionBar updateFilter={updateFilter} filter={filter} />
      <Table
        className="examiner-list__table"
        columns={coachListColumns(history, confirmDeleteExaminer)}
        dataSource={examinerList}
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

export default ExaminerList
