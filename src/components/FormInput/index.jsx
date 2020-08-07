import { Form, Input } from 'antd'
import React from 'react'

const { TextArea } = Input

const FormInput = ({
  label,
  name,
  required,
  type,
  disabled,
  rules,
  initialValue,
  hide,
  ...rest
}) => {
  const isDisabled = disabled === true
  let finalRules = [{ required: required ?? true }]
  if (rules) {
    finalRules = rules
  }

  if (hide) return null

  return (
    <Form.Item
      rules={finalRules}
      label={label}
      name={name}
      initialValue={initialValue}
    >
      {type === 'textarea' ? (
        <TextArea rows={2} disabled={isDisabled} {...rest} />
      ) : (
        <Input disabled={isDisabled} type={type} {...rest} />
      )}
    </Form.Item>
  )
}

export default FormInput
