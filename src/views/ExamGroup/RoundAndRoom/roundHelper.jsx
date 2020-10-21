import { Menu } from 'antd'
import React from 'react'

const rowNum = 8

export const getRoomMenus = (allRooms, updateSelectedRoundsRoom) => (
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

export const buildCells = (allRounds) => {
  const totalRows = Math.ceil(allRounds.length / rowNum)
  const rows = Array(totalRows).fill(0)
  const cells = rows.map(() => Array(rowNum).fill(false))
  const roundCells = []
  rows.forEach((row, index) => {
    roundCells.push(allRounds.slice(index * rowNum, index * rowNum + rowNum))
  })
  return [cells, roundCells]
}
