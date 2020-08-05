import React, { useState } from 'react'
import './index.less'
import { Table } from 'antd'
import { roomExaminerListColumns } from '../helper'
import RoomExamineeModal from './RoomExamineeModal'
import RoomRoundModal from './RoomRoundModal'
import useFetch from 'src/hooks/useFetch'
import PageListCustom from 'src/components/PageListCustom'

const RoomAndExaminerList = ({ match, history }) => {
  const examId = match.params.id
  const [selectedRoom, setSelectedRoom] = useState()
  const [showRoomExaminees, setShowRoomExaminees] = useState(false)
  const [showRoomRounds, setShowRoomRounds] = useState(false)
  const [roomAndExaminers] = useFetch(
    `/examination/getExamRoomsAndItsExaminers?examinationId=${examId}`
  )

  const hideRoomExamineesModal = () => {
    setShowRoomExaminees(false)
  }

  const hideRoomRoundsModal = () => {
    setShowRoomRounds(false)
  }

  const handleShowRoomExaminees = (room) => {
    setSelectedRoom(room)
    setShowRoomExaminees(true)
  }

  const handleShowRoomRounds = (room) => {
    setSelectedRoom(room)
    setShowRoomRounds(true)
  }

  return (
    <PageListCustom title="考场和考官列表">
      <Table
        className="room-examiner-list-table"
        columns={roomExaminerListColumns(
          history,
          examId,
          handleShowRoomExaminees,
          handleShowRoomRounds
        )}
        dataSource={roomAndExaminers}
        rowKey="roomId"
        size="middle"
        bordered={true}
      />
      {showRoomExaminees && (
        <RoomExamineeModal
          examinationId={examId}
          selectedRoom={selectedRoom}
          hideRoomExamineesModal={hideRoomExamineesModal}
        />
      )}
      {showRoomRounds && (
        <RoomRoundModal
          examinationId={examId}
          selectedRoom={selectedRoom}
          hideRoomRoundsModal={hideRoomRoundsModal}
        />
      )}
    </PageListCustom>
  )
}

export default RoomAndExaminerList
