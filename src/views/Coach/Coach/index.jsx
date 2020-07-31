import React, { useEffect, useState } from 'react'
import './index.less'
import { Form, Input, Button, Radio, message } from 'antd'
import { EntityStatus, formLayout } from 'src/utils/const'
import { buildParameters } from 'src/utils/common'
import api from 'src/utils/api'
import { useDispatch } from 'react-redux'
import { getAllCoaches } from 'src/actions/app'
import FormInput from 'src/components/FormInput'

const { TextArea } = Input

const Coach = ({ match, history }) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const coachId = match.params.id
  const isEdit = !!coachId
  const status = isEdit ? EntityStatus.EDIT : EntityStatus.CREATE

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(`/coach/item?id=${coachId}`)
      form.setFieldsValue(result)
    }
    if (coachId) {
      fetchData()
    }
  }, [coachId, form])

  const onFinish = async (values) => {
    if (!!coachId) {
      values.id = coachId
    }
    await api.post(buildParameters(`/client/school/edit`, values))
    message.success(`${status}教练成功`)
    dispatch(getAllCoaches())
    history.push('/coaches')
  }

  return (
    <div className="page coach">
      <div className="coach__edit-title">{status}教练</div>
      <Form
        {...formLayout}
        className="coach__edit-form"
        form={form}
        onFinish={onFinish}
      >
        <FormInput label="手机号" name="phone" />
        <FormInput label="姓名" name="name" />
        <Form.Item label="姓名">
          {getFieldDecorator('name', {
            initialValue: isEdit ? coachInEdit?.username : '',
            rules: [{ required: true }],
          })(<Input disabled={isEdit} type="text" placeholder="请输入姓名" />)}
        </Form.Item>

        {/* 
        <Form.Item label="昵称">
          {getFieldDecorator('nickname', {
            initialValue: isEdit ? coachInEdit?.nickname : '',
          })(<Input type="text" placeholder="请输入昵称" />)}
        </Form.Item>
        <Form.Item label="启用" className="coach__edit-form-enable">
          {getFieldDecorator('isEnable', {
            initialValue: isEdit ? coachInEdit?.isEnable : '',
            rules: [{ required: true }],
          })(
            <Radio.Group>
              <Radio value={true}>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label="描述">
          {getFieldDecorator('note', {
            initialValue: isEdit ? coachInEdit?.note : '',
          })(<TextArea rows={2} placeholder="请输入描述" />)}
        </Form.Item> */}
        <Form.Item className="coach__edit-form--btns">
          <Button
            className="edit-cancel-btn"
            onClick={() => history.push('/coaches')}
          >
            取消
          </Button>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Coach
