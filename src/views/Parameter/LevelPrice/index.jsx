import React, { useEffect, useState } from 'react'
import './index.less'
import { Table, Input, Divider, message } from 'antd'
import api from 'src/utils/api'
import { useCallback } from 'react'

const columnWidth = '100px'

const LevelPrice = () => {
  const [levelPrices, setLevelPrices] = useState([])
  const [levelInEditing, setLevelInEditing] = useState(null)
  const [newPrice, setNewPrice] = useState(null)

  const fetchLevels = useCallback(async () => {
    const result = await api.get(`/config/level/price/list`)
    setLevelPrices(result)
  }, [])

  useEffect(() => {
    fetchLevels()
  }, [fetchLevels])

  const changeLevelPrice = async () => {
    if (newPrice) {
      await api.post(
        `/config/level/price/edit?levelId=${levelInEditing.id}&price=${newPrice}`
      )
      message.success('更新考评等级价格成功')
      fetchLevels()
    }
    clearEdit()
  }

  const clearEdit = () => {
    setLevelInEditing(null)
    setNewPrice(null)
  }

  const columns = [
    {
      title: '级别',
      dataIndex: 'id',
      key: 'id',
      width: columnWidth,
    },
    {
      title: '级别名称',
      dataIndex: 'name',
      key: 'name',
      width: columnWidth,
    },
    {
      title: '带色',
      dataIndex: 'alias',
      key: 'alias',
      width: columnWidth,
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      width: columnWidth,
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
      width: columnWidth,
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
    <div className="levels">
      <div className="levels__edit-title">考评等级编辑</div>
      <Table
        className="levels__table"
        columns={columns}
        dataSource={levelPrices}
        rowKey="id"
        size="middle"
        bordered={true}
      />
    </div>
  )
}

export default LevelPrice
