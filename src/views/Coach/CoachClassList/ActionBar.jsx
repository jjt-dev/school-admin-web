import React, { useState } from 'react'
import { Button, Modal, Input, message } from 'antd'
import api from 'src/utils/api'

const { Search } = Input

const ActionBar = ({ coachId, refetchList }) => {
  const [showAddClassModal, setShowAddClassModal] = useState(false)

  const addClass = async (className) => {
    await api.post(`/coach/class/edit?coachId=${coachId}&name=${className}`)
    message.success('新增班级成功')
    toggleModal()
    refetchList()
  }

  const toggleModal = () => {
    setShowAddClassModal((pre) => !pre)
  }

  return (
    <div className="class-list__action">
      <Button type="primary" onClick={toggleModal}>
        新增
      </Button>
      {showAddClassModal && (
        <Modal
          title="新增班级"
          visible={true}
          wrapClassName="add-coach-class"
          onCancel={toggleModal}
          footer={[
            <Button key="back" onClick={toggleModal}>
              取消
            </Button>,
          ]}
        >
          <div className="add-coach-class__content">
            <span>班级名称：</span>
            <Search enterButton="确定" onSearch={(value) => addClass(value)} />
          </div>
        </Modal>
      )}
    </div>
  )
}

export default ActionBar
