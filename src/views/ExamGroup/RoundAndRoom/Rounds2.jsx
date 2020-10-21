import './index.less'

import React from 'react'
import TableDragSelect from 'react-table-drag-select'
import { addRoundNumPrefix } from 'src/utils/common'

const Rounds2 = ({ cells, setCells, roundCells }) => {
  return (
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
  )
}

export default Rounds2
