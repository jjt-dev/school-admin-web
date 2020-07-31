import { Form, InputNumber } from 'antd'
import React from 'react'
import './index.less'

const FormInputNum = ({ label, name, required, type }) => {
  return (
    <Form.Item
      rules={[{ required: required ?? true }]}
      label={label}
      name={name}
    >
      {type === 1 ? (
        <InputNumber
          className="form-input-number"
          min={0}
          max={100}
          formatter={(value) => `${value}%`}
          parser={(value) => value.replace('%', '')}
        />
      ) : (
        <InputNumber
          className="form-input-number"
          formatter={(value) =>
            `￥ ${value}`.replace(/\B(?=(\d{4})+(?!\d))/g, ',')
          }
          parser={(value) => value.replace(/￥\s?|(,*)/g, '')}
        />
      )}
    </Form.Item>
  )
}

export default FormInputNum
