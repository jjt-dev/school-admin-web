import React from 'react'
import { Button, Modal } from 'antd'
import {
  addNumPrefix,
  addRoundNumPrefix,
  getCustomRow,
  getRow,
  tableOrder,
} from 'src/utils/common'
import { Genders } from 'src/utils/const'
import CustomTable from 'src/components/CustomTable'

const { useTableFetch } = CustomTable

const RoomExamineeModal = ({
  examinationId,
  selectedRoom,
  hideRoomExamineesModal,
}) => {
  const tableList = useTableFetch('/examination/pageStudentsOfSomeRoom', {
    examinationId,
    roomId: selectedRoom.roomId,
  })

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
      <CustomTable {...tableList} columns={columns} rowKey="studentId" />
    </Modal>
  )
}

export default RoomExamineeModal

const columns = [
  tableOrder,
  getRow('姓名', 'studentName'),
  getCustomRow('性别', (record) => Genders[record.gender]),
  getRow('申请等级', 'levelName'),
  getCustomRow('场次', (record) => addRoundNumPrefix(record.roundNum)),
  getRow('电话', 'phone'),
  getRow('单位', 'schoolName'),
]
