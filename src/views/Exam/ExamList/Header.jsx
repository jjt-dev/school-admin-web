import React from 'react'
import { Button, Select } from 'antd'
import { useHistory } from 'react-router'
import { ExamStates } from 'src/utils/const'
import ListHeaderRight from 'src/components/ListHeaderRight'

const { Option } = Select

const Header = ({ fetchTable, canAddMockExam }) => {
  const history = useHistory()

  const handleChangeState = (examState) => {
    fetchTable('examState', examState)
  }

  return (
    <div className="exam-list__action">
      <div className="exam-list__action-btns">
        <Button
          type="primary"
          onClick={() => history.push('/exam?isFormal=true')}
          size="small"
        >
          新增正式考试
        </Button>
        {canAddMockExam && (
          <Button
            type="primary"
            onClick={() => history.push('/exam?isFormal=false')}
            size="small"
          >
            新增模拟考试
          </Button>
        )}
      </div>
      <ListHeaderRight fetchTable={fetchTable}>
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
      </ListHeaderRight>
    </div>
  )
}

export default Header
