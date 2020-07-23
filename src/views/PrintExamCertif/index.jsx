import React, { useState, useEffect } from 'react'
import ExamCertifPrint from './ExamCertifPrint'
import { CertificateTypes } from '../Certificate/helper'
import useFetch from 'src/hooks/useFetch'
import { Empty } from 'antd'
import { buildPath } from './helper'
import useListSearch from 'src/hooks/useListSearch'
import './index.less'

const PrintExamCertif = ({ match, location }) => {
  const ExamCertifType = CertificateTypes[2]
  const [template, setTemplate] = useState()
  const [schoolConfig] = useFetch(`/school/item`)
  const [examCertifInfo] = useFetch(buildPath(match, location))
  const { data: templates } = useListSearch(`/config/file/page`, {
    pageSize: 1000,
  })

  useEffect(() => {
    setTemplate(templates.find((item) => item.type === ExamCertifType.id))
  }, [ExamCertifType.id, templates])

  if (!template) {
    return (
      <Empty className="no-exam-certif-template" description="没有准考证摸板" />
    )
  }

  return (
    <>
      {schoolConfig && examCertifInfo && (
        <ExamCertifPrint
          template={template}
          examCertifInfo={examCertifInfo}
          schoolConfig={schoolConfig}
        />
      )}
    </>
  )
}

export default PrintExamCertif
