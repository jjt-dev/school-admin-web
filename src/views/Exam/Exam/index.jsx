import './index.less'

import { Tabs } from 'antd'
import React, { useState } from 'react'
import usePageForm from 'src/components/PageFormCustom/usePageForm'
import useSearch from 'src/hooks/useSearch'

import Exam from './Exam'
import ExamSignList from 'src/views/ExamSign/ExamSignList'
import ExamSign from 'src/views/ExamSign/ExamSign'
import PrintExamCertif from 'src/views/PrintExamCertif'
import ExamSignDetail from 'src/views/ExamSign/ExamSignDetail'

const { TabPane } = Tabs

const compMap = {
  Exam,
  ExamSignList,
  ExamSign,
  ExamSignDetail,
  PrintExamCertif,
}

const ExamConfig = ({ history }) => {
  const [examId, isEdit] = usePageForm()
  const { key, comp } = useSearch()
  const [activeKey, setActiveKey] = useState(key)

  const handleKeyChange = (key) => {
    const keyCompMap = {
      exam: 'Exam',
      signs: 'ExamSignList',
    }
    history.push(`/exam/${examId}/${key}?key=${key}&comp=${keyCompMap[key]}`)
    setActiveKey(key)
  }

  return (
    <>
      {isEdit && (
        <Tabs
          activeKey={activeKey}
          onChange={handleKeyChange}
          className="page exam-config"
          type="card"
        >
          <TabPane tab="1 编辑考试" key="exam">
            <Exam />
          </TabPane>
          <TabPane tab="2 考生报名" key="signs">
            {comp && React.createElement(compMap[comp], { examId, history })}
          </TabPane>
          <TabPane tab="3 考生分组" key="group">
            Content of Tab Pane 3
          </TabPane>
          <TabPane tab="4 配置考场" key="room">
            Content of Tab Pane 3
          </TabPane>
          <TabPane tab="5 配置考官" key="examiner">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      )}
      {!isEdit && <Exam />}
    </>
  )
}

export default ExamConfig
