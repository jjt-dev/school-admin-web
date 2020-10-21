import './index.less'

import { Dropdown } from 'antd'
import React, { useState } from 'react'
import TableDragSelect from 'react-table-drag-select'
import { addRoundNumPrefix } from 'src/utils/common'

import { buildCells, getRoomMenus } from './roundHelper'

const Rounds2 = ({ allRounds, allRooms, updateRoundsRoom }) => {
  const [contextMenuVisible, setContextMenuVisible] = useState(false)
  const [originCells, roundCells] = buildCells(allRounds)
  const [cells, setCells] = useState(originCells)

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
    updateRoundsRoom(roundIds.join(','), newRoomId)
  }

  return (
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
  )
}

export default Rounds2
