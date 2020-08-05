import React from 'react'
import { Select, Tag, Checkbox, Radio, Divider } from 'antd'
import { formatTime, addRoundNumPrefix } from 'src/utils/common'
import { Genders } from 'src/utils/const'

export const groupStudentsColumns = (history, examId) => [
  {
    title: '序号',
    key: 'index',
    render: (text, record, index) => `${index + 1}`,
  },
  {
    title: '姓名',
    dataIndex: 'studentName',
    key: 'studentName',
  },
  {
    title: '教练',
    dataIndex: 'coachName',
    key: 'coachName',
  },
  {
    title: '考评级别',
    dataIndex: 'levelName',
    key: 'signStartTimlevelNamee',
  },
  {
    title: '带色',
    dataIndex: 'levelAlias',
    key: 'levelAlias',
  },
  {
    title: '组号',
    dataIndex: 'roundNum',
    key: 'roundNum',
  },
  {
    title: '考试序号',
    dataIndex: 'subOrderNum',
    key: 'subOrderNum',
  },
  {
    title: '操作',
    render: (text, record) => (
      <>
        <span
          className="table-action"
          onClick={() => history.push(`/exam/${examId}/group/${record.id}`)}
        >
          编辑
        </span>
      </>
    ),
  },
]

export const roundRoomColumns = (
  allRooms,
  updateRoundRoom,
  setSelectedRound
) => [
  {
    title: '序号',
    width: '60px',
    key: 'index',
    render: (text, record, index) => `${index + 1}`,
  },
  {
    title: '组号',
    width: '80px',
    dataIndex: 'round_num',
    key: 'round_num',
    render: (text, record) => (
      <span>{addRoundNumPrefix(record.round_num)}</span>
    ),
  },
  {
    title: '教练',
    width: '400px',
    render: (text, record) => (
      <>
        {record.coachs.map(({ nickname, id }) => (
          <Tag key={id}>{nickname}</Tag>
        ))}
      </>
    ),
  },
  {
    title: '考场',
    key: 'roomId',
    render: (text, record) => (
      <span>
        <Select
          placeholder="请选择考场"
          style={{ width: '160px' }}
          defaultValue={record.roomId}
          onChange={(value) => updateRoundRoom(record.id, value)}
        >
          {allRooms.map((room) => (
            <Select.Option key={room.id} value={room.id}>
              {room.name}
            </Select.Option>
          ))}
        </Select>
      </span>
    ),
  },
  {
    title: '操作',
    render: (text, record) => (
      <span className="table-action" onClick={() => setSelectedRound(record)}>
        查看分组考生
      </span>
    ),
  },
]

export const roomExaminerListColumns = (
  history,
  examId,
  handleShowRoomExaminees,
  handleShowRoomRounds
) => [
  {
    title: '序号',
    key: 'index',
    render: (text, record, index) => `${index + 1}`,
  },
  {
    title: '考场',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '考官',
    key: 'roomId',
    render: (text, record) => (
      <>
        {record.examiners.map((examiner, index) => (
          <Tag key={index}>{examiner.username}</Tag>
        ))}
      </>
    ),
  },
  {
    title: '操作',
    width: 220,
    render: (text, record) => (
      <>
        <span
          className="table-action"
          onClick={() =>
            history.push(`/exam/${examId}/room/${record.roomId}/examiners`)
          }
        >
          编辑
        </span>
        <Divider type="vertical" />
        <span
          className="table-action"
          onClick={() => handleShowRoomExaminees(record)}
        >
          查看考场考生
        </span>
        <Divider type="vertical" />
        <span
          className="table-action"
          onClick={() => handleShowRoomRounds(record)}
        >
          查看场次
        </span>
      </>
    ),
  },
]

export const roomExaminerColumns = (roomExaminers, updateRoomExaminers) => {
  const mainExaminer = roomExaminers.find((item) => item.isMain) || {}
  return [
    {
      title: '序号',
      key: 'index',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '姓名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text, record) => <span>{formatTime(record.createTime)}</span>,
    },
    {
      title: '选择',
      render: (text, record) => (
        <Checkbox
          checked={roomExaminers.some((item) => item.id === record.id)}
          onChange={() =>
            updateRoomExaminers(
              record,
              isRoomExaminer(roomExaminers, record) ? 'delete' : 'add'
            )
          }
        />
      ),
    },
    {
      title: '是否是主考官',
      render: (text, record) => (
        <Radio
          checked={mainExaminer.id === record.id}
          onChange={() => {
            updateRoomExaminers(record, 'add', true)
          }}
        />
      ),
    },
  ]
}

const isRoomExaminer = (examiners, examiner) => {
  return examiners.some((item) => item.id === examiner.id)
}

export const roundExamineeColumns = [
  {
    title: '序号',
    key: 'index',
    render: (text, record, index) => `${index + 1}`,
  },
  {
    title: '姓名',
    dataIndex: 'studentName',
    key: 'studentName',
  },
  {
    title: '性别',
    key: 'gender',
    render: (text, record) => `${Genders[record.gender]}`,
  },
  {
    title: '出生日期',
    key: 'birthday',
    render: (text, record) => `${formatTime(record.birthday)}`,
  },
  {
    title: '申请级别',
    key: 'levelName',
    render: (text, record) => `${record.levelName}(${record.levelAlias})`,
  },
]
