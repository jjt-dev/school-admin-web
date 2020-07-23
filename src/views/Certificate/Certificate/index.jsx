import React, { useEffect } from 'react'
import './index.less'
import { EntityStatus } from 'src/utils/const'
import { parseSearches } from 'src/utils/common'
import { CertificateTypes } from '../helper'
import ReportVertical from './ReportVertical'
import * as certificateAction from 'src/actions/certificate'
import { useDispatch } from 'react-redux'
import ReportHoriz from './ReportHoriz'
import ExamCertificate from './ExamCertificate'

const Certificate = ({ match, location }) => {
  const dispatch = useDispatch()
  const { type } = parseSearches(location)
  const certificateId = match.params.id
  const isEdit = !!certificateId
  const status = isEdit ? EntityStatus.EDIT : EntityStatus.CREATE
  const certificateType = CertificateTypes[type]

  useEffect(() => {
    if (certificateId) {
      dispatch(certificateAction.getCertificate(certificateId))
    }
  }, [dispatch, certificateId])

  useEffect(() => {
    dispatch(certificateAction.resetCertificate())
  }, [dispatch, type])

  const updateBasicInfo = (position, name) => {
    dispatch(certificateAction.updateBasicInfo(position, name))
  }

  return (
    <div className="page certificate">
      <div className="certificate__title">
        {status}
        {certificateType.title}
      </div>
      {certificateType.key === 'reportVertical' && (
        <ReportVertical
          certificateType={certificateType}
          certificateId={certificateId}
          status={status}
          updateBasicInfo={updateBasicInfo}
        />
      )}
      {certificateType.key === 'reportHoriz' && (
        <ReportHoriz
          certificateType={certificateType}
          certificateId={certificateId}
          status={status}
          updateBasicInfo={updateBasicInfo}
        />
      )}
      {certificateType.key === 'examCertificate' && (
        <ExamCertificate
          certificateType={certificateType}
          certificateId={certificateId}
          status={status}
          updateBasicInfo={updateBasicInfo}
        />
      )}
    </div>
  )
}

export default Certificate
