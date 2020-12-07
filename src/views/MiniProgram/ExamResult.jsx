import './index.less'

import { Empty } from 'antd'
import React from 'react'
import useFetch from 'src/hooks/useFetch'
import useSearch from 'src/hooks/useSearch'

import ReportVertical from '../PrintReport/ReportVertical'

const ExamResult = () => {
  const { signId } = useSearch()
  const [examResult] = useFetch(`/client/studentExamResult?signId=${signId}`)

  return (
    <div className="page print-report">
      {examResult ? (
        <ReportVertical examResultContainer={examResult} />
      ) : (
        <div className="no-exam-results">
          <Empty description="没有考试结果" />
        </div>
      )}
    </div>
  )
}

export default ExamResult
