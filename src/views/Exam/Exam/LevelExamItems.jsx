import { Form, Select } from 'antd'
import React from 'react'

const { Option } = Select

const LevelExamItems = ({ level, selectItems }) => {
  const itemIds = Object.keys(level.items).map((i) => Number(i))

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
          {level.examItems.map((item) => {
            return (
              <Option key={`all-items-${level.id}-${item.id}`} value={item.id}>
                {item.name}
              </Option>
            )
          })}
        </Select>
      </>
    </Form.Item>
  )
}

export default LevelExamItems
