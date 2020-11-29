import React, { useState, useEffect } from 'react'
import './index.less'
import { Row, Col, Dropdown, message, Button } from 'antd'
import {
  BasicInfoPositions,
  ItemPositions,
  ReportBasicInfos,
  getMenus,
} from '../../helper'
import { useSelector } from 'react-redux'
import certificateIc1 from 'src/images/certificate_ic1.png'
import certificateIc2 from 'src/images/certificate_ic2.png'
import api from 'src/utils/api'
import { getDomain } from 'src/utils/common'
import { useHistory } from 'react-router'
import UploadBgImage from '../UploadBgImage'
import { DefaultImgs } from 'src/utils/const'
import BgImgPrint from '../BgImgPrint'

const ReportVertical = ({
  certificateType,
  certificateId,
  status,
  updateBasicInfo,
}) => {
  const history = useHistory()
  const [showBgImgModal, setShowBgImgModal] = useState(false)
  const { basicInfos, certificateInEdit } = useSelector(
    (state) => state.certificate
  )
  const [imgUrl, setImgUrl] = useState(DefaultImgs.reportVertical)

  useEffect(() => {
    if (certificateInEdit?.bgUrl) {
      setImgUrl(certificateInEdit.bgUrl)
    }
  }, [certificateInEdit, setImgUrl])

  const findInfo = (position) => {
    return basicInfos.find((info) => info.position === position)
  }

  const updateTemplate = async () => {
    const content = encodeURIComponent(JSON.stringify({ basicInfos }))
    let path = `/config/file/edit?content=${content}&type=${certificateType.id}&bgUrl=${imgUrl}&isActive=true`
    if (certificateId) {
      path += `&id=${certificateId}`
    }
    await api.post(path)
    message.success(`${status}考试成绩单(竖版)成功`)
    history.push(`/certificates`)
  }

  const hideModal = () => {
    setShowBgImgModal(false)
  }

  return (
    <div className="report-vertical">
      <div className="report-vertical__action">
        <UploadBgImage callback={setImgUrl} />
        <Button
          onClick={() => {
            window.open(`${getDomain()}${imgUrl}`, '_blank')
          }}
        >
          打开背景图片
        </Button>
        <Button type="primary" onClick={updateTemplate}>
          保存
        </Button>
      </div>
      <div
        className="report-vertical__content"
        style={{
          backgroundImage: `url(${getDomain()}${
            imgUrl ?? DefaultImgs.reportVertical
          })`,
        }}
      >
        <div className="report-vertical__content-edit">
          <div className="basic-info">
            <div className="basic-info__logo">头像照片</div>
            <div className="basic-info__content">
              <Row>
                <Col span={24} className="ant-dropdown-link">
                  <span className="basic-info__content-school">报考单位</span>
                  <span className="basic-info__content-colon">:</span>
                  <span>_______</span>
                </Col>
                {BasicInfoPositions.map((position) => {
                  const info = findInfo(position)
                  return (
                    <Col key={position} span={position % 2 === 1 ? 13 : 11}>
                      <Dropdown
                        overlayClassName="basic-info__content-dropdown"
                        overlay={getMenus(
                          ReportBasicInfos,
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
          <div className="result-level">
            <img src={certificateIc1} alt="" />
            <span className="result-level__title">良好</span>
            <img src={certificateIc2} alt="" />
          </div>
          <div className="item-result">
            <div className="item-result__title">综合成绩</div>
            <div className="item-result__items">
              {ItemPositions.map((position) => {
                return (
                  <div key={position.id} className="item-result__items-item">
                    {position.title}
                  </div>
                )
              })}
            </div>
            <div className="item-result__comments">
              <div className="item-result__comments-item writing-mode-vertical">
                考官评语
              </div>
              <div className="item-result__comments-item examiner-comment">
                <div className="examiner-comment__sign">【考官】:</div>
              </div>
              <div className="item-result__comments-item writing-mode-vertical">
                备注
              </div>
              <div className="item-result__comments-item examiner-remark">
                <div>1.考官未打分的科目属于本级别规定不考科目</div>
                <div>2.考试合格的学员凭此表领取证书和腰带</div>
                <div>3.考试不合格的学员凭补考单进行补考 (限补考一次)</div>
              </div>
            </div>
          </div>
          <div className="report-vertical__content-edit-date">
            日期: 2020年4月2日
          </div>
        </div>
      </div>
      {showBgImgModal && (
        <BgImgPrint hideModal={hideModal} url={imgUrl} type="vertical" />
      )}
    </div>
  )
}

export default ReportVertical
