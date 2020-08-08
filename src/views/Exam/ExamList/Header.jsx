import React from 'react'
import { Select } from 'antd'
import { ExamStatus } from 'src/utils/const'
import ListHeaderRight from 'src/components/ListHeaderRight'
import ListHeaderCustom from 'src/components/ListHeaderCustom'
import ListHeaderLeft from 'src/components/ListHeaderLeft'
import LinkBtn from 'src/components/LinkBtn'

const { Option } = Select

const Header = ({ fetchTable, canAddMockExam }) => {
  const handleChangeState = (examState) => {
    fetchTable({ currState: examState })
  }

  const getBtn = (isFormal, examType) => {
    return (
      <LinkBtn type="primary" path={`/exam?isFormal=${isFormal}`} size="small">
        新增{examType}考试
      </LinkBtn>
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
            {Object.keys(ExamStatus).map((key) => (
              <Option key={key} value={ExamStatus[key].id}>
                {ExamStatus[key].title}
              </Option>
            ))}
          </Select>
        </div>
      </ListHeaderRight>
    </ListHeaderCustom>
  )
}

export default Header
