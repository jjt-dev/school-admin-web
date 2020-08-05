import React from 'react'
import { Button, Select } from 'antd'
import { useHistory } from 'react-router'
import { ExamStates } from 'src/utils/const'
import ListHeaderRight from 'src/components/ListHeaderRight'
import ListHeaderCustom from 'src/components/ListHeaderCustom'
import ListHeaderLeft from 'src/components/ListHeaderLeft'

const { Option } = Select

const Header = ({ fetchTable, canAddMockExam }) => {
  const history = useHistory()

  const handleChangeState = (examState) => {
    fetchTable({ currState: examState })
  }

  const getBtn = (isFormal, examType) => {
    return (
      <Button
        type="primary"
        onClick={() => history.push(`/exam/isFormal=${isFormal}`)}
        size="small"
      >
        新增{examType}考试
      </Button>
    )
  }

  return (
    <ListHeaderCustom>
      <ListHeaderLeft>
        {getBtn('true', '正式')}
        {canAddMockExam && getBtn('false', '模拟')}
      </ListHeaderLeft>
      <ListHeaderRight fetchTable={fetchTable}>
        <div className="exam-select-state">
          <span>当前状态</span>
          <Select
            defaultValue=""
            style={{ width: 120 }}
            onChange={handleChangeState}
          >
            <Option value="">所有</Option>
            {Object.keys(ExamStates).map((key) => (
              <Option key={key} value={key}>
                {ExamStates[key]}
              </Option>
            ))}
          </Select>
        </div>
      </ListHeaderRight>
    </ListHeaderCustom>
  )
}

export default Header
