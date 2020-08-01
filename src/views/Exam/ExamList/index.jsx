import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as examAction from 'src/actions/exam'
import ActionBar from './ActionBar'
import { Modal, Table, message } from 'antd'
import './index.less'
import { examListColumns } from '../helper'
import { pagConfig } from 'src/utils/const'
import { useHistory } from 'react-router'
import api from 'src/utils/api'
import QRCodeModal from './QRCodeModal'

const { confirm } = Modal

const ExamList = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [selectedExam, setSelectedExam] = useState()
  const { examList, filter, total } = useSelector((state) => state.exam)
  const { page, rows } = filter.paginator

  useEffect(() => {
    dispatch(examAction.getExamList(filter))
  }, [dispatch, filter])

  useEffect(() => {
    return () => dispatch(examAction.resetStore())
  }, [dispatch])

  const updateFilter = (field, value) => {
    dispatch(examAction.updateFilter(field, value))
  }

  const confirmDeleteExam = (exam) => {
    confirm({
      title: '请问您确认要删除该考试吗?',
      content: `考试名: ${exam.title}`,
      onOk: async () => {
        await api.post(`/examination/del?id=${exam.id}`)
        message.success('删除考试成功')
        dispatch(examAction.getExamList(filter))
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  return (
    <div className="page exam-list">
      <div className="exam-list__title">考试列表</div>
      <ActionBar updateFilter={updateFilter} filter={filter} />
      <Table
        className="exam-list__table"
        columns={examListColumns(history, confirmDeleteExam, setSelectedExam)}
        dataSource={examList}
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
      {selectedExam && (
        <QRCodeModal exam={selectedExam} setSelectedExam={setSelectedExam} />
      )}
    </div>
  )
}

export default ExamList
