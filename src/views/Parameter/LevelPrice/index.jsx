import React, { useState } from 'react'
import './index.less'
import { Table, Input, Divider, message } from 'antd'
import api from 'src/utils/api'
import useFetch from 'src/hooks/useFetch'
import { getRow } from 'src/utils/common'
import { getCustomRow, tableOrder } from 'src/utils/tableUtil'
import CustomExamItems from './CustomExamItems'

const LevelPrice = () => {
  const [levelPrices = [], refetchPrices] = useFetch(`/config/level/price/list`)
  const [levelInEditing, setLevelInEditing] = useState(null)
  const [newPrice, setNewPrice] = useState(null)
  const [selectedLevel, setSelectedLevel] = useState()

  const changeLevelPrice = async () => {
    if (newPrice) {
      await api.post(
        `/config/level/price/edit?levelId=${levelInEditing.id}&price=${newPrice}`
      )
      message.success('更新考评等级价格成功')
      refetchPrices()
    }
    clearEdit()
  }

  const clearEdit = () => {
    setLevelInEditing(null)
    setNewPrice(null)
  }

  const columns = [
    tableOrder,
    getRow('级别名称', 'name'),
    getRow('带色', 'alias'),
    getCustomRow('自定义考项', (record) => (
      <span className="table-action" onClick={() => setSelectedLevel(record)}>
        查看
      </span>
    )),
    {
      ...getRow('价格', 'price'),
      render: (text, record) => {
        if (levelInEditing?.id === record.id) {
          return (
            <Input
              min={0}
              style={{ width: '100px' }}
              type="number"
              defaultValue={record.price}
              onChange={(e) => setNewPrice(e.target.value)}
            />
          )
        }
        return <span>{record.price}</span>
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => {
        if (levelInEditing?.id === record.id) {
          return (
            <>
              <span className="table-action" onClick={changeLevelPrice}>
                确定
              </span>
              <Divider type="vertical" />
              <span className="table-action" onClick={clearEdit}>
                取消
              </span>
            </>
          )
        }
        return (
          <span
            className="table-action"
            onClick={() => setLevelInEditing(record)}
          >
            编辑价格
          </span>
        )
      },
    },
  ]

  return (
    <>
      {!selectedLevel && (
        <div className="page page-list level-list">
          <div className="page-list-title">考评等级列表</div>
          <Table
            columns={columns}
            dataSource={levelPrices}
            rowKey="id"
            bordered
          />
        </div>
      )}
      {selectedLevel && (
        <CustomExamItems
          level={selectedLevel}
          hide={() => setSelectedLevel(null)}
        />
      )}
    </>
  )
}

export default LevelPrice
