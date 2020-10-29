import './index.less'

import { DownOutlined, LockOutlined, PoweroffOutlined } from '@ant-design/icons'
import { Divider, Dropdown, Menu } from 'antd'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from 'src/images/logo.png'
import { goToLogin } from 'src/utils/api'
import { local, TOKEN } from 'src/utils/storage'

import ChangePassword from './ChangePassword'

const Header = ({ user, courses, changeCourse }) => {
  const [showChangePwdModal, setShowChangePwdModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState()
  const selectedCourseId = local.getItem('course')

  useEffect(() => {
    if (selectedCourseId) {
      setSelectedCourse(
        courses.find((item) => item.courseId === selectedCourseId)
      )
    } else if (courses.length > 0) {
      setSelectedCourse(courses[0])
    }
  }, [courses, selectedCourseId])

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
          <Dropdown overlay={getCoursesDropdown(courses, changeCourse)}>
            <span className="click">
              {selectedCourse?.courseName}
              <DownOutlined />
            </span>
          </Dropdown>
          <div
            className="header-right__user-password click"
            onClick={() => setShowChangePwdModal(true)}
          >
            <LockOutlined />
            修改密码
          </div>
          <Divider type="vertical" />
          <div className="header-right__user-signout click">
            <Dropdown overlay={getLogoutDropdown(signout)}>
              <span>
                <PoweroffOutlined />
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

const getCoursesDropdown = (courses, changeCourse) => {
  return (
    <Menu>
      {courses.map((course) => (
        <Menu.Item
          key={course.courseId}
          onClick={() => changeCourse(course.courseId)}
        >
          {course.courseName}
        </Menu.Item>
      ))}
    </Menu>
  )
}
