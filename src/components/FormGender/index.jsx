import { Form, Radio } from 'antd'
import React from 'react'

const FormGender = () => {
  return (
    <Form.Item label="性别" name="gender" rules={[{ required: true }]}>
      <Radio.Group>
        <Radio value={1}>男</Radio>
        <Radio value={0}>女</Radio>
      </Radio.Group>
    </Form.Item>
  )
}

export default FormGender
