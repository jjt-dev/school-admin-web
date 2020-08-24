import React from 'react'
import { Modal, Form, Icon, Input, message } from 'antd'
import './ChangePassword.less'
import api from 'src/utils/api'
import { formLayout } from 'src/utils/const'
import { pathChangePsd } from 'src/utils/httpUtil'

const ChangePassword = ({ setVisible, user }) => {
  const [form] = Form.useForm()

  const handleOk = async () => {
    const { oldPassword, password: newPsw } = await form.validateFields([
      'oldPassword',
      'password',
      'confirm',
    ])
    await api.post(pathChangePsd({ oldPassword, newPsw }))
    message.success('密码修改成功。')
    setVisible(false)
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
        <Form {...formLayout} className="change-password-form" form={form}>
          <Form.Item label="用户名称">
            <span>{user?.username}</span>
          </Form.Item>
          <Form.Item
            name="oldPassword"
            label="旧密码"
            rules={[{ required: true }]}
            hasFeedback
          >
            <Input.Password
              prefix={<Icon type="lock" />}
              placeholder="请输入旧密码"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="新密码"
            rules={[{ required: true, min: 6 }]}
            hasFeedback
          >
            <Input.Password
              prefix={<Icon type="lock" />}
              placeholder="请输入新密码"
            />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="确认密码"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject('两次输入的密码不一致')
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ChangePassword
