import { Modal } from 'antd'
import React from 'react'

const ImportModal = ({ hideModal }) => {
  const handleOk = () => {}

  return (
    <div>
      <Modal
        title="上传考生信息要求"
        wrapClassName="change-password"
        visible={true}
        onOk={handleOk}
        onCancel={hideModal}
        cancelText="取消"
        okText="确定"
      >
        <div>1, 请首先下载excel模板并填写考生信息</div>
        <div>2, 点击确定选择excel和考生图片</div>
        <div>3, 考生图片命名规则: 姓名+身份证号</div>
      </Modal>
    </div>
  )
}

export default ImportModal
