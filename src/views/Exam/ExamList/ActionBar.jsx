import React from 'react'
import { Button, Input, Select } from 'antd'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { ExamStates } from 'src/utils/const'

const { Option } = Select

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

  const handleChangeState = (examState) => {
    updateFilter('examState', examState)
  }

  return (
    <div className="exam-list__action">
      <Button type="primary" onClick={() => history.push('/exam')}>
        新增
      </Button>
      <div className="exam-list__action-right">
        <div className="exam-select-state">
          <span>当前状态</span>
          <Select
            defaultValue="all"
            style={{ width: 120 }}
            onChange={handleChangeState}
          >
            <Option value="all">所有</Option>
            {Object.keys(ExamStates).map((key) => (
              <Option key={key} value={key}>
                {ExamStates[key]}
              </Option>
            ))}
          </Select>
        </div>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onPressEnter={handleSearch}
          placeholder="请输入考试名称"
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
