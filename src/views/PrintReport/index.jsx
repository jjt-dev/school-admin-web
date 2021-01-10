import './index.less'

import { Empty, Tabs } from 'antd'
import React from 'react'
import { useParams } from 'react-router'
import useFetch from 'src/hooks/useFetch'

import ReportHoriz from './ReportHoriz'
import ReportVertical from './ReportVertical'
import ReportVerticalWithRight from './ReportVerticalWithRight'

const { TabPane } = Tabs

const PrintReport = () => {
  const { signId } = useParams()
  const [examResult] = useFetch(
    `/exam/sign/getStudentExamResult?signId=${signId}`
  )

  return (
    <div className="page print-report">
      {examResult ? (
        <Tabs defaultActiveKey="0">
          <TabPane tab="竖版" key="0">
            <ReportVertical examResultContainer={examResult} />
          </TabPane>
          <TabPane tab="竖版(自定义右半边)" key="1">
            <ReportVerticalWithRight examResultContainer={examResult} />
          </TabPane>
          <TabPane tab="横板" key="2">
            <ReportHoriz examResultContainer={examResult} />
          </TabPane>
        </Tabs>
      ) : (
        <div className="no-exam-results">
          <Empty description="没有考试结果" />
        </div>
      )}
    </div>
  )
}

export default PrintReport
