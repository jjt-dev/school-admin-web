import React from 'react'
import { Button, Input, Select, Radio, message } from 'antd'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { NumberByGroup, GroupType } from 'src/utils/const'
import api from 'src/utils/api'
import { debounce } from 'lodash'
import { useDispatch } from 'react-redux'
import * as appAction from 'src/actions/app'

const { Option } = Select

const ActionBar = ({ updateFilter, exam, getGroupStudentList }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const [groupNum, setGroupNum] = useState(exam.groupNum)
  const [groupType, setGroupType] = useState(exam.groupType)
  const examId = exam.id

  const handleSearch = () => {
    updateFilter('search', search)
  }

  const clearSearch = () => {
    setSearch('')
    updateFilter('search', '')
  }

  const updateGroupNum = (value) => {
    setGroupNum(value)
    saveChange(value, groupType)
  }

  const updateGroupType = debounce((e) => {
    const value = e.target.value
    setGroupType(value)
    saveChange(groupNum, value)
  }, 1000)

  const saveChange = async (newGroupNum, newGroupType) => {
    try {
      dispatch(appAction.showLoadingBar())
      await api.post(
        `/examination/examinationStudentGroup?examinationId=${examId}&groupAmount=${newGroupNum}&type=${newGroupType}`
      )
      message.success('修改成功')
    } finally {
      dispatch(appAction.closeLoadingBar())
    }
    getGroupStudentList()
  }

  return (
    <div className="exam-group__action">
      <div className="exam-group__action-left">
        <Button onClick={() => history.push(`/exam/${examId}/round-room`)}>
          考场分配
        </Button>
        <Button onClick={() => history.push(`/exam/${examId}/room-examiner`)}>
          考场和考官
        </Button>
      </div>
      <div className="exam-group__action-right">
        <div className="number-by-group">
          <span>考评分组人数</span>
          <Select
            defaultValue={groupNum}
            style={{ width: 60 }}
            onChange={updateGroupNum}
          >
            {NumberByGroup.map((num) => (
              <Option key={num} value={num}>
                {num}
              </Option>
            ))}
          </Select>
        </div>
        <div className="group-type">
          <Radio.Group onChange={updateGroupType} defaultValue={groupType}>
            {Object.keys(GroupType).map((key) => (
              <Radio key={key} value={Number(key)}>
                {GroupType[key]}
              </Radio>
            ))}
          </Radio.Group>
        </div>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onPressEnter={handleSearch}
          placeholder="请输入名称"
          style={{ width: 180 }}
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
