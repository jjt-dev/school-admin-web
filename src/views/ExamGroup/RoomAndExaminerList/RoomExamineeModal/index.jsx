import React from 'react'
import { Button, Modal, Table } from 'antd'
import { addNumPrefix, addRoundNumPrefix } from 'src/utils/common'
import useListSearch from 'src/hooks/useListSearch'
import { Genders } from 'src/utils/const'

const RoomExamineeModal = ({
  examinationId,
  selectedRoom,
  hideRoomExamineesModal,
}) => {
  const { data, refetchList, pagination } = useListSearch(
    '/examination/pageStudentsOfSomeRoom',
    {
      examinationId,
      roomId: selectedRoom.roomId,
    }
  )

  return (
    <Modal
      width={900}
      title={`${addNumPrefix(selectedRoom.roomId)}考场考生列表`}
      visible={true}
      onCancel={hideRoomExamineesModal}
      footer={[
        <Button key="back" onClick={hideRoomExamineesModal}>
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

export default RoomExamineeModal

const columns = [
  {
    title: '序号',
    key: 'index',
    render: (text, record, index) => `${index + 1}`,
  },
  {
    title: '姓名',
    dataIndex: 'studentName',
    key: 'studentName',
  },
  {
    title: '性别',
    key: 'gender',
    render: (text, record) => `${Genders[record.gender]}`,
  },
  {
    title: '申请等级',
    key: 'levelName',
    render: (text, record) => `${record.levelName}`,
  },
  {
    title: '场次',
    key: 'roundNum',
    render: (text, record) => `${addRoundNumPrefix(record.roundNum)}`,
  },
  {
    title: '电话',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '单位',
    dataIndex: 'schoolName',
    key: 'schoolName',
  },
]
