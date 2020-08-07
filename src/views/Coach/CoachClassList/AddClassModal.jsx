import React from 'react'
import { Input, message } from 'antd'
import api from 'src/utils/api'
import JjtModal from 'src/components/JjtModal'

const { Search } = Input

const AddClassModal = ({ coachId, callback, hideModal }) => {
  const addClass = async (className) => {
    await api.post(`/coach/class/edit?coachId=${coachId}&name=${className}`)
    message.success('新增班级成功')
    hideModal()
    callback()
  }

  return (
    <JjtModal title="新增班级" customClass="add-coach-class" hide={hideModal}>
      <div className="add-coach-class__content">
        <span>班级名称：</span>
        <Search enterButton="确定" onSearch={addClass} />
      </div>
    </JjtModal>
  )
}

export default AddClassModal
