import React from 'react'
import { Tabs } from 'antd'
import School from './School'
import './index.less'
import LevelPrice from './LevelPrice'

const { TabPane } = Tabs

const Parameter = () => {
  return (
    <div className="page parameter">
      <Tabs defaultActiveKey="1" onChange={() => {}}>
        <TabPane tab="道馆信息设置" key="1">
          <School />
        </TabPane>
        <TabPane tab="考评级别设置" key="2">
          <LevelPrice />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Parameter
