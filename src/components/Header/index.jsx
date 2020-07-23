import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Divider, Menu, Dropdown } from 'antd'
import { goToLogin } from 'src/utils/api'
import logo from 'src/images/logo.png'
import * as FA from 'react-fontawesome'
import './index.less'
import { local, TOKEN } from 'src/utils/storage'
import ChangePassword from './ChangePassword'

const Header = ({ user }) => {
  const [showChangePwdModal, setShowChangePwdModal] = useState(false)

  const signout = () => {
    local.removeItem(TOKEN)
    goToLogin()
  }

  return (
    <div className="header">
      <div className="header-logo">
        <Link to="/">
          <img src={logo} alt={logo} />
        </Link>
      </div>
      <div className="header-right">
        <div className="header-right__welcome">道馆-管理平台欢迎您！</div>
        <div className="header-right__user">
          <div
            className="header-right__user-password"
            onClick={() => setShowChangePwdModal(true)}
          >
            <FA name="lock" />
            修改密码
          </div>
          <Divider type="vertical" />
          <div className="header-right__user-signout">
            <Dropdown overlay={getLogoutDropdown(signout)}>
              <span>
                <FA name="power-off" />
                {user?.username}
              </span>
            </Dropdown>
          </div>
        </div>
      </div>
      {showChangePwdModal && (
        <ChangePassword setVisible={setShowChangePwdModal} user={user} />
      )}
    </div>
  )
}

export default Header

const getLogoutDropdown = (signout) => {
  return (
    <Menu>
      <Menu.Item onClick={signout}>安全退出</Menu.Item>
    </Menu>
  )
}
