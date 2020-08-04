import React from 'react'
import { Form, Input, Checkbox, Row, Col } from 'antd'

const LevelRangeItems = ({
  examLevelList,
  handleLevelCheckChange,
  initialValue,
}) => {
  return (
    <Form.Item
      className="exam-level-range"
      label="级别范围"
      name="examLevels"
      initialValue={initialValue}
      validateTrigger="onChange"
      rules={[{ required: true, message: '请选择级别范围' }]}
    >
      <Checkbox.Group style={{ width: '100%' }}>
        {examLevelList &&
          examLevelList.map((level) => (
            <Row key={level.id}>
              <Col>
                <Checkbox
                  value={String(level.id)}
                  onChange={(e) => handleLevelCheckChange(level.id, e)}
                >{`${level.name} (${level.alias})`}</Checkbox>
                <Input
                  disabled
                  value={level.price}
                  addonAfter={<span>元</span>}
                />
              </Col>
            </Row>
          ))}
      </Checkbox.Group>
    </Form.Item>
  )
}

export default LevelRangeItems
