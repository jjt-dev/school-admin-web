import React, { useState, useEffect } from 'react'
import ExamCertifPrint from './ExamCertifPrint'
import { CertificateTypes } from '../Certificate/helper'
import useFetch from 'src/hooks/useFetch'
import { Empty } from 'antd'
import { buildPath } from './helper'
import useListSearch from 'src/hooks/useListSearch'
import './index.less'
import api from 'src/utils/api'
import { useDispatch } from 'react-redux'
import { closeLoadingBar, showLoadingBar } from 'src/actions/app'

const PrintExamCertif = ({ match, location }) => {
  const dispatch = useDispatch()
  const { id: examId, signId } = match.params
  const ExamCertifType = CertificateTypes[2]
  const [template, setTemplate] = useState()
  const [schoolConfig] = useFetch(`/school/item`)
  const { data: templates } = useListSearch(`/config/file/page`, {
    pageSize: 1000,
  })
  const [examCertifInfos, setExamCertifInfos] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const temp = await api.get(buildPath(examId, signId, location))
      const result = []
      temp.forEach((item) => {
        item.signLevels.forEach((signLevel) => {
          result.push({ ...item, signLevel })
        })
      })
      setExamCertifInfos(result)
    }
    fetchData()
  }, [dispatch, examId, location, signId])

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

export default PrintExamCertif
