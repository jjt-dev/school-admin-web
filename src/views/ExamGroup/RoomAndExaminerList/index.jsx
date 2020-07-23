import React, { useEffect, useState } from 'react'
import './index.less'
import api from 'src/utils/api'
import { Table } from 'antd'
import { roomExaminerListColumns } from '../helper'
import RoomExamineeModal from './RoomExamineeModal'
import RoomRoundModal from './RoomRoundModal'

const RoomAndExaminerList = ({ match, history }) => {
  const [roomAndExaminers, setRoomAndExaminers] = useState()
  const [selectedRoom, setSelectedRoom] = useState()
  const [showRoomExaminees, setShowRoomExaminees] = useState(false)
  const [showRoomRounds, setShowRoomRounds] = useState(false)
  const examId = match.params.id

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(
        `/examination/getExamRoomsAndItsExaminers?examinationId=${examId}`
      )
      setRoomAndExaminers(result)
    }
    fetchData()
  }, [examId])

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
    <div className="page room-examiner-list">
      <div className="room-examiner-list__title">考场和考官列表</div>
      <Table
        className="room-examiner-list__table"
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
    </div>
  )
}

export default RoomAndExaminerList
