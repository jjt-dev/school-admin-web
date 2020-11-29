import { Form } from 'antd'
import React from 'react'
import ImageUpload from '../ImageUpload'
import { useState } from 'react'
import { useEffect } from 'react'

const FormImage = ({ form, label, name, message, imageUrl }) => {
  const [url, setUrl] = useState()

  useEffect(() => {
    setUrl(imageUrl)
  }, [imageUrl])

  const handleLogoChange = (imageUrl) => {
    form.setFieldsValue({
      [name]: imageUrl,
    })
  }

  return (
    <Form.Item
      rules={[{ required: true, message }]}
      label={label}
      name={name}
      shouldUpdate={() => {
        setUrl(form.getFieldValue(name))
      }}
    >
      <ImageUpload callback={handleLogoChange} imageUrl={url} />
    </Form.Item>
  )
}

export default FormImage
