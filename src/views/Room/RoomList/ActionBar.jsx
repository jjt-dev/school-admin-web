import React from 'react'
import { Button, Input } from 'antd'
import { useState } from 'react'
import { useHistory } from 'react-router'

const ActionBar = ({ updateFilter }) => {
  const history = useHistory()
  const [search, setSearch] = useState('')

  const handleSearch = () => {
    updateFilter('search', search)
  }

  const clearSearch = () => {
    setSearch('')
    updateFilter('search', '')
  }

  return (
    <div className="room-list__action">
      <Button type="primary" onClick={() => history.push('/room')}>
        新增
      </Button>
      <div className="room-list__action-right">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onPressEnter={handleSearch}
          placeholder="请输入考场名或地点"
          style={{ width: 220 }}
        />
        <Button className="mr-10" onClick={handleSearch}>
          搜索
        </Button>
        <Button onClick={clearSearch}>清空</Button>
      </div>
    </div>
  )
}

export default ActionBar
