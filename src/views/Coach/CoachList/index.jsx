import React from 'react'
import './index.less'
import { useHistory } from 'react-router'
import CustomTable from 'src/components/CustomTable'
import ListHeader from 'src/components/ListHeader'
import { confirmUpdate } from 'src/utils/common'
import { coachListColumns } from './helper'
const { useTableFetch } = CustomTable

const CoachList = () => {
  const coachList = useTableFetch(`/coach/page`)
  const history = useHistory()

  const deleteCoach = (coach) => {
    const entity = {
      status: '删除',
      title: '教练',
      titleValue: coach.name,
      path: `/coach/del?id=${coach.id}`,
      callback: () => coachList.fetchTable(),
    }
    confirmUpdate(entity)
  }

  return (
    <div className="page page-list">
      <div className="page-list__title">教练列表</div>
      <ListHeader
        fetchTable={coachList.fetchTable}
        path="/coach"
        placeholder="请输入名称或联系方式"
      />
      <CustomTable
        {...coachList}
        columns={coachListColumns(history, deleteCoach)}
        rowKey="id"
      />
    </div>
  )
}

export default CoachList
