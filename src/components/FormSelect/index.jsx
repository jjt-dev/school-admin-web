import { Form, Select } from 'antd'
import React from 'react'

const { Option } = Select

const FormSelect = ({
  options,
  label,
  name,
  message,
  required,
  initialValue,
  valueKey = 'id',
  titleKey = 'id',
}) => {
  return (
    <Form.Item
      rules={[{ required: required ?? true, message }]}
      label={label}
      name={name}
      initialValue={initialValue}
    >
      <Select placeholder={message}>
        {options.map((item) => (
          <Option key={item[valueKey]} value={item[valueKey]}>
            {item[titleKey]}
          </Option>
        ))}
      </Select>
    </Form.Item>
  )
}

export default FormSelect
