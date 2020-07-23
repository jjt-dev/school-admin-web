import React, { useEffect, useState } from 'react'
import './index.less'
import { Form, Input, Button, message, Radio } from 'antd'
import api from 'src/utils/api'
import * as examinerAction from 'src/actions/examiner'
import * as appAction from 'src/actions/app'
import { useDispatch, useSelector } from 'react-redux'
import { EntityStatus, formItemLayout } from 'src/utils/const'
import Avatar from 'src/components/Avatar'
import { buildParameters } from 'src/utils/common'

const { TextArea } = Input

const Examiner = ({ match, history, form }) => {
  const dispatch = useDispatch()
  const { examinerInEdit } = useSelector((state) => state.examiner)
  const [avatar, setAvatar] = useState({
    pristine: true,
    valid: false,
    faceUrl: '',
  })
  const examinerId = match.params.id
  const isEdit = !!examinerId
  const status = isEdit ? EntityStatus.EDIT : EntityStatus.CREATE
  const { getFieldDecorator } = form

  useEffect(() => {
    if (examinerId) {
      dispatch(examinerAction.getExaminer(examinerId))
    }
  }, [dispatch, examinerId])

  useEffect(() => {
    if (examinerInEdit) {
      setAvatar((pre) => ({
        ...pre,
        faceUrl: examinerInEdit.faceUrl,
        valid: true,
      }))
    }
  }, [examinerInEdit])

  const handleSubmit = (e) => {
    e.preventDefault()
    setAvatar({ ...avatar, pristine: false })
    form.validateFields(async (err, values) => {
      if (!err && avatar.valid) {
        let path = buildParameters('/examiner/edit?', {
          phone: values.phone,
          username: values.name,
          password: values.password,
          isEnable: values.isEnable,
          faceUrl: avatar.faceUrl,
          note: values.note,
          number: values.examinerNum,
        })
        if (isEdit) {
          path += `&id=${examinerId}`
        }
        await api.post(path)
        message.success(`${status}考官成功`)
        dispatch(appAction.getAllExaminers())
        goBack()
      }
    })
  }

  const handleAvatarChange = (payload) => {
    setAvatar({ ...payload, pristine: false })
  }

  const goBack = () => {
    history.push('/examiners')
  }

  return (
    <div className="page examiner">
      <div className="examiner__edit-title">{status}考官</div>
      <Form
        onSubmit={handleSubmit}
        {...formItemLayout}
        className="examiner__edit-form"
      >
        <Form.Item label="姓名">
          {getFieldDecorator('name', {
            initialValue: isEdit ? examinerInEdit?.username : '',
            rules: [{ required: true }],
          })(<Input type="text" placeholder="请输入姓名" disabled={isEdit} />)}
        </Form.Item>
        <Form.Item label="考官编号">
          {getFieldDecorator('examinerNum', {
            initialValue: isEdit ? examinerInEdit?.number : '',
            rules: [{ required: true }],
          })(
            <Input type="text" placeholder="请输入考官编号" disabled={isEdit} />
          )}
        </Form.Item>
        <Form.Item label="手机号">
          {getFieldDecorator('phone', {
            initialValue: isEdit ? examinerInEdit?.phone : '',
            rules: [{ required: true }],
          })(<Input type="text" placeholder="请输入手机号" />)}
        </Form.Item>
        {!isEdit && (
          <Form.Item label="密码">
            {getFieldDecorator('password', {
              rules: [{ required: !isEdit }],
            })(<Input type="text" placeholder="请输入密码" />)}
          </Form.Item>
        )}
        <Form.Item label="照片" className="examiner__edit-form-avatar">
          {(!isEdit || examinerInEdit) && (
            <Avatar
              callback={handleAvatarChange}
              imageUrl={examinerInEdit?.faceUrl}
            />
          )}
          {!avatar.pristine && !avatar.valid && (
            <span className="examiner__edit-form-avatar-error">
              {`${avatar.message ?? '请上传头像图片'}`}
            </span>
          )}
        </Form.Item>
        <Form.Item label="启用" className="examiner__edit-form-enable">
          {getFieldDecorator('isEnable', {
            initialValue: isEdit ? examinerInEdit?.isEnable : '',
            rules: [{ required: true }],
          })(
            <Radio.Group>
              <Radio value={true}>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label="简历">
          {getFieldDecorator('note', {
            initialValue: isEdit ? examinerInEdit?.note : '',
          })(<TextArea rows={2} placeholder="请输入描述" />)}
        </Form.Item>
        <Form.Item className="examiner__edit-form--btns">
          <Button className="edit-cancel-btn" onClick={goBack}>
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

export default Form.create()(Examiner)
