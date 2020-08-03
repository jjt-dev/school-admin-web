import React from 'react'
import './index.less'
import { getColumns } from './helper'
import PageList from 'src/components/PageList'

const CoachList = () => {
  return <PageList titleProp="username" columns={getColumns} />
}

export default CoachList
