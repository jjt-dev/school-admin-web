import React from 'react'
import './index.less'
import PageList from 'src/components/PageList'
import {
  getActionRow,
  getDateRow,
  getEnableRow,
  getLinkRow,
  getRow,
  tableOrder,
} from 'src/utils/common'

const CoachList = () => {
  return <PageList titleProp="username" columns={getColumns} />
}

export default CoachList

const getColumns = (deleteCoach) => [
  tableOrder,
  getRow('姓名', 'username'),
  getRow('昵称', 'nickname'),
  getRow('电话', 'phone'),
  getLinkRow('所带班级', `/coach/::/classes?coachName=::`, ['id', 'username']),
  getEnableRow(),
  getDateRow('创建时间', 'createTime'),
  getActionRow('/coach', deleteCoach),
]
