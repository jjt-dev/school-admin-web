import { Input } from 'antd'
import Button from 'antd/es/button'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import './index.less'

const ListHeader = ({ fetchTable, path, placeholder }) => {
  const history = useHistory()
  const [search, setSearch] = useState('')

  const handleSearch = () => {
    fetchTable({ keyword: search })
  }

  const clearSearch = () => {
    setSearch('')
    fetchTable({ keyword: '' })
  }

  return (
    <div className="list-header">
      <Button type="primary" onClick={() => history.push(path)}>
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
