import React from 'react'
import { Select, Radio, message, Button } from 'antd'
import { useState } from 'react'
import { NumberByGroup, GroupType } from 'src/utils/const'
import api from 'src/utils/api'
import ListHeaderCustom from 'src/components/ListHeaderCustom'
import ListHeaderLeft from 'src/components/ListHeaderLeft'
import ListHeaderRight from 'src/components/ListHeaderRight'
import { buildParameters } from 'src/utils/common'
import useLoading from 'src/hooks/useLoading'

const { Option } = Select

const Header = ({ fetchTable, exam, defaultSearch, fetchUngroup }) => {
  const [callWithLoading] = useLoading()
  const examId = exam.id
  const [groupNum, setGroupNum] = useState(exam.groupNum)
  const [groupType, setGroupType] = useState(exam.groupType)

  const updateGroup = () => {
    callWithLoading(async () => {
      const params = {
        examinationId: examId,
        groupAmount: groupNum,
        type: groupType,
      }
      await api.post(
        buildParameters('/examination/examinationStudentGroup', params)
      )
      message.success('考试分组更新成功')
      fetchTable()
      fetchUngroup()
    })
  }

  return (
    <ListHeaderCustom>
      <ListHeaderLeft>
        <div className="exam-group-action">
          <span>考评分组人数</span>
          <Select
            size="small"
            defaultValue={groupNum}
            style={{ width: 60 }}
            onChange={setGroupNum}
          >
            {NumberByGroup.map((num) => (
              <Option key={num} value={num}>
                {num}
              </Option>
            ))}
          </Select>
          <Radio.Group
            onChange={(e) => setGroupType(e.target.value)}
            defaultValue={groupType}
          >
            {Object.keys(GroupType).map((key) => (
              <Radio key={key} value={Number(key)}>
                {GroupType[key]}
              </Radio>
            ))}
          </Radio.Group>
          <Button type="primary" size="small" onClick={updateGroup}>
            确认分组
          </Button>
        </div>
      </ListHeaderLeft>
      <ListHeaderRight
        fetchTable={fetchTable}
        keyword={defaultSearch.keyword}
      />
    </ListHeaderCustom>
  )
}

export default Header
