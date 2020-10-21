import './index.less'

import { Dropdown } from 'antd'
import React from 'react'
import TableDragSelect from 'react-table-drag-select'
import { addRoundNumPrefix } from 'src/utils/common'

import { getRoomMenus } from './roundHelper'

const Rounds2 = ({
  cells,
  setCells,
  allRooms,
  updateSelectedRoundsRoom,
  contextMenuVisible,
  setContextMenuVisible,
  roundCells,
}) => {
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
