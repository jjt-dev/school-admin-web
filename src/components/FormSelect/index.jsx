import { Form, Select } from 'antd'
import React from 'react'

const { Option } = Select

const FormSelect = ({
  options,
  label,
  name,
  message = `请选择${label}`,
  required,
  initialValue,
  valueKey = 'id',
  titleKey = 'id',
  mode = null,
  hidden = false,
}) => {
  return (
    <Form.Item
      rules={[{ required: required ?? true, message }]}
      label={label}
      name={name}
      initialValue={initialValue}
      hidden={hidden}
    >
      <Select placeholder={message} mode={mode}>
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
