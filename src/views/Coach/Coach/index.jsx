import React, { useEffect } from 'react'
import './index.less'
import { Form, Input, Button, Radio, message } from 'antd'
import * as coachAction from 'src/actions/coach'
import { useDispatch, useSelector } from 'react-redux'
import { EntityStatus, formItemLayout } from 'src/utils/const'
import { buildParameters } from 'src/utils/common'
import useMutation from 'src/hooks/useMutation'

const { TextArea } = Input

const Coach = ({ match, history }) => {
  const dispatch = useDispatch()
  const { postApi } = useMutation()
  const { coachInEdit } = useSelector((state) => state.coach)
  const coachId = match.params.id
  const isEdit = !!coachId
  const status = isEdit ? EntityStatus.EDIT : EntityStatus.CREATE
  const [form] = Form.useForm()
  const { getFieldDecorator } = form

  useEffect(() => {
    if (coachId) {
      dispatch(coachAction.getCoach(coachId))
    }
  }, [dispatch, coachId])

  const handleSubmit = (e) => {
    e.preventDefault()
    form.validateFields(async (err, values) => {
      if (!err) {
        let path = buildParameters('/coach/edit?', {
          phone: values.phone,
          username: values.name,
          nickname: values.nickname,
          isEnable: values.isEnable,
          note: values.note,
        })
        if (isEdit) {
          path += `&id=${coachId}`
        }
        await postApi(path)
        message.success(`${status}教练成功`)
        history.push('/coaches')
      }
    })
  }

  return (
    <div className="page coach">
      <div className="coach__edit-title">{status}教练</div>
      <Form
        onSubmit={handleSubmit}
        {...formItemLayout}
        className="coach__edit-form"
        form={form}
      >
        <Form.Item label="手机号">
          {getFieldDecorator('phone', {
            initialValue: isEdit ? coachInEdit?.phone : '',
            rules: [{ required: true }],
          })(<Input type="text" placeholder="请输入手机号" />)}
        </Form.Item>
        <Form.Item label="姓名">
          {getFieldDecorator('name', {
            initialValue: isEdit ? coachInEdit?.username : '',
            rules: [{ required: true }],
          })(<Input disabled={isEdit} type="text" placeholder="请输入姓名" />)}
        </Form.Item>
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
        </Form.Item>
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
