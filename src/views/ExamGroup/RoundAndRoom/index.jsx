import './index.less'

import { Button, message, Select, Tag } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { useCallback } from 'react'
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
import Rounds2 from './Rounds2'

const rowNum = 8

const RoundAndRoom = ({ match }) => {
  const examId = match.params.id
  const [exam = {}] = useFetch(pathExam(examId))
  const [toggleCellTable, setToggleCellTable] = useState(false)
  const [showMultSelect, setShowMultiSelect] = useState(false)
  const [contextMenuVisible, setContextMenuVisible] = useState(false)
  const [selectedRound, setSelectedRound] = useState()
  const { allRooms } = useSelector((state) => state.app)
  const tableList = useTableFetch(pathRoundAndRoom, { examinationId: examId })
  const [allRounds, setAllRounds] = useState([])
  const [cells, setCells] = useState([])

  const [originCells, roundCells] = useMemo(() => {
    const totalRows = Math.ceil(allRounds.length / rowNum)
    const rows = Array(totalRows).fill(0)
    const cells = rows.map(() => Array(rowNum).fill(false))
    const roundCells = []
    rows.forEach((row, index) => {
      roundCells.push(allRounds.slice(index * rowNum, index * rowNum + rowNum))
    })
    setCells(cells)
    return [cells, roundCells]
  }, [allRounds])

  const getAllRounds = useCallback(() => {
    const fetchData = async () => {
      const result = await api.get(
        `${pathRoundAndRoom}?page=1&rows=10000&examinationId=${examId}`
      )
      setAllRounds(result.data)
      setToggleCellTable((pre) => !pre)
    }
    fetchData()
  }, [examId])

  useEffect(() => {
    getAllRounds()
  }, [getAllRounds])

  const updateRoundsRoom = async (sourceIds, newRoomId) => {
    await api.post(pathUpdRoundsRoom(sourceIds, newRoomId))
    getAllRounds()
    message.success(`更新考场成功`)
  }

  const hideRoundExamineeModal = () => {
    setSelectedRound()
  }

  const updateSelectedRoundsRoom = (newRoomId) => {
    const roundIds = []
    cells.forEach((cellRow, index) => {
      cellRow.forEach((cell, index1) => {
        if (cell === true) {
          roundIds.push(roundCells[index][index1].id)
        }
      })
    })
    setContextMenuVisible(false)
    if (roundIds.length > 0) {
      updateRoundsRoom(roundIds.join(','), newRoomId)
    }
  }

  return (
    <PageListCustom
      title={`${exam.title}考场分配`}
      customClass="round-room-list"
    >
      <div className={`round-room-actions multi-select-${showMultSelect}`}>
        <Button
          type="primary"
          onClick={() => setShowMultiSelect((pre) => !pre)}
        >
          {showMultSelect ? '返回' : '多选配置考场'}
        </Button>
        {showMultSelect && (
          <Button onClick={() => setCells(originCells)}>清空选择</Button>
        )}
      </div>
      {!showMultSelect && (
        <CustomTable
          {...tableList}
          className="round-room-table"
          columns={getColumns(allRooms, updateRoundsRoom, setSelectedRound)}
          rowKey="round_num"
        />
      )}
      {showMultSelect && (
        <>
          {toggleCellTable ? (
            <Rounds
              cells={cells}
              setCells={setCells}
              roundCells={roundCells}
              allRooms={allRooms}
              updateSelectedRoundsRoom={updateSelectedRoundsRoom}
              contextMenuVisible={contextMenuVisible}
              setContextMenuVisible={setContextMenuVisible}
            />
          ) : (
            <Rounds2
              cells={cells}
              setCells={setCells}
              roundCells={roundCells}
              allRooms={allRooms}
              updateSelectedRoundsRoom={updateSelectedRoundsRoom}
              contextMenuVisible={contextMenuVisible}
              setContextMenuVisible={setContextMenuVisible}
            />
          )}
        </>
      )}
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
    render: (text, record) => {
      return (
        <span>
          <Select
            disabled={record.excuteId > 0}
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
