import './index.less'

import { Dropdown, Menu } from 'antd'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import TableDragSelect from 'react-table-drag-select'
import api from 'src/utils/api'
import { addRoundNumPrefix } from 'src/utils/common'
import { pathRoundAndRoom } from 'src/utils/httpUtil'
import { EditOutlined } from '@ant-design/icons'
import useDimensions from 'src/hooks/useDimensions'

const Rounds = ({
  examId,
  allRooms,
  setToggleCellTable,
  updateRoundsRoom,
  setSelectedRound,
}) => {
  const [ref, dimensions] = useDimensions()
  const [cells, setCells] = useState([])
  const [allRounds, setAllRounds] = useState([])
  const [contextMenuVisible, setContextMenuVisible] = useState(false)
  const [rowNum, setRowNum] = useState(8)

  useEffect(() => {
    if (dimensions.width) {
      setRowNum(Math.ceil(dimensions.width / 145))
    }
  }, [dimensions.width])

  const getAllRounds = useCallback(() => {
    const fetchData = async () => {
      const { data = [] } = await api.get(
        `${pathRoundAndRoom}?page=1&rows=10000&examinationId=${examId}`
      )
      setAllRounds(data.filter((round) => round.excuteId < 0))
      setToggleCellTable((pre) => !pre)
    }
    fetchData()
  }, [examId, setToggleCellTable])

  useEffect(() => {
    getAllRounds()
  }, [getAllRounds])

  const [roundCells] = useMemo(() => {
    const totalRows = Math.ceil(allRounds.length / rowNum)
    const rows = Array(totalRows).fill(0)
    const cells = rows.map(() => Array(rowNum).fill(false))
    const roundCells = []
    rows.forEach((_, index) => {
      roundCells.push(allRounds.slice(index * rowNum, index * rowNum + rowNum))
    })
    setCells(cells)
    return [roundCells]
  }, [allRounds, rowNum])

  const updateSelectedRoundsRoom = async (newRoomId) => {
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
      await updateRoundsRoom(roundIds.join(','), newRoomId)
      getAllRounds()
    }
  }

  if (!rowNum) return null

  return (
    <div className="multi-select">
      <div className="rooms" ref={ref}>
        {allRooms.map((room, index) => (
          <div
            className="room-item"
            key={room.id}
            style={{ background: colors[index] }}
            onClick={() => updateSelectedRoundsRoom(room.id)}
          >
            {room.name}
          </div>
        ))}
      </div>
      <Dropdown
        overlay={getRoomMenus(allRooms, updateSelectedRoundsRoom)}
        trigger={['contextMenu']}
        onVisibleChange={(value) => {
          setContextMenuVisible(value)
        }}
        visible={contextMenuVisible}
      >
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          {allRooms.length > 0 && (
            <TableDragSelect
              value={cells}
              onChange={(cells) => setCells(cells)}
            >
              {roundCells.map((rowRounds, index) => (
                <tr key={index}>
                  {rowRounds.map((round) => {
                    const roomIndex = allRooms.findIndex(
                      (room) => room.id === round.roomId
                    )
                    return (
                      <td
                        key={round.id}
                        disabled={round.excuteId > 0}
                        style={{ backgroundColor: colors[roomIndex] }}
                      >
                        <div className="round-content">
                          <div style={{ fontWeight: 'bold' }}>
                            {addRoundNumPrefix(round.round_num)}组
                          </div>
                          <div>
                            {round.levels.map((level) => level.name).join(',')}
                          </div>
                          <div>
                            {round.coachs
                              .map((coach) => coach.nickname)
                              .join(',')}
                          </div>
                          <div>
                            人数: {round.studentCount}
                            <span
                              className="round-content-edit"
                              onMouseDown={(e) => e.stopPropagation()}
                              onClick={() => setSelectedRound(round)}
                            >
                              <EditOutlined />
                            </span>
                          </div>
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </TableDragSelect>
          )}
        </a>
      </Dropdown>
    </div>
  )
}

export default Rounds

const getRoomMenus = (allRooms, updateSelectedRoundsRoom) => (
  <Menu>
    {allRooms.map((room) => (
      <Menu.Item
        key={room.id}
        onClick={() => updateSelectedRoundsRoom(room.id)}
      >
        {room.name}
      </Menu.Item>
    ))}
  </Menu>
)

const colors = [
  '#b7eb8f',
  '#91d5ff',
  '#ffe58f',
  '#ffccc7',
  '#6495fa',
  '#5b8ff9',
  '#5ad8a6',
  '#5d7092',
  '#f6bd16',
  '#e86452',
  '#6dc8ec',
  '#945fb9',
  '#ff9845',
  '#1e9493',
  '#ff99c3',
]
