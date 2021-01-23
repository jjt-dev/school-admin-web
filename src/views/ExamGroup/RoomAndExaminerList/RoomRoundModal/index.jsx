import { Button, Modal, Table, Tag } from 'antd'
import update from 'immutability-helper'
import React, { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import useFetch from 'src/hooks/useFetch'
import useMutation from 'src/hooks/useMutation'
import {
  addNumPrefix,
  addRoundNumPrefix,
  getCustomRow,
  tableOrder,
} from 'src/utils/common'
import { dragBodyRowComponents } from 'src/utils/dragBodyRow'

import RoundExamineeList from './RoundExamineeList'

const RoomRoundModal = ({
  examinationId,
  selectedRoom,
  hideRoomRoundsModal,
}) => {
  const { postApi } = useMutation()
  const [state, setState] = useState({ rounds: [] })
  const [selectedRound, setSelectedRound] = useState()

  const [data] = useFetch(
    `/examination/getExamRoundOfSomeRoom?examinationId=${examinationId}&roomId=${selectedRoom.roomId}`
  )

  useEffect(() => {
    setState((prev) => ({ ...prev, rounds: data }))
  }, [data])

  const reorderRounds = async (rounds) => {
    const payload = rounds.map((item, index) => ({
      id: item.id,
      roundNumOrder: index + 1,
    }))
    await postApi(`/examination/changeRoundNumOrderOfSomeRoom`, payload)
  }

  const moveRow = (dragIndex, hoverIndex) => {
    const { rounds } = state
    const dragRow = rounds[dragIndex]

    const newState = update(state, {
      rounds: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragRow],
        ],
      },
    })
    setState(newState)
    reorderRounds(newState.rounds)
  }

  const title = selectedRound
    ? `${addRoundNumPrefix(selectedRound.roundNum)}场次考生列表`
    : `${addNumPrefix(selectedRoom.roomId)}考场场次列表`

  return (
    <Modal
      width={900}
      title={title}
      visible={true}
      onCancel={() => hideRoomRoundsModal()}
      footer={[
        <Button
          className={!selectedRound ? 'hide' : ''}
          type="primary"
          key="back"
          onClick={() => setSelectedRound()}
        >
          返回场次列表
        </Button>,
        <Button key="cancel" onClick={() => hideRoomRoundsModal()}>
          取消
        </Button>,
      ]}
    >
      {!selectedRound && (
        <DndProvider backend={HTML5Backend}>
          <Table
            size="small"
            columns={getColumns(setSelectedRound)}
            dataSource={state.rounds}
            components={dragBodyRowComponents}
            onRow={(record, index) => ({
              index,
              moveRow,
            })}
            rowKey="id"
            bordered={true}
            pagination={false}
          />
        </DndProvider>
      )}
      {selectedRound && (
        <RoundExamineeList
          examinationId={examinationId}
          roundNum={selectedRound.roundNum}
        />
      )}
    </Modal>
  )
}

export default RoomRoundModal

const getColumns = (setSelectedRound) => [
  tableOrder,
  {
    title: '场次',
    key: 'id',
    render: (text, record, index) => `${addNumPrefix(index + 1)}`,
  },
  getCustomRow('对应的组号', (record) => addRoundNumPrefix(record.roundNum)),
  {
    title: '教练',
    width: 300,
    render: (text, record) => (
      <>
        {record.coachs.map(({ nickname, id }) => (
          <Tag key={id}>{nickname}</Tag>
        ))}
      </>
    ),
  },
  getCustomRow('级别', (record) => `${record.levelName}(${record.levelAlias})`),
  {
    title: '操作',
    render: (text, record) => (
      <span className="table-action" onClick={() => setSelectedRound(record)}>
        查看场次考生
      </span>
    ),
  },
]
