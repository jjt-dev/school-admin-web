import React from 'react'
import { Modal } from 'antd'
import { domToImage } from 'src/utils/common'
import * as QRCode from 'qrcode.react'

const QRCodeModal = ({ exam, setSelectedExam }) => {
  const { title, hashCode } = exam
  const qrCodeValue = `${process.env.REACT_APP_DOMAIN}?examCode=${hashCode}`

  const saveAsImage = (id) => {
    domToImage(
      id,
      {
        imgName: '考试二维码',
      },
      () => setSelectedExam()
    )
  }

  return (
    <Modal
      wrapClassName="exam-qrcode"
      visible={true}
      onOk={() => saveAsImage(hashCode)}
      onCancel={() => setSelectedExam()}
      cancelText="取消"
      okText="下载"
    >
      <div id={hashCode} className="exam-qrcode__content">
        <div className="exam-qrcode__content-title">考试: {title}</div>
        <div className="exam-qrcode__content-code">
          <QRCode value={qrCodeValue} size={350} />
        </div>
      </div>
    </Modal>
  )
}

export default QRCodeModal
