import React from 'react'
import './index.less'
import { Row, Col, Button, Select } from 'antd'
import { getDomain } from 'src/utils/common'
import ReactToPrint from 'react-to-print'
import { BasicInfoPositions } from 'src/views/Certificate/helper'
import { mapExamCertifValue } from '../helper'
import * as QRCode from 'qrcode.react'

const { Option } = Select

class ExamCertifPrint extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      basicInfos: JSON.parse(this.props.template.content).basicInfos,
      selectedPage: null,
      numByPage: 50,
    }
    this.myRef = React.createRef()
  }

  findInfo = (position) => {
    return this.state.basicInfos.find((info) => info.position === position)
  }

  handlePageChange = (page) => {
    this.setState({ ...this.state, selectedPage: page })
  }

  render() {
    const { numByPage, selectedPage } = this.state
    const { isMiniProgram, examCertifInfos } = this.props
    const totalNum = examCertifInfos.length
    const passMaxPrintNum = totalNum > numByPage
    let realPrintInfos = examCertifInfos
    if (passMaxPrintNum && selectedPage !== null) {
      realPrintInfos = examCertifInfos.slice(
        numByPage * selectedPage,
        numByPage * (selectedPage + 1)
      )
    }

    return (
      <div className="page exam-certif-print">
        {!isMiniProgram && (
          <div className="exam-certif-print__header">
            {passMaxPrintNum && (
              <PageNumSelect
                totalNum={totalNum}
                numByPage={numByPage}
                handlePageChange={this.handlePageChange}
              />
            )}
            <ReactToPrint
              trigger={() => (
                <Button disabled={passMaxPrintNum && selectedPage === null}>
                  打印
                </Button>
              )}
              content={() => this.myRef.current}
            />
          </div>
        )}
        <div className="exam-certif-print__content" ref={this.myRef}>
          {realPrintInfos.map((examCertifInfo, index) => {
            const mappedValue = mapExamCertifValue({ ...examCertifInfo })
            return (
              <div
                className={`exam-certif-print__content-item mini-program-${isMiniProgram}`}
                key={index}
              >
                <div className="exam-certif-print__content-item-logo">
                  {this.props.schoolConfig.logoUrl && (
                    <img
                      className="exam-certif-print__content-item-logo-school"
                      src={`${getDomain()}${this.props.schoolConfig.logoUrl}`}
                      alt="logo"
                    />
                  )}
                  <div className="exam-certif-print__content-item-logo-jjt" />
                </div>
                <div
                  className="exam-certif-print__content-item-avatar"
                  style={{
                    backgroundImage: `url(${getDomain()}${
                      examCertifInfo.studentInfo?.studentFaceUrl
                    })`,
                  }}
                />
                {mappedValue.cardId && (
                  <div className="exam-certif-print__content-item-qrcode">
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
                                <span className="basic-info__content-colon">
                                  :
                                </span>
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
            )
          })}
        </div>
      </div>
    )
  }
}

export default ExamCertifPrint

const PageNumSelect = ({ totalNum, numByPage, handlePageChange }) => {
  const totalPages = Math.ceil(totalNum / numByPage)
  const pageArray = Array(totalPages).fill(0)
  return (
    <Select
      style={{ width: 180 }}
      onChange={handlePageChange}
      placeholder="请选择要打印的页数"
    >
      {pageArray.map((item, index) => {
        const end =
          index < pageArray.length - 1 ? numByPage * (index + 1) : totalNum

        return (
          <Option key={index} value={index}>
            第{numByPage * index + 1}到{end}个准考证
          </Option>
        )
      })}
    </Select>
  )
}
