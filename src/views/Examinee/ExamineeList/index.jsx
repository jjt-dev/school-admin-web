import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as examineeAction from 'src/actions/examinee'
import ActionBar from './ActionBar'
import { Modal, Table, message } from 'antd'
import './index.less'
import { examineeListColumns } from '../helper'
import { pagConfig } from 'src/utils/const'
import api from 'src/utils/api'

const { confirm } = Modal

const ExamineeList = ({ history }) => {
  const dispatch = useDispatch()
  const { examineeList, filter, total } = useSelector((state) => state.examinee)
  const { page, rows } = filter.paginator

  useEffect(() => {
    dispatch(examineeAction.getExamineeList(filter))
  }, [dispatch, filter])

  useEffect(() => {
    return () => dispatch(examineeAction.resetStore())
  }, [dispatch])

  const updateFilter = (field, value) => {
    dispatch(examineeAction.updateFilter(field, value))
  }

  const confirmDeleteExaminee = (examinee) => {
    confirm({
      title: '请问您确认要删除该考试吗?',
      content: `考生名: ${examinee.username}`,
      onOk: async () => {
        const result = await api.post(`/coach/del?id=${examinee.id}`)
        if (result.status === 1) {
          message.success('教练考生成功')
        } else {
          message.error(result.msg)
        }
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  return (
    <div className="page examinee-list">
      <div className="examinee-list__title">考生列表</div>
      <ActionBar updateFilter={updateFilter} filter={filter} />
      <Table
        className="examinee-list__table"
        columns={examineeListColumns(history, confirmDeleteExaminee)}
        dataSource={examineeList}
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

export default ExamineeList
