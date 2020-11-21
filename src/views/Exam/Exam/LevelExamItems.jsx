import { Col, Form, Input, Row, Select } from 'antd'
import React from 'react'

const { Option } = Select

const LevelExamItems = ({
  level,
  examItemList,
  selectItems,
  updateItemRatio,
}) => {
  const itemIds = Object.keys(level.items).map((i) => Number(i))
  const itemRatio = (100 / itemIds.length).toFixed(0)

  return (
    <Form.Item label={`${level.name}考项`} className="exam-level-item">
      <>
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder={`请选择${level.name}的考项`}
          defaultValue={itemIds}
          onChange={(value) => selectItems(level.id, value)}
        >
          {examItemList.map((item) => {
            return (
              <Option key={`all-items-${level.id}-${item.id}`} value={item.id}>
                {item.name}
              </Option>
            )
          })}
        </Select>
        {itemIds.map((itemId, index) => {
          const item = examItemList.find((item) => item.id === itemId)
          return (
            <Row
              key={`selected-items-${level.id}-${item.id}`}
              className={`selected-items-${index}`}
            >
              <Col>
                <span>{item.name}</span>
                <Input
                  value={`${itemRatio}%`}
                  style={{ width: '80px' }}
                  readOnly
                />
              </Col>
            </Row>
          )
        })}
      </>
    </Form.Item>
  )
}

export default LevelExamItems
