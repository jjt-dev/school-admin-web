import React, { useEffect, useState } from 'react'
import { Menu } from 'antd'
import * as FA from 'react-fontawesome'
import './index.less'
import { useHistory, useLocation } from 'react-router'

const SideMenu = () => {
  const history = useHistory()
  const location = useLocation()
  const [selectedKeys, setSelectedKeys] = useState([menus[0].key])

  const handleClick = (e) => {
    const clickedMenu = menus.find((menu) => menu.key === e.key)
    history.push(clickedMenu.path)
  }

  useEffect(() => {
    const menu = menus.find((item) => location.pathname.startsWith(item.prefix))
    if (menu) {
      setSelectedKeys([menu.key])
    }
  }, [location.pathname, setSelectedKeys])

  return (
    <Menu
      className="side-menu"
      selectedKeys={selectedKeys}
      mode="inline"
      onClick={handleClick}
    >
      {Array.from(Array(menus.length).keys()).map((key) => {
        const menu = menus.find((item) => Number(item.key) === key)
        return (
          <Menu.Item key={menu.key}>
            <FA name={menu.icon} />
            <span>{menu.title}</span>
          </Menu.Item>
        )
      })}
    </Menu>
  )
}

export default SideMenu

const menus = [
  {
    key: '0',
    path: '/coaches',
    prefix: '/coach',
    icon: 'user',
    title: '教练管理',
  },
  {
    key: '1',
    path: '/examiners',
    prefix: '/examiner',
    icon: 'user-secret',
    title: '考官管理',
  },
  {
    key: '2',
    path: '/rooms',
    prefix: '/room',
    icon: 'map-marker',
    title: '考场管理',
  },
  {
    key: '4',
    path: '/examinees',
    prefix: '/examinee',
    icon: 'male',
    title: '考生管理',
  },
  // exams在后面是当路由以exam开始的时候优先匹配其他的路由
  {
    key: '3',
    path: '/exams',
    prefix: '/exam',
    icon: 'id-card',
    title: '考试管理',
  },
  {
    key: '5',
    path: '/certificates',
    prefix: '/certificate',
    icon: 'book',
    title: '证书管理',
  },
  {
    key: '6',
    path: '/parameter/1',
    prefix: '/parameter',
    icon: 'file-text',
    title: '参数管理',
  },
]
