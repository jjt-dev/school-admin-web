import React from 'react'
import { Table } from 'antd'
import { roundExamineeColumns } from '../../helper'
import useListSearch from 'src/hooks/useListSearch'

const RoundExamineeList = ({ examinationId, roundNum }) => {
  const { data, refetchList, pagination } = useListSearch(
    '/examination/examinationStudentGrouped',
    {
      examinationId,
      roundNum,
    }
  )

  return (
    <Table
      columns={roundExamineeColumns}
      dataSource={data}
      rowKey="id"
      size="middle"
      bordered={true}
      pagination={pagination}
      onChange={(value) => refetchList({ paginator: value })}
    />
  )
}

export default RoundExamineeList
