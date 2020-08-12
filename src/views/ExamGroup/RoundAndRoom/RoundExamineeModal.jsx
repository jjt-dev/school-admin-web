import React, { useState, useEffect } from 'react'
import './index.less'
import { Button, Modal, Table } from 'antd'
import {
  addRoundNumPrefix,
  tableOrder,
  getRow,
  getCustomRow,
  getDateRow,
} from 'src/utils/common'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'
import useMutation from 'src/hooks/useMutation'
import { dragBodyRowComponents } from 'src/utils/dragBodyRow'
import { Genders } from 'src/utils/const'
import useTableFetch from 'src/hooks/useTableFetch'

const RoundExamineeModal = ({ examinationId, roundNum, hideModal }) => {
  const [state, setState] = useState({ examinees: [] })
  const { postApi } = useMutation()
  const tableList = useTableFetch('/examination/examinationStudentGrouped', {
    examinationId,
    roundNum,
  })

  const reorderExaminees = async (examinees) => {
    const payload = examinees.map((item, index) => ({
      examinationGroupId: item.id,
      subOrderNum: index + 1,
    }))
    await postApi(`/examination/changeStudentSubOrderNum`, payload)
  }

  useEffect(() => {
    setState((prev) => ({ ...prev, examinees: tableList.dataSource }))
  }, [tableList.dataSource])

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
      onCancel={hideModal}
      footer={[
        <Button key="back" onClick={hideModal}>
          取消
        </Button>,
      ]}
    >
      <DndProvider backend={HTML5Backend}>
        <Table
          {...tableList}
          columns={columns}
          dataSource={state.examinees}
          components={dragBodyRowComponents}
          onRow={(record, index) => ({
            index,
            moveRow,
          })}
          rowKey="studentId"
        />
      </DndProvider>
    </Modal>
  )
}

export default RoundExamineeModal

const columns = [
  tableOrder,
  getRow('姓名', 'studentName'),
  getCustomRow('性别', (record) => Genders[record.gender]),
  getDateRow('出生日期', 'birthday'),
  getCustomRow(
    '申请级别',
    (record) => `${record.levelName}(${record.levelAlias})`
  ),
]
