import { Form, Radio } from 'antd'
import React from 'react'

const FormRadioGroup = ({ label, name, options, disabled, initialValue }) => {
  return (
    <Form.Item
      rules={[{ required: true }]}
      label={label}
      name={name}
      initialValue={initialValue ?? options[0].value}
    >
      <Radio.Group disabled={disabled}>
        {options.map((option) => {
          return (
            <Radio key={option.value} value={option.value}>
              {option.title}
            </Radio>
          )
        })}
      </Radio.Group>
    </Form.Item>
  )
}

export default FormRadioGroup
