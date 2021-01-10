import './index.less'

import { Tabs } from 'antd'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import usePageForm from 'src/components/PageFormCustom/usePageForm'
import useSearch from 'src/hooks/useSearch'
import ExamGroup from 'src/views/ExamGroup/ExamGroup'
import RoomAndExaminer from 'src/views/ExamGroup/RoomAndExaminer'
import RoomAndExaminerList from 'src/views/ExamGroup/RoomAndExaminerList'
import RoundAndRoom from 'src/views/ExamGroup/RoundAndRoom'
import StudentExamGroup from 'src/views/ExamGroup/StudentExamGroup'
import ExamSign from 'src/views/ExamSign/ExamSign'
import ExamSignDetail from 'src/views/ExamSign/ExamSignDetail'
import ExamSignList from 'src/views/ExamSign/ExamSignList'
import PrintExamCertif from 'src/views/PrintExamCertif'

import Exam from './Exam'

const { TabPane } = Tabs

const compMap = {
  Exam,
  ExamSignList,
  ExamSign,
  ExamSignDetail,
  PrintExamCertif,
  ExamGroup,
  StudentExamGroup,
  RoundAndRoom,
  RoomAndExaminerList,
  RoomAndExaminer,
}

const ExamConfig = () => {
  const history = useHistory()
  const [examId, isEdit] = usePageForm()
  const { key, comp } = useSearch()
  const [activeKey, setActiveKey] = useState(key)

  const handleKeyChange = (key) => {
    const keyCompMap = {
      exam: 'Exam',
      signs: 'ExamSignList',
      group: 'ExamGroup',
      'round-room': 'RoundAndRoom',
      'room-examiner': 'RoomAndExaminerList',
    }
    history.push(`/exam/${examId}/${key}?key=${key}&comp=${keyCompMap[key]}`)
    setActiveKey(key)
  }

  const tabs = [
    { title: '1 编辑考试', key: 'exam' },
    { title: '2 考生报名', key: 'signs' },
    { title: '3 考生分组', key: 'group' },
    { title: '4 配置考场', key: 'round-room' },
    { title: '5 配置考官', key: 'room-examiner' },
  ]

  return (
    <>
      {isEdit && (
        <Tabs
          activeKey={activeKey}
          onChange={handleKeyChange}
          className="page exam-config"
          type="card"
        >
          {tabs.map((tab) => (
            <TabPane key={tab.key} tab={tab.title}>
              {comp && React.createElement(compMap[comp], { examId })}
            </TabPane>
          ))}
        </Tabs>
      )}
      {!isEdit && <Exam />}
    </>
  )
}

export default ExamConfig
