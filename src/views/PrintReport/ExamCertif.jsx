import React, { useState, useEffect } from 'react'
import ExamCertifPrint from './ExamCertifPrint'
import api from 'src/utils/api'
import { CertificateTypes } from '../Certificate/helper'
import { message, Tabs } from 'antd'
import ReportVertical from './ReportVertical'
import ReportVerticalWithRight from './ReportVerticalWithRight'
import ReportHoriz from './ReportHoriz'
import { parseSearches } from 'src/utils/common'

const { TabPane } = Tabs

const PrintCertificate = ({ match, location }) => {
  const [examCertifInfo, setExamCertifInfo] = useState()
  const [examResult, setExamResult] = useState()
  const [template, setTemplate] = useState()
  const signLevelId = match.params.signLevelId
  const { type: printType } = parseSearches(location)

  useEffect(() => {
    const fetchData = async () => {
      const examCertifInfo = await api.get(
        `/exam/sign/examineeIDCardInfo?signLevelId=${signLevelId}`
      )
      setExamCertifInfo(examCertifInfo)
    }
    if (printType === 'examCertif') {
      fetchData()
    }
  }, [printType, signLevelId])

  useEffect(() => {
    const fetchData = async () => {
      const examResults = await api.get(
        `/exam/sign/getStudentExamResult?signLevelId=${signLevelId}`
      )
      setExamResult(examResults)
    }
    if (printType === 'report') {
      fetchData()
    }
  }, [printType, signLevelId])

  useEffect(() => {
    const fetchData = async () => {
      const templates = await api.get(`/config/file/page?page=1&rows=1000`)
      const ExamCertifType = Object.values(CertificateTypes).find(
        (item) => item.title === '准考证'
      )
      const template = templates.data.find(
        (item) => item.type === ExamCertifType.id
      )
      if (!template) {
        message.error('请首先创建准考证摸板')
      } else {
        setTemplate(template)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      {printType === 'examCertif' && template && (
        <ExamCertifPrint template={template} examCertifInfo={examCertifInfo} />
      )}
      {printType === 'report' && examResult && (
        <Tabs defaultActiveKey="0" onChange={() => {}}>
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
      )}
      )
    </>
  )
}

export default PrintCertificate
