import React, { useState } from 'react'
import { Modal, Form, Icon, Input, message } from 'antd'
import './ChangePassword.less'
import api from 'src/utils/api'
import { formItemLayout } from 'src/utils/const'

const ChangePassword = ({ setVisible, user }) => {
  const [confirmDirty, setConfirmDirty] = useState(false)
  const [form] = Form.useForm()
  const { getFieldDecorator } = form

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的新密码不一致。')
    } else {
      callback()
    }
  }

  const validateToNextPassword = (rule, value, callback) => {
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  const handleConfirmBlur = (e) => {
    const { value } = e.target
    setConfirmDirty(confirmDirty || !!value)
  }

  const handleOk = () => {
    form.validateFields(async (err, values) => {
      if (!err) {
        const { oldPassword, password } = values
        await api.post(
          `/user/changePsw?&oldPassword=${oldPassword}&newPsw=${password}`
        )
        message.success('密码修改成功。')
        setVisible(false)
      } else {
        message.error('请输入正确的密码。')
      }
    })
  }

  return (
    <div>
      <Modal
        wrapClassName="change-password"
        visible={true}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
        cancelText="取消"
        okText="确定"
      >
        <Form {...formItemLayout} className="change-password-form" form={form}>
          <Form.Item label="用户名称">
            <span>{user?.username}</span>
          </Form.Item>
          <Form.Item label="旧密码">
            {getFieldDecorator('oldPassword', {
              rules: [{ required: true }],
            })(
              <Input
                prefix={<Icon type="lock" />}
                type="password"
                placeholder="请输入旧密码"
              />
            )}
          </Form.Item>
          <Form.Item label="新密码">
            {getFieldDecorator('password', {
              rules: [
                { required: true },
                {
                  validator: validateToNextPassword,
                },
              ],
            })(
              <Input
                prefix={<Icon type="lock" />}
                type="password"
                placeholder="请输入新密码"
              />
            )}
          </Form.Item>
          <Form.Item label="确认密码">
            {getFieldDecorator('confirm', {
              rules: [
                { required: true },
                {
                  validator: compareToFirstPassword,
                },
              ],
            })(
              <Input
                prefix={<Icon type="lock" />}
                type="password"
                placeholder="请再次输入新密码"
                onBlur={handleConfirmBlur}
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ChangePassword
