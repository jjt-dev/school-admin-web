import { Form } from 'antd'
import React from 'react'
import ImageUpload from '../ImageUpload'

const FormImage = ({ form, label, name, message, imageUrl }) => {
  const handleLogoChange = (imageUrl) => {
    form.setFieldsValue({
      [name]: imageUrl,
    })
  }

  const url = imageUrl ?? form.getFieldValue(name)

  return (
    <Form.Item rules={[{ required: true, message }]} label={label} name={name}>
      <ImageUpload callback={handleLogoChange} imageUrl={url} />
    </Form.Item>
  )
}

export default FormImage
