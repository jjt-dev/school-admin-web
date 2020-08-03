import React, { useState } from 'react'
import { Button, Input } from 'antd'
import './index.less'

const ListHeaderRight = ({
  fetchTable,
  placeholder = '请输入查询条件',
  children,
}) => {
  const [search, setSearch] = useState('')

  const handleSearch = () => {
    fetchTable({ keyword: search })
  }

  const clearSearch = () => {
    setSearch('')
    fetchTable({ keyword: '' })
  }

  return (
    <div className="list-header-right">
      {children}
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
  )
}

export default ListHeaderRight
