import './index.less'

import { LoadingOutlined, UploadOutlined } from '@ant-design/icons'
import { Alert, Button, message, Modal, Table, Upload } from 'antd'
import { debounce } from 'lodash'
import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from 'src/utils/api'
import { compressImage, getSignTemplate } from 'src/utils/common'
import { getCustomRow, getRow } from 'src/utils/tableUtil'

const ImportModal = ({ hideModal, fetchTable }) => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const [errorMsgs, setErrorMsgs] = useState([])
  const filesRef = useRef([])
  const imgMaxSize = 200

  const uploadFiles = debounce(async () => {
    try {
      setLoading(true)
      let params = new FormData()
      params.append('examId', id)

      for (let i = 0; i < filesRef.current.length; i++) {
        const imageFile = filesRef.current[i]
        const isMoreThan200k =
          imageFile.type.startsWith('image') &&
          imageFile.size / 1024 > imgMaxSize
        if (isMoreThan200k) {
          const compressedImage = await compressImage(filesRef.current[i])
          filesRef.current[i] = compressedImage
        }
      }

      filesRef.current.forEach((file) => {
        params.append('files', file)
      })
      const result = await api.post(
        `/exam/sign/importSignInfoFromExcel`,
        params,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )

      if (result.length > 0) {
        setErrorMsgs(result)
      } else {
        fetchTable()
        setErrorMsg(null)
        message.success('上传考生信息成功')
        hideModal()
      }
    } catch (e) {
      setErrorMsg(e.msg)
      if (e.includes && e.includes('413 Request Entity Too Large')) {
        setErrorMsg('上传文件大小超过限制或者网络错误，请联系管理员')
      }
    } finally {
      filesRef.current = []
      setLoading(false)
    }
  }, 1000)

  const beforeUpload = (file) => {
    setErrorMsg(null)
    setErrorMsgs([])
    setLoading(true)
    filesRef.current.push(file)
    uploadFiles()
    return false
  }

  return (
    <div>
      <Modal
        width={errorMsgs.length > 0 ? 900 : 500}
        title="上传考生信息要求"
        wrapClassName="import-students"
        visible={true}
        onCancel={hideModal}
        footer={[
          <Button key="back" onClick={hideModal} className="mr-10">
            取消
          </Button>,
          <Button key="template" href={getSignTemplate()} className="mr-10">
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
        <div>
          1, 如果没有模板请首先下载
          <Button type="link" href={getSignTemplate()}>
            excel模板
          </Button>
          并填写考生信息
        </div>
        <div>2, 只能选择一个excel文件并且同时选择所有考生的图片</div>
        <div>
          3, 考生图片命名规则:
          <label className="naming-rule"> 姓名+身份证号</label>
        </div>
        <div>
          4, 图片大小不能超过:<label className="naming-rule"> 200K</label>
        </div>

        {errorMsgs.length > 0 && (
          <Table
            style={{ marginTop: '20px' }}
            columns={columns}
            dataSource={errorMsgs}
            pagination={{ pageSize: 5 }}
            bordered
            size="small"
            title={() => (
              <span style={{ color: 'red', fontWeight: 'bold' }}>
                错误考生信息
              </span>
            )}
          />
        )}
      </Modal>
    </div>
  )
}

export default ImportModal

const columns = [
  getCustomRow('错误行数', (record) => <span>第{record.index}行</span>),
  getRow('身份证号', 'cardId'),
  getRow('姓名', 'studentName', 80),
  getRow('电话', 'phone'),
  getRow('错误信息', 'errInfo'),
]
