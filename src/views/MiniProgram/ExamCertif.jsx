import './index.less'

import { Empty } from 'antd'
import React, { useEffect, useState } from 'react'
import useSearch from 'src/hooks/useSearch'
import api from 'src/utils/api'
import ExamCertifPrint from '../PrintExamCertif/ExamCertifPrint'

const ExamCertif = () => {
  const { signId } = useSearch()
  const [template, setTemplate] = useState()
  const [schoolConfig, setSchoolConfig] = useState()
  const [examCertifInfos, setExamCertifInfos] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(
        `/client/examineeIDCardInfo?signId=${signId}`
      )
      setTemplate(result.fileTemplate)
      setSchoolConfig(result.signInfo.schoolInfo)
      const examCertifInfos = []
      result.signInfo.signLevels.forEach((signLevel) => {
        examCertifInfos.push({ ...result, signLevel })
      })
      setExamCertifInfos(examCertifInfos)
    }
    fetchData()
  }, [signId])

  if (!template) {
    return (
      <Empty className="no-exam-certif-template" description="没有准考证模板" />
    )
  }

  return (
    <>
      {schoolConfig && examCertifInfos && (
        <ExamCertifPrint
          template={template}
          examCertifInfos={examCertifInfos}
          schoolConfig={schoolConfig}
        />
      )}
    </>
  )
}

export default ExamCertif
