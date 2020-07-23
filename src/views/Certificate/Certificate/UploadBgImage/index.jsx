import React from 'react'
import { Upload, message, Button, Icon } from 'antd'
import { getApiRootImg } from 'src/utils/common'

const UploadBgImage = ({ callback }) => {
  const props = {
    name: 'file',
    action: getApiRootImg(),
    showUploadList: false,
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        callback(info.file.response.data)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }

  return (
    <Upload {...props}>
      <Button>
        <Icon type="upload" /> 上传背景图片
      </Button>
    </Upload>
  )
}

export default UploadBgImage
