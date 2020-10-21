import './index.less'

import { message } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import useFetch from 'src/hooks/useFetch'
import api from 'src/utils/api'
import {
  pathExam,
  pathRoundAndRoom,
  pathUpdRoundRoom,
} from 'src/utils/httpUtil'

import RoundExamineeModal from './RoundExamineeModal'
import Rounds from './Rounds'

const RoundAndRoom = ({ match }) => {
  const examId = match.params.id
  const [selectedRound, setSelectedRound] = useState()
  const { allRooms } = useSelector((state) => state.app)
  const [exam = {}] = useFetch(pathExam(examId))
  const [{ data } = {}] = useFetch(
    `${pathRoundAndRoom}?page=1&rows=10000&examinationId=${examId}`
  )

  const updateRoundRoom = async (sourceId, newRoomId) => {
    await api.post(pathUpdRoundRoom(sourceId, newRoomId))
    message.success(`更新考场成功`)
  }

  if (!data) return null

  return (
    <div className="page">
      <Rounds allRounds={data} />
      {selectedRound && (
        <RoundExamineeModal
          examinationId={examId}
          roundNum={selectedRound.round_num}
          hideModal={() => setSelectedRound()}
        />
      )}
    </div>
  )
}

export default RoundAndRoom
