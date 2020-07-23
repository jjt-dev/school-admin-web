import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as coachAction from 'src/actions/coach'
import ActionBar from './ActionBar'
import { Modal, Table, message } from 'antd'
import './index.less'
import { coachListColumns } from '../helper'
import { pagConfig } from 'src/utils/const'
import { useHistory } from 'react-router'
import api from 'src/utils/api'

const { confirm } = Modal

const CoachList = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { coachList, filter, total } = useSelector((state) => state.coach)
  const { page, rows } = filter.paginator

  useEffect(() => {
    dispatch(coachAction.getCoachList(filter))
  }, [dispatch, filter])

  useEffect(() => {
    return () => dispatch(coachAction.resetStore())
  }, [dispatch])

  const updateFilter = (field, value) => {
    dispatch(coachAction.updateFilter(field, value))
  }

  const confirmDeleteCoach = (coach) => {
    confirm({
      title: '请问您确认要删除该教练吗?',
      content: `教练名: ${coach.username}`,
      onOk: async () => {
        await api.post(`/coach/del?id=${coach.id}`)
        message.success('教练删除成功')
        dispatch(coachAction.getCoachList(filter))
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  return (
    <div className="page coach-list">
      <div className="coach-list__title">教练列表</div>
      <ActionBar updateFilter={updateFilter} filter={filter} />
      <Table
        className="coach-list__table"
        columns={coachListColumns(history, confirmDeleteCoach)}
        dataSource={coachList}
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

export default CoachList
