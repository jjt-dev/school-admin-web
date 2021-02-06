import './index.less'

import { message } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import PageListCustom from 'src/components/PageListCustom'
import useFetch from 'src/hooks/useFetch'
import api from 'src/utils/api'
import {
  pathExam,
  pathUpdRoundRoom as pathUpdRoundsRoom,
} from 'src/utils/httpUtil'

import RoundExamineeModal from './RoundExamineeModal'
import Rounds from './Rounds'

const RoundAndRoom = () => {
  const { id: examId } = useParams()
  const [exam = {}] = useFetch(pathExam(examId))
  const [toggleCellTable, setToggleCellTable] = useState(false)
  const [selectedRound, setSelectedRound] = useState()
  const { allRooms } = useSelector((state) => state.app)
  const title = `${exam.title}考场分配`

  const updateRoundsRoom = async (sourceIds, newRoomId) => {
    await api.post(pathUpdRoundsRoom(sourceIds, newRoomId))
    message.success(`更新考场成功`)
  }

  const multiSelectProps = {
    examId,
    allRooms,
    setToggleCellTable,
    updateRoundsRoom,
    setSelectedRound,
    title,
  }

  return (
    <PageListCustom title={title} customClass="multi-select-container">
      {toggleCellTable
        ? React.createElement(Rounds, multiSelectProps)
        : React.createElement(Rounds, multiSelectProps)}
      {selectedRound && (
        <RoundExamineeModal
          examinationId={examId}
          roundNum={selectedRound.round_num}
          hideModal={() => setSelectedRound()}
        />
      )}
    </PageListCustom>
  )
}

export default RoundAndRoom
