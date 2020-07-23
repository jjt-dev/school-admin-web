import React from 'react'
import './index.less'
import { Row, Col, Button } from 'antd'
import { getDomain } from 'src/utils/common'
import ReactToPrint from 'react-to-print'
import { BasicInfoPositions } from 'src/views/Certificate/helper'
import { mapExamCertifValue } from '../helper'
import * as QRCode from 'qrcode.react'

class ExamCertifPrint extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      basicInfos: JSON.parse(this.props.template.content).basicInfos,
    }
    this.myRef = React.createRef()
  }

  findInfo = (position) => {
    return this.state.basicInfos.find((info) => info.position === position)
  }

  render() {
    // 目前只能报考一个考试，所以直接取results第一个元素
    const mappedValue = mapExamCertifValue({ ...this.props.examCertifInfo })
    return (
      <div className="page exam-certif-print">
        <div className="exam-certif-print__header">
          <ReactToPrint
            trigger={() => <Button>打印</Button>}
            content={() => this.myRef.current}
          />
        </div>
        <div
          className="exam-certif-print__content"
          ref={this.myRef}
          style={{
            backgroundImage: `url('../../../images/exam-certif-template.png')`,
          }}
        >
          <div
            className="exam-certif-print__content-logo"
            style={{
              backgroundImage: `url(${getDomain()}${
                this.props.examCertifInfo.studentInfo?.studentFaceUrl
              })`,
            }}
          />
          {mappedValue.cardId && (
            <div className="exam-certif-print__content-qrcode">
              <QRCode value={mappedValue.cardId} />
            </div>
          )}
          <div className="basic-info">
            <div className="basic-info__content">
              <Row>
                {BasicInfoPositions.map((position) => {
                  const info = this.findInfo(position)
                  return (
                    <Col key={position} span={12}>
                      {info ? (
                        <>
                          <span className="basic-info__content-title">
                            {info.name}
                          </span>
                          <span className="basic-info__content-colon">:</span>
                          <span>{mappedValue[info.name]}</span>
                        </>
                      ) : (
                        <></>
                      )}
                    </Col>
                  )
                })}
              </Row>
            </div>
          </div>
          <div className="school-address">
            <div>{mappedValue.schoolName}</div>
            <div>{mappedValue.schoolSite}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default ExamCertifPrint
