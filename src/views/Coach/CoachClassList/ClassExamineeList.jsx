import React from 'react'
import useListSearch from 'src/hooks/useListSearch'
import { Table, Modal, Button } from 'antd'
import { formatTime } from 'src/utils/common'

const ClassExamineeList = ({ coachId, classId, setSelectedClass }) => {
  const { data, refetchList, pagination } = useListSearch(
    '/coach/class/pageCoachStudent',
    {
      coachClassId: classId,
      coachId,
    }
  )

  return (
    <Modal
      title="班级考生列表"
      visible={true}
      onCancel={() => setSelectedClass()}
      footer={[
        <Button key="back" onClick={() => setSelectedClass()}>
          取消
        </Button>,
      ]}
    >
      <Table
        columns={columns}
        dataSource={data}
        rowKey="studentId"
        size="middle"
        bordered={true}
        pagination={pagination}
        onChange={(value) => refetchList({ paginator: value })}
      />
    </Modal>
  )
}

export default ClassExamineeList

const columns = [
  {
    title: '序号',
    key: 'index',
    render: (text, record, index) => `${index + 1}`,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '级别',
    dataIndex: 'levelName',
    key: 'levelName',
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    key: 'birthday',
    render: (text, record) => <span>{formatTime(record.birthday)}</span>,
  },
]
