import React from 'react'
import { Button, Modal } from 'antd'
import {
  addRoundNumPrefix,
  getCustomRow,
  getRow,
  tableOrder,
} from 'src/utils/common'
import { Genders } from 'src/utils/const'
import CustomTable from 'src/components/CustomTable'
import { pathRoomStudents, pathDownloadRoomStudInfos } from 'src/utils/httpUtil'

const { useTableFetch } = CustomTable

const RoomExamineeModal = ({
  examinationId,
  selectedRoom: { roomId, name },
  hide,
}) => {
  const tableList = useTableFetch(pathRoomStudents, {
    examinationId,
    roomId,
  })

  const downloadRoomStudInfo = () => {
    window.open(pathDownloadRoomStudInfos(examinationId, roomId), '_blank')
    hide()
  }

  return (
    <Modal
      width={900}
      title={`${name}考生列表`}
      visible={true}
      onCancel={hide}
      footer={[
        <Button key="back" onClick={hide}>
          取消
        </Button>,
        <Button key="ok" type="primary" onClick={downloadRoomStudInfo}>
          下载考生信息
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
