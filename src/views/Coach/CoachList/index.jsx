import React from 'react'
import PageList from 'src/components/PageList'
import {
  getActionRow,
  getDateRow,
  getLinkRow,
  getRow,
  tableOrder,
  getSwitchRow,
} from 'src/utils/common'

const CoachList = () => {
  return <PageList columns={getColumns} />
}

export default CoachList

const getColumns = (deleteCoach, updateCoachStatus) => [
  tableOrder,
  getRow('姓名', 'username'),
  getRow('昵称', 'nickname'),
  getRow('电话', 'phone'),
  getLinkRow('所带班级', `/coach/::/classes?coachName=::`, ['id', 'username']),
  getSwitchRow(updateCoachStatus),
  getDateRow('创建时间', 'createTime'),
  getActionRow((record) => `/coach/${record.id}`, deleteCoach),
]
