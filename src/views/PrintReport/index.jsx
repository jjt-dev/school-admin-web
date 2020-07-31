import React from 'react'
import { Empty, Tabs } from 'antd'
import ReportVertical from './ReportVertical'
import ReportVerticalWithRight from './ReportVerticalWithRight'
import ReportHoriz from './ReportHoriz'
import './index.less'
import useFetch from 'src/hooks/useFetch'

const { TabPane } = Tabs

const PrintReport = ({ match }) => {
  const { signId } = match.params
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
