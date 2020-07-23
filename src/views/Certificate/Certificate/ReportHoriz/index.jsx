import React, { useState, useEffect } from 'react'
import './index.less'
import { Row, Col, Menu, Dropdown, message, Button } from 'antd'
import {
  BasicInfoPositions,
  ItemPositions,
  ReportBasicInfos,
} from '../../helper'
import { useSelector } from 'react-redux'
import api from 'src/utils/api'
import { getDomain } from 'src/utils/common'
import { useHistory } from 'react-router'
import UploadBgImage from '../UploadBgImage'
import { DefaultImgs } from 'src/utils/const'

const ReportHoriz = ({
  certificateType,
  certificateId,
  status,
  updateBasicInfo,
}) => {
  const history = useHistory()
  const { basicInfos, certificateInEdit } = useSelector(
    (state) => state.certificate
  )
  const [imgUrl, setImgUrl] = useState(DefaultImgs.reportHoriz)

  useEffect(() => {
    if (certificateInEdit?.bgUrl) {
      setImgUrl(certificateInEdit.bgUrl)
    }
  }, [certificateInEdit])

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

  return (
    <div className="report-horiz">
      <div className="report-horiz__action">
        <UploadBgImage callback={setImgUrl} />
        <Button type="primary" onClick={updateTemplate}>
          保存
        </Button>
      </div>
      <div
        className="report-horiz__content"
        style={{
          backgroundImage: `url(${getDomain()}${
            imgUrl ?? DefaultImgs.reportHoriz
          })`,
        }}
      >
        <div className="report-horiz__content-edit">
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
                    <Col key={position} span={12}>
                      <Dropdown
                        overlayClassName="basic-info__content-dropdown"
                        overlay={getMenus(updateBasicInfo, position)}
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
            <div className="basic-info__result-level">
              <span className="result-level__grade">良好</span>
              <span className="result-level__title">综合成绩</span>
            </div>
          </div>
          <div className="results">
            <div>日期: 2020年4月2日</div>
            <div className="results__middle">
              <div className="results__middle-items">
                {ItemPositions.map((position) => {
                  return (
                    <div
                      key={position.id}
                      className="results__middle-items-item"
                    >
                      {position.title}
                    </div>
                  )
                })}
              </div>
              <div className="results__middle-comments">
                <div className="results__middle-comments-item">考官评语</div>
                <div className="examiner-comment__sign">考官签字:</div>
              </div>
            </div>
            <div className="results__remark">
              <div className="results__remark-title">备注:</div>
              <div className="results__remark-content">
                <div>
                  1.考官未打分的科目属于本级别规定不考科目;
                  2.考试合格的学员凭此表领取证书和腰带
                </div>
                <div>
                  3.考试不合格的学员凭补考单进行补考 (限补考一次);
                  4.此表盖章有效
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportHoriz

const getMenus = (updateBasicInfo, position) => (
  <Menu>
    {ReportBasicInfos.map((item) => (
      <Menu.Item
        key={item}
        onClick={() => {
          updateBasicInfo(position, item)
        }}
      >
        {item}
      </Menu.Item>
    ))}
  </Menu>
)
