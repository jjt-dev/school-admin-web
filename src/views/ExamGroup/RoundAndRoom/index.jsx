import React, { useEffect, useState } from 'react'
import './index.less'
import api from 'src/utils/api'
import { Table, message } from 'antd'
import { roundRoomColumns } from '../helper'
import { useSelector } from 'react-redux'
import RoundExamineeModal from './RoundExamineeModal'

const RoundAndRoom = ({ match }) => {
  const [roundAndRoom, setRoundAndRoom] = useState()
  const [selectedRound, setSelectedRound] = useState()
  const { allRooms } = useSelector((state) => state.app)
  const examId = match.params.id

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(
        `/examination/getExamRoundAndItsRoom?examinationId=${examId}`
      )
      setRoundAndRoom(result)
    }
    fetchData()
  }, [examId])

  const updateRoundRoom = async (sourceId, newRoomId) => {
    await api.post(
      `/examination/updateRoundRoom?sourceId=${sourceId}&newRoomId=${newRoomId}`
    )
    message.success(`更新考场成功`)
  }

  const hideRoundExamineeModal = () => {
    setSelectedRound()
  }

  return (
    <div className="page round-room">
      <div className="round-room__title">考场分配</div>
      <Table
        className="round-room__table"
        columns={roundRoomColumns(allRooms, updateRoundRoom, setSelectedRound)}
        dataSource={roundAndRoom}
        rowKey="round_num"
        size="middle"
        bordered={true}
      />
      {selectedRound && (
        <RoundExamineeModal
          examinationId={examId}
          roundNum={selectedRound.round_num}
          hideRoundExamineeModal={hideRoundExamineeModal}
        />
      )}
    </div>
  )
}

export default RoundAndRoom
