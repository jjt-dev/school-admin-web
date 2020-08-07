import React from 'react'
import PageList from 'src/components/PageList'
import { getActionRow, getRow, tableOrder } from 'src/utils/common'

const RoomList = () => {
  return <PageList columns={getColumns} />
}

export default RoomList

const getColumns = (deleteRoom) => [
  tableOrder,
  getRow('名称', 'name'),
  getRow('地点', 'address'),
  getActionRow((record) => `/room/${record.id}`, deleteRoom),
]
