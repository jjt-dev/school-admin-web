import React, { useEffect, useState } from 'react'
import './index.less'
import api from 'src/utils/api'
import { Table, message } from 'antd'
import { roomExaminerColumns } from '../helper'
import { useSelector } from 'react-redux'
import { deepClone } from 'src/utils/common'
import Header from './Header'
import PageListCustom from 'src/components/PageListCustom'

const RoomAndExaminer = ({ match, history }) => {
  const [search, setSearch] = useState('')
  const { id: examId, roomId } = match.params
  const [roomAndExaminer, setRoomAndExaminer] = useState()
  const { allExaminers } = useSelector((state) => state.app)

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(
        `/examination/getExamRoomsAndItsExaminers?examinationId=${examId}&roomId=${roomId}`
      )
      setRoomAndExaminer(result[0])
    }
    fetchData()
  }, [examId, roomId])

  const updateRoomExaminers = (examiner, addOrDelete, isMain) => {
    examiner.isMain = isMain
    let roomExaminers = deepClone(roomAndExaminer.examiners)
    switch (addOrDelete) {
      case 'add':
        roomExaminers[roomExaminers.length] = examiner
        break
      case 'delete':
        roomExaminers = roomExaminers.filter((item) => item.id !== examiner.id)
        break
      default:
        break
    }
    if (isMain) {
      roomExaminers.map((item) => {
        item.isMain = item.id === examiner.id
        return item
      })
    }
    setRoomAndExaminer({ ...roomAndExaminer, examiners: roomExaminers })
  }

  const bindExaminers = async () => {
    const { examiners: roomExaminers } = roomAndExaminer
    const mainExaminer = roomExaminers.find((item) => item.isMain)
    if (!mainExaminer) {
      message.error('请选择一个主考官')
      return
    }
    let path = `/examination/bindExaminers?examinationId=${examId}&roomId=${roomId}&mainExaminerId=${mainExaminer.id}`
    const otherExaminerIds = roomExaminers
      .filter((item) => !item.isMain)
      .map((item) => item.id)
      .join(',')
    if (otherExaminerIds) {
      path += `&otherExaminerIds=${otherExaminerIds}`
    }
    await api.post(path)
    message.success(`绑定考官成功`)
    history.push(`/exam/${examId}/room-examiner`)
  }

  const filterAllExaminers = () => {
    if (search.trim() === '') return allExaminers
    return allExaminers.filter((item) => item.username.indexOf(search) > -1)
  }

  return (
    <PageListCustom title="绑定考官">
      <Header bindExaminers={bindExaminers} setSearch={setSearch} />
      {roomAndExaminer && (
        <Table
          className="room-examiner-table"
          columns={roomExaminerColumns(
            roomAndExaminer.examiners,
            updateRoomExaminers
          )}
          dataSource={filterAllExaminers()}
          rowKey="id"
          size="middle"
          bordered={true}
          footer={() => (
            <span
              className="table-action"
              onClick={() => history.push(`/examiners`)}
            >
              找不到?去添加考官
            </span>
          )}
        />
      )}
    </PageListCustom>
  )
}

export default RoomAndExaminer
