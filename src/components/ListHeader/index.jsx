import { Button, Input } from 'antd'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import './index.less'

const ListHeader = ({
  fetchTable,
  addCallback,
  placeholder = '请输入查询条件',
}) => {
  const history = useHistory()
  const [search, setSearch] = useState('')

  const handleSearch = () => {
    fetchTable({ keyword: search })
  }

  const clearSearch = () => {
    setSearch('')
    fetchTable({ keyword: '' })
  }

  const handleAdd = () => {
    if (typeof addCallback === 'string') {
      history.push(addCallback)
      return
    }
    addCallback()
  }

  return (
    <div className="list-header">
      <Button type="primary" onClick={handleAdd}>
        新增
      </Button>
      <div className="list-header-right">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onPressEnter={handleSearch}
          placeholder={placeholder}
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

export default ListHeader
