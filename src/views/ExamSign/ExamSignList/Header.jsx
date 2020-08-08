import React from 'react'
import { Button, Select } from 'antd'
import { useState } from 'react'
import { SignStates, ExamStatus } from 'src/utils/const'
import CoachClassSelect from './CoachClassSelect'
import ListHeaderCustom from 'src/components/ListHeaderCustom'
import ListHeaderLeft from 'src/components/ListHeaderLeft'
import ListHeaderRight from 'src/components/ListHeaderRight'

const { Option } = Select

const Header = ({
  examSignList,
  fetchTable,
  handleSign,
  examState,
  allCoaches,
  printExamCertifs,
  downloadExamineeInfo,
}) => {
  const [selectedClasses, setSelectedClasses] = useState([])

  const clearSearch = () => {
    setSelectedClasses([])
    fetchTable({ coachId: '', coachClassId: '', keyword: '' })
  }

  const handleChangeSignState = (signState) => {
    fetchTable({ currState: SignStates[signState] ? signState : '' })
  }

  return (
    <ListHeaderCustom>
      <ListHeaderLeft>
        {examState <= ExamStatus.signing.id && (
          <Button size="small" type="primary" onClick={handleSign}>
            报名
          </Button>
        )}
        {examState === ExamStatus.examing.id && (
          <Button size="small" onClick={downloadExamineeInfo}>
            临时报名
          </Button>
        )}
        {examSignList.length > 0 && (
          <Button size="small" type="primary" onClick={printExamCertifs}>
            打印准考证
          </Button>
        )}
        {examState === ExamStatus.finish.id && (
          <Button size="small" onClick={downloadExamineeInfo}>
            下载考试信息
          </Button>
        )}
      </ListHeaderLeft>
      <ListHeaderRight
        fetchTable={fetchTable}
        clearSearchCallback={clearSearch}
      >
        <span className="mr-15">当前状态</span>
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
        {allCoaches.length > 0 && (
          <CoachClassSelect
            allCoaches={allCoaches}
            fetchSignList={fetchTable}
            selectedClasses={selectedClasses}
            setSelectedClasses={setSelectedClasses}
          />
        )}
      </ListHeaderRight>
    </ListHeaderCustom>
  )
}

export default Header
