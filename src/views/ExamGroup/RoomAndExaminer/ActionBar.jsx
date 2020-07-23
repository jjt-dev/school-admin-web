import React from 'react'
import { Button, Input } from 'antd'

const ActionBar = ({ bindExaminers, setSearch }) => {
  return (
    <div className="room-examiner__action">
      <Button type="primary" onClick={bindExaminers}>
        绑定
      </Button>
      <div className="room-examiner__action-right">
        <Input
          onChange={(e) => setSearch(e.target.value)}
          placeholder="请输入考官姓名"
          style={{ width: 220 }}
        />
        <Button>搜索</Button>
      </div>
    </div>
  )
}

export default ActionBar
