import React, { useEffect } from 'react'
import './index.less'
import loginLogo from 'src/images/login_logo.png'
import { Form, Input, Button, Divider } from 'antd'
import * as FA from 'react-fontawesome'
import api from 'src/utils/api'
import { local, TOKEN, SCHOOL_CODE, PAGE_RELOADED } from 'src/utils/storage'
import * as appAction from 'src/actions/app'
import { useDispatch } from 'react-redux'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

const Login = ({ history }) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  useEffect(() => {
    if (!local.getItem(PAGE_RELOADED)) {
      local.setItem(PAGE_RELOADED, 'true')
      window.location.reload()
    }
  }, [])

  const onFinish = async (values) => {
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

  return (
    <div className="login">
      <div className="login-container">
        <img src={loginLogo} alt="图片" />
        <div className="login-container__content">
          <Form layout="vertical" onFinish={onFinish} form={form}>
            <Form.Item>
              <Divider type="vertical" />
              <span className="login-title">道馆管理</span>
            </Form.Item>
            <Form.Item
              name="username"
              label="用户名"
              rules={[{ required: true }]}
            >
              <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true }]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="请输入密码"
              />
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

export default Login
