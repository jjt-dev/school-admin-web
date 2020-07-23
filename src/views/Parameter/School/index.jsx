import React, { useEffect, useState } from 'react'
import './index.less'
import { Form, Input, Button, message } from 'antd'
import api from 'src/utils/api'
import { formItemLayout } from 'src/utils/const'
import Avatar from 'src/components/Avatar'

const { TextArea } = Input

const defaultLogo = {
  pristine: true,
  valid: false,
  logoUrl: '',
}

const School = ({ form }) => {
  const [school, setSchool] = useState()
  const [logo, setLogo] = useState(defaultLogo)
  const { getFieldDecorator } = form

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(`/school/item`)
      setSchool(result)
      setLogo({ ...defaultLogo, logoUrl: result.logoUrl, valid: true })
    }
    fetchData()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setLogo({ ...logo, pristine: false })
    form.validateFields(async (err, values) => {
      if (!err && logo.valid) {
        const { name, address, linkPhone, linkMan, note, website } = values
        let path = `/school/edit?name=${name}&address=${address}&linkPhone=${linkPhone}&linkMan=${linkMan}&logoUrl=${logo.logoUrl}&website=${website}`
        if (note.trim() !== '') {
          path += `&note=${note}`
        }
        await api.post(path)
        message.success(`道馆信息编辑成功`)
      }
    })
  }

  const handleLogoChange = (payload) => {
    setLogo({ ...payload, logoUrl: payload.faceUrl, pristine: false })
  }

  return (
    <div className="school">
      <div className="school__edit-title">道馆信息编辑</div>
      {school && (
        <Form
          onSubmit={handleSubmit}
          {...formItemLayout}
          className="school__edit-form"
        >
          <Form.Item label="名称">
            {getFieldDecorator('name', {
              initialValue: school.name,
              rules: [{ required: true }],
            })(<Input type="text" placeholder="请输入名称" />)}
          </Form.Item>
          <Form.Item label="Logo" className="school__edit-form-logo">
            <Avatar callback={handleLogoChange} imageUrl={school.logoUrl} />
            {!logo.pristine && !logo.valid && (
              <span className="school__edit-form-logo-error">
                {`${logo.message ?? '请上传Logo图片'}`}
              </span>
            )}
          </Form.Item>
          <Form.Item label="地址">
            {getFieldDecorator('address', {
              initialValue: school.address,
              rules: [{ required: true }],
            })(<Input type="text" placeholder="请输入地址" />)}
          </Form.Item>
          <Form.Item label="电话">
            {getFieldDecorator('linkPhone', {
              initialValue: school.linkPhone,
              rules: [{ required: true }],
            })(<Input type="text" placeholder="请输入电话" />)}
          </Form.Item>
          <Form.Item label="联系人">
            {getFieldDecorator('linkMan', {
              initialValue: school.linkMan,
              rules: [{ required: true }],
            })(<Input type="text" placeholder="请输入联系人姓名" />)}
          </Form.Item>
          <Form.Item label="网址">
            {getFieldDecorator('website', {
              initialValue: school.website,
              rules: [{ required: true }],
            })(<Input type="text" placeholder="请输入道馆网址" />)}
          </Form.Item>
          <Form.Item label="道馆介绍">
            {getFieldDecorator('note', {
              initialValue: school.note,
            })(<TextArea rows={2} placeholder="请输入道馆介绍" />)}
          </Form.Item>
          <Form.Item className="school__edit-form--btns">
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  )
}

export default Form.create()(School)
