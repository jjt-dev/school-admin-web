import './index.less'

import { Button, message, Select, Tag } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import CustomTable from 'src/components/CustomTable'
import PageListCustom from 'src/components/PageListCustom'
import useFetch from 'src/hooks/useFetch'
import useTableFetch from 'src/hooks/useTableFetch'
import api from 'src/utils/api'
import { addRoundNumPrefix, getCustomRow, tableOrder } from 'src/utils/common'
import {
  pathExam,
  pathRoundAndRoom,
  pathUpdRoundRoom as pathUpdRoundsRoom,
} from 'src/utils/httpUtil'

import RoundExamineeModal from './RoundExamineeModal'
import Rounds from './Rounds'

const RoundAndRoom = ({ match }) => {
  const examId = match.params.id
  const [exam = {}] = useFetch(pathExam(examId))
  const [toggleCellTable, setToggleCellTable] = useState(false)
  const [showMultSelect, setShowMultiSelect] = useState(false)
  const [selectedRound, setSelectedRound] = useState()
  const { allRooms } = useSelector((state) => state.app)
  const tableList = useTableFetch(pathRoundAndRoom, { examinationId: examId })
  const title = `${exam.title}考场分配`

  const updateRoundsRoom = async (sourceIds, newRoomId) => {
    await api.post(pathUpdRoundsRoom(sourceIds, newRoomId))
    message.success(`更新考场成功`)
  }

  const multiSelectProps = {
    examId,
    allRooms,
    setToggleCellTable,
    setShowMultiSelect,
    updateRoundsRoom,
    title,
    hideModal: () => setShowMultiSelect(false),
  }

  return (
    <PageListCustom
      title={title}
      customClass={showMultSelect ? 'multi-select-container' : ''}
    >
      {!showMultSelect && (
        <>
          <Button
            type="primary"
            onClick={() => setShowMultiSelect(true)}
            size="small"
            className="multi-select-btn"
          >
            多选配置考场
          </Button>
          <CustomTable
            {...tableList}
            className="round-room-table"
            columns={getColumns(allRooms, updateRoundsRoom, setSelectedRound)}
            rowKey="round_num"
            size="small"
          />
        </>
      )}
      {showMultSelect && (
        <>
          {toggleCellTable
            ? React.createElement(Rounds, multiSelectProps)
            : React.createElement(Rounds, multiSelectProps)}
        </>
      )}
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

const getColumns = (allRooms, updateRoundRoom, setSelectedRound) => [
  { ...tableOrder, width: 80 },
  getCustomRow('组号', (record) => addRoundNumPrefix(record.round_num), 80),
  {
    title: '教练',
    width: 500,
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
    render: (text, record) => {
      return (
        <span>
          <Select
            disabled={record.excuteId > 0}
            placeholder="请选择考场"
            style={{ width: '160px' }}
            defaultValue={record.roomId}
            onChange={(value) => updateRoundRoom(record.id, value)}
            size="small"
          >
            {allRooms.map((room) => (
              <Select.Option key={room.id} value={room.id}>
                {room.name}
              </Select.Option>
            ))}
          </Select>
        </span>
      )
    },
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
