import React, { useState, useEffect } from 'react'
import './index.less'
import { Button, Modal, Table } from 'antd'
import { roundExamineeColumns } from '../helper'
import { addRoundNumPrefix } from 'src/utils/common'
import useListSearch from 'src/hooks/useListSearch'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'
import useMutation from 'src/hooks/useMutation'
import { dragBodyRowComponents } from 'src/utils/dragBodyRow'

const RoundExamineeModal = ({
  examinationId,
  roundNum,
  hideRoundExamineeModal,
}) => {
  const [state, setState] = useState({ examinees: [] })
  const { postApi } = useMutation()
  const { data, refetchList, pagination } = useListSearch(
    '/examination/examinationStudentGrouped',
    {
      examinationId,
      roundNum,
    }
  )

  const reorderExaminees = async (examinees) => {
    const payload = examinees.map((item, index) => ({
      examinationGroupId: item.id,
      subOrderNum: index + 1,
    }))
    await postApi(`/examination/changeStudentSubOrderNum`, payload)
  }

  useEffect(() => {
    setState((prev) => ({ ...prev, examinees: data }))
  }, [data])

  const moveRow = (dragIndex, hoverIndex) => {
    const { examinees } = state
    const dragRow = examinees[dragIndex]

    const newState = update(state, {
      examinees: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragRow],
        ],
      },
    })
    setState(newState)
    reorderExaminees(newState.examinees)
  }

  return (
    <Modal
      width={900}
      title={`${addRoundNumPrefix(roundNum)}分组考生列表`}
      visible={true}
      onCancel={hideRoundExamineeModal}
      footer={[
        <Button key="back" onClick={hideRoundExamineeModal}>
          取消
        </Button>,
      ]}
    >
      <DndProvider backend={HTML5Backend}>
        <Table
          columns={roundExamineeColumns}
          dataSource={state.examinees}
          components={dragBodyRowComponents}
          onRow={(record, index) => ({
            index,
            moveRow,
          })}
          rowKey="studentId"
          size="middle"
          pagination={pagination}
          onChange={(value) => refetchList({ paginator: value })}
        />
      </DndProvider>
    </Modal>
  )
}

export default RoundExamineeModal
