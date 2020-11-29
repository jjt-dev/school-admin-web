import './index.less'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import TableDragSelect from 'react-table-drag-select'
import { addRoundNumPrefix } from 'src/utils/common'
import { Button, Dropdown, Menu, Modal } from 'antd'
import { pathRoundAndRoom } from 'src/utils/httpUtil'
import api from 'src/utils/api'

const rowNum = 12

const Rounds = ({
  examId,
  allRooms,
  setToggleCellTable,
  hideModal,
  updateRoundsRoom,
  title,
}) => {
  const [cells, setCells] = useState([])
  const [allRounds, setAllRounds] = useState([])
  const [contextMenuVisible, setContextMenuVisible] = useState(false)

  const getAllRounds = useCallback(() => {
    const fetchData = async () => {
      const result = await api.get(
        `${pathRoundAndRoom}?page=1&rows=10000&examinationId=${examId}`
      )
      setAllRounds(result.data.filter((round) => round.excuteId < 0))
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
    <Modal
      width={1300}
      title={title}
      visible={true}
      onCancel={hideModal}
      footer={[
        <Button onClick={() => setCells(originCells)} className="clear-select">
          清空选择
        </Button>,
        <Button key="back" onClick={hideModal}>
          取消
        </Button>,
      ]}
      className="multi-select"
    >
      <div className="rooms">
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
          <TableDragSelect value={cells} onChange={(cells) => setCells(cells)}>
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
                        <div> {addRoundNumPrefix(round.round_num)}组</div>
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </TableDragSelect>
        </a>
      </Dropdown>
    </Modal>
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
