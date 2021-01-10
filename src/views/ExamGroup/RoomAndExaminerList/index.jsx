import './index.less'

import { Divider, Table, Tag } from 'antd'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageListCustom from 'src/components/PageListCustom'
import useFetch from 'src/hooks/useFetch'
import { getRow, tableOrder } from 'src/utils/common'
import { pathExam } from 'src/utils/httpUtil'

import RoomExamineeModal from './RoomExamineeModal'
import RoomRoundModal from './RoomRoundModal'

const RoomAndExaminerList = () => {
  const { id: examId } = useParams()
  const [exam = {}] = useFetch(pathExam(examId))
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
    <PageListCustom title={`${exam.title}考场和考官列表`}>
      <Table
        className="room-examiner-list-table"
        columns={getColumns(
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
          hide={hideRoomExamineesModal}
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

const getColumns = (examId, handleShowRoomExaminees, handleShowRoomRounds) => [
  tableOrder,
  getRow('考场', 'name'),
  {
    title: '考官',
    key: 'roomId',
    render: (text, record) => (
      <>
        {record.examiners.map((examiner, index) => (
          <Tag key={index}>{examiner.username}</Tag>
        ))}
      </>
    ),
  },
  {
    title: '操作',
    width: 260,
    render: (text, record) => (
      <>
        <Link
          to={`/exam/${examId}/room/${record.roomId}/examiners?key=room-examiner&comp=RoomAndExaminer`}
        >
          编辑
        </Link>
        <Divider type="vertical" />
        <span
          className="table-action"
          onClick={() => handleShowRoomExaminees(record)}
        >
          查看考场考生
        </span>
        <Divider type="vertical" />
        <span
          className="table-action"
          onClick={() => handleShowRoomRounds(record)}
        >
          查看场次
        </span>
      </>
    ),
  },
]
