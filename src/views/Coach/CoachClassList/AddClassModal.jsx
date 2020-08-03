import React from 'react'
import { Button, Modal, Input, message } from 'antd'
import api from 'src/utils/api'

const { Search } = Input

const AddClassModal = ({ coachId, callback, hideModal }) => {
  const addClass = async (className) => {
    await api.post(`/coach/class/edit?coachId=${coachId}&name=${className}`)
    message.success('新增班级成功')
    hideModal()
    callback()
  }

  return (
    <Modal
      title="新增班级"
      visible={true}
      wrapClassName="add-coach-class"
      onCancel={hideModal}
      footer={[
        <Button key="back" onClick={hideModal}>
          取消
        </Button>,
      ]}
    >
      <div className="add-coach-class__content">
        <span>班级名称：</span>
        <Search enterButton="确定" onSearch={addClass} />
      </div>
    </Modal>
  )
}

export default AddClassModal
