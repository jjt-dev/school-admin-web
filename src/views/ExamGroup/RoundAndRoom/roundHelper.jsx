import { Menu } from 'antd'
import React from 'react'

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
