import { Form, Radio } from 'antd'
import React from 'react'

const FormGender = ({ initialValue = 1 }) => {
  return (
    <Form.Item
      label="性别"
      name="gender"
      rules={[{ required: true }]}
      initialValue={initialValue}
    >
      <Radio.Group>
        <Radio value={1}>男</Radio>
        <Radio value={0}>女</Radio>
      </Radio.Group>
    </Form.Item>
  )
}

export default FormGender
