import React from 'react'
import { Modal, Button } from 'antd'

const JjtModal = ({ title, hide, children, customClass }) => {
  return (
    <Modal
      title={title}
      wrapClassName={customClass ?? ''}
      visible={true}
      onCancel={hide}
      footer={[
        <Button key="back" onClick={hide}>
          取消
        </Button>,
      ]}
    >
      {children}
    </Modal>
  )
}

export default JjtModal
