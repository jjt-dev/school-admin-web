import React from 'react'
import { Button, Select, Radio, message } from 'antd'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { NumberByGroup, GroupType } from 'src/utils/const'
import api from 'src/utils/api'
import { debounce } from 'lodash'
import ListHeaderCustom from 'src/components/ListHeaderCustom'
import ListHeaderLeft from 'src/components/ListHeaderLeft'
import ListHeaderRight from 'src/components/ListHeaderRight'
import { buildParameters } from 'src/utils/common'
import useLoading from 'src/hooks/useLoading'

const { Option } = Select

const Header = ({ fetchTable, exam }) => {
  const history = useHistory()
  const [callWithLoading] = useLoading()
  const examinationId = exam.id
  const [groupNum, setGroupNum] = useState(exam.groupNum)
  const [groupType, setGroupType] = useState(exam.groupType)

  const updateGroupNum = (value) => {
    setGroupNum(value)
    saveChange(value, groupType)
  }

  const updateGroupType = debounce((e) => {
    const value = e.target.value
    setGroupType(value)
    saveChange(groupNum, value)
  }, 1000)

  const saveChange = (groupAmount, type) => {
    callWithLoading(async () => {
      const params = {
        examinationId,
        groupAmount,
        type,
      }
      await api.post(
        buildParameters('/examination/examinationStudentGroup', params)
      )
      message.success('修改成功')
      fetchTable()
    })
  }

  return (
    <ListHeaderCustom>
      <ListHeaderLeft>
        <Button
          onClick={() => history.push(`/exam/${examinationId}/round-room`)}
        >
          考场分配
        </Button>
        <Button
          onClick={() => history.push(`/exam/${examinationId}/room-examiner`)}
        >
          考场和考官
        </Button>
      </ListHeaderLeft>
      <ListHeaderRight fetchTable={fetchTable}>
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
      </ListHeaderRight>
    </ListHeaderCustom>
  )
}

export default Header
