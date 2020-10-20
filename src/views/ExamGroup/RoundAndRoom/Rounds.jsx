import './index.less'

import React, { useState } from 'react'
import TableDragSelect from 'react-table-drag-select'

const Rounds = ({ allRounds }) => {
  const [originCells, roundCells] = buildCells(allRounds)
  const [cells, setCells] = useState(originCells)
  console.log(55, cells)

  return (
    <TableDragSelect value={cells} onChange={(cells) => setCells(cells)}>
      {roundCells.map((rowRounds, index) => (
        <tr key={index}>
          {rowRounds.map((round) => {
            return <td key={round.id}>{round.id}</td>
          })}
        </tr>
      ))}
    </TableDragSelect>
  )
}

export default Rounds

const buildCells = (allRounds) => {
  const totalRows = Math.ceil(allRounds.length / 10)
  const totalColumns = 10
  const rows = Array(totalRows).fill(0)
  const cells = rows.map(() => Array(totalColumns).fill(false))
  const roundCells = []
  rows.forEach((row, index) => {
    roundCells.push(allRounds.slice(index * 10, index * 10 + 10))
  })
  return [cells, roundCells]
}
