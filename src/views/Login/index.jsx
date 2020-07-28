import React from 'react'
import './index.less'
import loginLogo from 'src/images/login_logo.png'
import { Form, Icon, Input, Button, Divider } from 'antd'
import * as FA from 'react-fontawesome'
import api from 'src/utils/api'
import { local, TOKEN, SCHOOL_CODE } from 'src/utils/storage'
import * as appAction from 'src/actions/app'
import { useDispatch } from 'react-redux'

const Login = ({ form, history }) => {
  const dispatch = useDispatch()
  const { getFieldDecorator } = form

  const handleSubmit = (e) => {
    e.preventDefault()
    form.validateFields(async (err, values) => {
      if (!err) {
        const { username, password } = values
        try {
          const result = await api.post(
            `/common/login?username=${username}&password=${password}&schoolCode=${local.getItem(
              SCHOOL_CODE
            )}`
          )
          local.setItem(TOKEN, result)
          dispatch(appAction.getUserInfo())
          history.push('/')
        } catch (e) {
          console.log(e)
        }
      }
    })
  }

  return (
    <div className="login">
      <div className="login-container">
        <img src={loginLogo} alt="图片" />
        <div className="login-container__content">
          <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item>
              <Divider type="vertical" />
              <span className="login-title">道馆管理</span>
            </Form.Item>
            <Form.Item>
              <span className="login-item-title">手机号</span>
              {getFieldDecorator('username', {
                rules: [{ required: true }],
              })(
                <Input
                  prefix={<Icon type="user" />}
                  placeholder="请输入手机号"
                />
              )}
            </Form.Item>
            <Form.Item>
              <span className="login-item-title">密码</span>
              {getFieldDecorator('password', {
                rules: [{ required: true }],
              })(
                <Input
                  prefix={<Icon type="lock" />}
                  type="password"
                  placeholder="请输入密码"
                />
              )}
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form>
        </div>
        <FA name="check-circle" />
      </div>
    </div>
  )
}

export default Form.create()(Login)
