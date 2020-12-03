import './index.less'

import { LoadingOutlined, UploadOutlined } from '@ant-design/icons'
import { Alert, Button, Modal, Upload } from 'antd'
import { debounce } from 'lodash'
import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from 'src/utils/api'
import { getSignTemplate } from 'src/utils/common'

const ImportModal = ({ hideModal, fetchTable }) => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const filesRef = useRef([])

  const uploadFiles = debounce(async () => {
    try {
      setLoading(true)
      let params = new FormData()
      params.append('examId', id)
      filesRef.current.forEach((file) => {
        params.append('files', file)
      })
      await api.post(`/exam/sign/importSignInfoFromExcel`, params, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      fetchTable()
      setErrorMsg(null)
    } catch (e) {
      setErrorMsg(e.msg)
    } finally {
      filesRef.current = []
      setLoading(false)
    }
  }, 1000)

  const beforeUpload = (file) => {
    setLoading(true)
    filesRef.current.push(file)
    uploadFiles()
    return false
  }

  return (
    <div>
      <Modal
        title="上传考生信息要求"
        wrapClassName="import-students"
        visible={true}
        onCancel={hideModal}
        footer={[
          <Button key="back" onClick={hideModal} className="mr-10">
            取消
          </Button>,
          <Button
            key="template"
            onClick={() => window.open(getSignTemplate(), '_blank')}
            className="mr-10"
          >
            下载模板
          </Button>,
          <Upload
            name="files"
            key="ok"
            showUploadList={false}
            beforeUpload={beforeUpload}
            multiple
          >
            {!loading && (
              <Button type="primary" icon={<UploadOutlined />}>
                点击上传
              </Button>
            )}
            {loading && (
              <Button type="primary" icon={<LoadingOutlined />}>
                上传中
              </Button>
            )}
          </Upload>,
        ]}
      >
        {errorMsg && <Alert message={errorMsg} type="error" closable />}
        <div>1, 如果没有模板请首先下载excel模板并填写考生信息</div>
        <div>2, 只能选择一个excel文件并且同时选择所有考生的图片</div>
        <div>3, 考生图片命名规则: 姓名+身份证号</div>
      </Modal>
    </div>
  )
}

export default ImportModal
