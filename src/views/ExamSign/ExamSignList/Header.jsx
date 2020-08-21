import React from 'react'
import { Button, Select } from 'antd'
import { useState } from 'react'
import { SignStatus, ExamStatus } from 'src/utils/const'
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
  defaultSearch,
}) => {
  const { coachId } = defaultSearch
  const defaultSelectedClasses = []
  if (coachId) {
    defaultSelectedClasses.push(coachId)
  }
  const [selectedClasses, setSelectedClasses] = useState(defaultSelectedClasses)

  const clearSearch = () => {
    setSelectedClasses([])
    fetchTable({ coachId: '', coachClassId: '', keyword: '' })
  }

  const handleChangeSignStatus = (signStatusId) => {
    fetchTable({ currState: signStatusId })
  }

  return (
    <ListHeaderCustom>
      <ListHeaderLeft>
        {examState <= ExamStatus.signing.id && (
          <Button size="small" type="primary" onClick={handleSign}>
            报名
          </Button>
        )}
        {(examState === ExamStatus.waitForExam.id ||
          examState === ExamStatus.examing.id) && (
          <Button size="small" type="primary" onClick={handleSign}>
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
        keyword={defaultSearch.keyword}
      >
        <span className="mr-15">当前状态</span>
        <Select
          defaultValue={defaultSearch.currState ?? ''}
          style={{ width: 140 }}
          onChange={handleChangeSignStatus}
        >
          <Option value="">所有</Option>
          {Object.values(SignStatus).map((status) => (
            <Option key={status.id} value={status.id}>
              {status.title}
            </Option>
          ))}
        </Select>
        {allCoaches.length > 0 && (
          <CoachClassSelect
            allCoaches={allCoaches}
            fetchSignList={fetchTable}
            selectedClasses={selectedClasses}
            setSelectedClasses={setSelectedClasses}
            defaultSearch={defaultSearch}
          />
        )}
      </ListHeaderRight>
    </ListHeaderCustom>
  )
}

export default Header
