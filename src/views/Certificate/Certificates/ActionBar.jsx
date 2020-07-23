import React from 'react'
import { Button, Modal, Radio } from 'antd'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { CertificateTypes } from '../helper'

const ActionBar = ({ certificateList }) => {
  const history = useHistory()
  const [showModal, setShowModal] = useState(false)

  const handleSelect = (type) => {
    history.push(`/certificate?type=${type}`)
  }

  return (
    <div className="coach-list__action">
      {certificateList.length < Object.values(CertificateTypes).length && (
        <Button type="primary" onClick={() => setShowModal(true)}>
          新增
        </Button>
      )}
      {showModal &&
        certificateList.length < Object.keys(CertificateTypes).length && (
          <SelectCertificateType
            toggleModal={setShowModal}
            handleSelect={handleSelect}
            certificateList={certificateList}
          />
        )}
    </div>
  )
}

export default ActionBar

const SelectCertificateType = ({
  toggleModal,
  handleSelect,
  certificateList,
}) => {
  const [certificateType, setCertificateType] = useState()

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  }

  const availableTypes = Object.values(CertificateTypes).filter(
    (type) => !certificateList.some((item) => item.type === type.id)
  )

  return (
    <Modal
      title="请选择证书类型"
      visible={true}
      onOk={() => handleSelect(certificateType)}
      onCancel={() => toggleModal(false)}
    >
      <Radio.Group
        onChange={(e) => setCertificateType(e.target.value)}
        value={certificateType}
      >
        {availableTypes.map((type) => (
          <Radio style={radioStyle} key={type.id} value={type.id}>
            {type.title}
          </Radio>
        ))}
      </Radio.Group>
    </Modal>
  )
}
