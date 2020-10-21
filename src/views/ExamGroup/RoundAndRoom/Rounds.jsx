import './index.less'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import TableDragSelect from 'react-table-drag-select'
import { addRoundNumPrefix } from 'src/utils/common'
import { Button, Dropdown, Menu } from 'antd'
import { pathRoundAndRoom } from 'src/utils/httpUtil'
import api from 'src/utils/api'

const rowNum = 8

const Rounds = ({
  examId,
  allRooms,
  setToggleCellTable,
  setShowMultiSelect,
  updateRoundsRoom,
}) => {
  const [cells, setCells] = useState([])
  const [allRounds, setAllRounds] = useState([])
  const [contextMenuVisible, setContextMenuVisible] = useState(false)

  const getAllRounds = useCallback(() => {
    const fetchData = async () => {
      const result = await api.get(
        `${pathRoundAndRoom}?page=1&rows=10000&examinationId=${examId}`
      )
      setAllRounds(result.data)
      setToggleCellTable((pre) => !pre)
    }
    fetchData()
  }, [examId, setToggleCellTable])

  useEffect(() => {
    getAllRounds()
  }, [getAllRounds])

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

  return (
    <>
      <div className="round-room-actions multi-select">
        <Button type="primary" onClick={() => setShowMultiSelect(false)}>
          返回
        </Button>
        <Button onClick={() => setCells(originCells)}>清空选择</Button>
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
          <TableDragSelect value={cells} onChange={(cells) => setCells(cells)}>
            {roundCells.map((rowRounds, index) => (
              <tr key={index}>
                {rowRounds.map((round) => {
                  return (
                    <td key={round.id} disabled={round.excuteId > 0}>
                      <div className="round-content">
                        <div className="round-number">
                          组号: {addRoundNumPrefix(round.round_num)}
                        </div>
                        <div>考场: {round.roomName}</div>
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </TableDragSelect>
        </a>
      </Dropdown>
    </>
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
