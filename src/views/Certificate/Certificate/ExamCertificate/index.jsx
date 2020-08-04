import React from 'react'
import './index.less'
import { Row, Col, Dropdown, message, Button } from 'antd'
import { BasicInfoPositions, ExamBasicInfos, getMenus } from '../../helper'
import { useSelector } from 'react-redux'
import api from 'src/utils/api'
import { getDomain } from 'src/utils/common'
import { useHistory } from 'react-router'
import useFetch from 'src/hooks/useFetch'
import { DefaultImgs } from 'src/utils/const'

const ExamCertificate = ({
  certificateType,
  certificateId,
  status,
  updateBasicInfo,
}) => {
  const history = useHistory()
  const [schoolConfig] = useFetch(`/school/item`)
  const { basicInfos } = useSelector((state) => state.certificate)

  const findInfo = (position) => {
    return basicInfos.find((info) => info.position === position)
  }

  const updateTemplate = async () => {
    const content = encodeURIComponent(JSON.stringify({ basicInfos }))
    let path = `/config/file/edit?content=${content}&type=${certificateType.id}&isActive=true&bgUrl=${DefaultImgs.examCertif}`
    if (certificateId) {
      path += `&id=${certificateId}`
    }
    await api.post(path)
    message.success(`${status}准考证成功`)
    history.push(`/certificates`)
  }

  return (
    <div className="exam-certificate">
      <div className="exam-certificate__action">
        <Button type="primary" onClick={updateTemplate}>
          保存
        </Button>
      </div>
      <div className="exam-certificate__content">
        <div className="exam-certificate__content-logo">
          {schoolConfig && schoolConfig.logoUrl && (
            <img
              className="exam-certificate__content-logo-school"
              src={`${getDomain()}${schoolConfig.logoUrl}`}
              alt="logo"
            />
          )}
          <div className="exam-certificate__content-logo-jjt" />
        </div>
        <div className="basic-info__content">
          <div className="basic-info">
            <Row>
              {BasicInfoPositions.map((position) => {
                const info = findInfo(position)
                return (
                  <Col key={position} span={12}>
                    <Dropdown
                      overlay={getMenus(
                        ExamBasicInfos,
                        updateBasicInfo,
                        position
                      )}
                    >
                      <a
                        className="ant-dropdown-link"
                        onClick={(e) => e.preventDefault()}
                      >
                        <span className="basic-info__content-title">
                          {info ? info.name : '点击选择'}
                        </span>
                        <span className="basic-info__content-colon">:</span>
                      </a>
                    </Dropdown>
                    <span>_______</span>
                  </Col>
                )
              })}
            </Row>
          </div>
        </div>
        <div className="school-address">
          <div>XX道馆</div>
          <div>https://www.道馆地址.com</div>
        </div>
      </div>
    </div>
  )
}

export default ExamCertificate
