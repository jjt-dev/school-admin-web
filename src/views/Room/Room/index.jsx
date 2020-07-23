import React, { useEffect } from 'react'
import './index.less'
import { Form, Input, Button, message } from 'antd'
import api from 'src/utils/api'
import * as roomAction from 'src/actions/room'
import * as appAction from 'src/actions/app'
import { useDispatch, useSelector } from 'react-redux'
import { EntityStatus, formItemLayout } from 'src/utils/const'
import { buildParameters } from 'src/utils/common'

const Room = ({ match, history, form }) => {
  const dispatch = useDispatch()
  const { roomInEdit } = useSelector((state) => state.room)
  const roomId = match.params.id
  const isEdit = !!roomId
  const status = isEdit ? EntityStatus.EDIT : EntityStatus.CREATE
  const { getFieldDecorator } = form

  useEffect(() => {
    if (roomId) {
      dispatch(roomAction.getRoom(roomId))
    }
  }, [dispatch, roomId])

  const handleSubmit = (e) => {
    e.preventDefault()
    form.validateFields(async (err, values) => {
      if (!err) {
        const { name, address } = values
        let path = buildParameters('/config/room/edit?', {
          address,
          name,
        })
        if (isEdit) {
          path += `&id=${roomId}`
        }
        await api.post(path)
        message.success(`${status}考场成功`)
        dispatch(appAction.getAllRooms())
        goBack()
      }
    })
  }

  const goBack = () => {
    history.push('/rooms')
  }

  return (
    <div className="page room">
      <div className="room__edit-title">{status}考场</div>
      <Form
        onSubmit={handleSubmit}
        {...formItemLayout}
        className="room__edit-form"
      >
        <Form.Item label="考场">
          {getFieldDecorator('name', {
            initialValue: isEdit ? roomInEdit?.name : '',
            rules: [{ required: true }],
          })(<Input type="text" placeholder="请输入名称" />)}
        </Form.Item>
        <Form.Item label="地点">
          {getFieldDecorator('address', {
            initialValue: isEdit ? roomInEdit?.address : '',
            rules: [{ required: true }],
          })(<Input type="text" placeholder="请输入地点" />)}
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

export default Form.create()(Room)
