import React, { useState } from 'react'
import './index.less'
import api from 'src/utils/api'
import { Table, message, Select, Tag } from 'antd'
import { useSelector } from 'react-redux'
import RoundExamineeModal from './RoundExamineeModal'
import useFetch from 'src/hooks/useFetch'
import PageListCustom from 'src/components/PageListCustom'
import { addRoundNumPrefix, tableOrder, getCustomRow } from 'src/utils/common'

const RoundAndRoom = ({ match }) => {
  const [selectedRound, setSelectedRound] = useState()
  const { allRooms } = useSelector((state) => state.app)
  const examId = match.params.id
  const [roundAndRoom] = useFetch(
    `/examination/getExamRoundAndItsRoom?examinationId=${examId}`
  )

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
    <PageListCustom title="考场分配">
      <Table
        className="round-room-table"
        columns={getColumns(allRooms, updateRoundRoom, setSelectedRound)}
        dataSource={roundAndRoom}
        rowKey="round_num"
        size="middle"
        bordered={true}
      />
      {selectedRound && (
        <RoundExamineeModal
          examinationId={examId}
          roundNum={selectedRound.round_num}
          hideModal={hideRoundExamineeModal}
        />
      )}
    </PageListCustom>
  )
}

export default RoundAndRoom

const getColumns = (allRooms, updateRoundRoom, setSelectedRound) => [
  { ...tableOrder, width: 80 },
  getCustomRow('组号', (record) => addRoundNumPrefix(record.round_num), 80),
  {
    title: '教练',
    width: 300,
    render: (text, record) => (
      <>
        {record.coachs.map(({ nickname, id }) => (
          <Tag key={id}>{nickname}</Tag>
        ))}
      </>
    ),
  },
  {
    title: '考场',
    key: 'roomId',
    render: (text, record) => (
      <span>
        <Select
          placeholder="请选择考场"
          style={{ width: '160px' }}
          defaultValue={record.roomId}
          onChange={(value) => updateRoundRoom(record.id, value)}
        >
          {allRooms.map((room) => (
            <Select.Option key={room.id} value={room.id}>
              {room.name}
            </Select.Option>
          ))}
        </Select>
      </span>
    ),
  },
  {
    title: '操作',
    render: (text, record) => (
      <span className="table-action" onClick={() => setSelectedRound(record)}>
        查看分组考生
      </span>
    ),
  },
]
