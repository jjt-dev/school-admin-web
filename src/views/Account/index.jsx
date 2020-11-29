import { Table } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import PageCustom from 'src/components/PageCustom'
import useFetch from 'src/hooks/useFetch'
import { getCustomRow } from 'src/utils/common'
import { getRow, tableOrder } from 'src/utils/tableUtil'

const Account = () => {
  const { allCourses } = useSelector((state) => state.app)
  const [account = []] = useFetch(`/school/accountInfo`)

  return (
    <PageCustom title="账户信息">
      <Table
        rowKey="id"
        columns={getColumns(allCourses)}
        dataSource={account}
        style={{ width: '600px', margin: '0 auto' }}
        pagination={false}
        bordered
      />
    </PageCustom>
  )
}

export default Account

const getColumns = (allCourses) => [
  tableOrder,
  getCustomRow(
    '科目',
    (record) =>
      allCourses.find((item) => item.courseId === record.courseId)?.courseName
  ),
  getRow('余额', 'balance'),
]
