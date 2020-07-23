import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as roomAction from 'src/actions/room'
import ActionBar from './ActionBar'
import { Modal, Table, message } from 'antd'
import './index.less'
import { roomListColumns } from '../helper'
import { pagConfig } from 'src/utils/const'
import { useHistory } from 'react-router'
import api from 'src/utils/api'

const { confirm } = Modal

const RoomList = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { roomList, filter, total } = useSelector((state) => state.room)
  const { page, rows } = filter.paginator

  useEffect(() => {
    dispatch(roomAction.geRoomList(filter))
  }, [dispatch, filter])

  useEffect(() => {
    return () => dispatch(roomAction.resetStore())
  }, [dispatch])

  const updateFilter = (field, value) => {
    dispatch(roomAction.updateFilter(field, value))
  }

  const confirmDeleteRoom = (room) => {
    confirm({
      title: '请问您确认要删除该考场吗?',
      content: `考场名: ${room.name}`,
      onOk: async () => {
        await api.post(`/config/room/del?id=${room.id}`)
        message.success('删除考场成功')
        dispatch(roomAction.geRoomList(filter))
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  return (
    <div className="page room-list">
      <div className="room-list__title">考场列表</div>
      <ActionBar updateFilter={updateFilter} filter={filter} />
      <Table
        className="room-list__table"
        columns={roomListColumns(history, confirmDeleteRoom)}
        dataSource={roomList}
        rowKey="id"
        size="middle"
        bordered={true}
        pagination={{
          ...pagConfig,
          current: page,
          pageSize: rows,
          total,
        }}
        onChange={({ current, pageSize }) =>
          updateFilter('paginator', { page: current, rows: pageSize })
        }
      />
    </div>
  )
}

export default RoomList
