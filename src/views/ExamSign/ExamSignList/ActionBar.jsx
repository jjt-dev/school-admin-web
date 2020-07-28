import React from 'react'
import { Button, Input, Select } from 'antd'
import { useState } from 'react'
import { SignStates } from 'src/utils/const'
import { findExamStateId } from 'src/utils/common'
import CoachClassSelect from './CoachClassSelect'

const { Option } = Select

const ActionBar = ({
  examSignList,
  fetchSignList,
  handleSign,
  examState,
  allCoaches,
  printExamCertifs,
}) => {
  const [search, setSearch] = useState('')
  const [selectedClasses, setSelectedClasses] = useState([])

  const handleSearch = () => {
    fetchSignList({ keyword: search })
  }

  const clearSearch = () => {
    setSearch('')
    setSelectedClasses([])
    fetchSignList({ coachId: '', coachClassId: '', keyword: '' })
  }

  const handleChangeSignState = (signState) => {
    fetchSignList({ currState: SignStates[signState] ? signState : '' })
  }

  return (
    <div className="sign-list__bar">
      <div className="sign-list__bar-btns">
        {examState <= findExamStateId('报名中') && (
          <Button type="primary" onClick={handleSign}>
            报名
          </Button>
        )}
        {examSignList.length > 0 && (
          <Button type="primary" onClick={printExamCertifs}>
            打印准考证
          </Button>
        )}
      </div>
      <div className="sign-list__bar-title">报考列表</div>
      <div className="sign-list__bar-action">
        <div className="exam-select-state">
          <span>当前状态</span>
          <Select
            defaultValue="all"
            style={{ width: 140 }}
            onChange={handleChangeSignState}
          >
            <Option value="all">所有</Option>
            {Object.keys(SignStates).map((key) => (
              <Option key={key} value={key}>
                {SignStates[key]}
              </Option>
            ))}
          </Select>
        </div>
        {allCoaches.length > 0 && (
          <CoachClassSelect
            allCoaches={allCoaches}
            fetchSignList={fetchSignList}
            selectedClasses={selectedClasses}
            setSelectedClasses={setSelectedClasses}
          />
        )}
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onPressEnter={handleSearch}
          placeholder="请输入考生名称"
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
