import './index.less'

import React, { useState } from 'react'
import TableDragSelect from 'react-table-drag-select'
import { addRoundNumPrefix } from 'src/utils/common'
import { Tag } from 'antd'

const rowNum = 8

const Rounds = ({ allRounds }) => {
  const [originCells, roundCells] = buildCells(allRounds)
  const [cells, setCells] = useState(originCells)

  return (
    <TableDragSelect value={cells} onChange={(cells) => setCells(cells)}>
      {roundCells.map((rowRounds, index) => (
        <tr key={index}>
          {rowRounds.map((round) => {
            return (
              <td key={round.id}>
                <div className="round-content">
                  <div>组号: {addRoundNumPrefix(round.round_num)}</div>
                  <div>
                    教练:
                    {round.coachs.map(({ nickname, id }) => (
                      <Tag key={id}>{nickname}</Tag>
                    ))}
                  </div>
                </div>
              </td>
            )
          })}
        </tr>
      ))}
    </TableDragSelect>
  )
}

export default Rounds

const buildCells = (allRounds) => {
  const totalRows = Math.ceil(allRounds.length / rowNum)
  const rows = Array(totalRows).fill(0)
  const cells = rows.map(() => Array(rowNum).fill(false))
  const roundCells = []
  rows.forEach((row, index) => {
    roundCells.push(allRounds.slice(index * rowNum, index * rowNum + rowNum))
  })
  return [cells, roundCells]
}
