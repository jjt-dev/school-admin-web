import React from 'react'
import { Upload } from 'antd'
import { getApiRootImg, getDomain, compressImage } from 'src/utils/common'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import ImgCrop from 'antd-img-crop'
import 'antd/es/modal/style'
import 'antd/es/slider/style'

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

function beforeUpload(file, callback, limit = 2) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    callback({ valid: false, message: '请上传JPG或PNG格式的照片' })
    return false
  }
  if (file.size / 1024 / 1024 > limit) {
    return compressImage(file, limit)
  }
  return true
}

const buildUrl = (props) => {
  return props.imageUrl ? `${getDomain()}${props.imageUrl}` : ''
}

class ImageUpload extends React.Component {
  state = {
    loading: false,
    imageUrl: buildUrl(this.props),
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, imageUrl: buildUrl(nextProps) })
  }

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        this.props.callback(info.file.response.data)
        this.setState({
          imageUrl,
          loading: false,
        })
      })
    }
  }

  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">照片</div>
      </div>
    )
    const { imageUrl } = this.state
    return (
      <ImgCrop rotate aspect={this.props.aspect ?? 1}>
        <Upload
          disabled={this.props.disabled}
          name="file"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action={getApiRootImg()}
          beforeUpload={(file) =>
            beforeUpload(file, this.props.callback, this.props.limit)
          }
          onChange={this.handleChange}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
          ) : (
            uploadButton
          )}
        </Upload>
      </ImgCrop>
    )
  }
}

export default ImageUpload
