import React from 'react'
import * as queryString from 'query-string'
import moment from 'moment'
import { Divider, message, Switch } from 'antd'
import { EntityStatus, ExamStatus, SignStatus } from './const'
import domtoimage from 'dom-to-image'
import confirm from 'antd/lib/modal/confirm'
import api from './api'
import { Link } from 'react-router-dom'
import Button from 'antd/es/button'

export const parseSearches = (location) => {
  return queryString.parse(location.search)
}

/**
 * @param {*} value long值型的时间值
 * @format {*} format 时间格式
 */
export const formatTime = (value, format = 'YYYY-MM-DD') => {
  if (['string', 'number'].includes(typeof value)) {
    return moment(value).format(format)
  }

  if (Array.isArray(value)) {
    return value.map((item) => moment(item).format(format))
  }

  return []
}

export const findById = (arrs, id) => {
  const result = arrs.find((item) => item.id === id)
  return result ?? {}
}

export const findIndexById = (arrs, id) => {
  const result = arrs.findIndex((item) => item.id === id)
  return result ?? {}
}

export const getApiRootImg = () => process.env.REACT_APP_API_IMAGE

export const getDomain = () => process.env.REACT_APP_DOMAIN

export const addNumPrefix = (value) => {
  const absValue = String(Math.abs(value))
  if (absValue.length === 1) return '00' + absValue
  if (absValue.length === 2) return '0' + absValue
  return value
}

export const addRoundNumPrefix = (value) => {
  const numPrefixed = addNumPrefix(value)
  if (value < 0) {
    return `补考-${numPrefixed}`
  }
  return numPrefixed
}

export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

export const isNotEmpty = (value) => {
  if (value === null || value === undefined) return false
  if (Array.isArray(value)) {
    return value.length > 0
  }
  if (value === 0) return true
  if (typeof value === 'boolean' || typeof value === 'number') return true
  if (value instanceof Object) return value

  return value.trim() !== ''
}

export const chineseDate = () => {
  const da = new Date()
  const year = da.getFullYear() + '年'
  const month = da.getMonth() + 1 + '月'
  const date = da.getDate() + '日'
  return [year, month, date].join('')
}

export const buildParameters = (path, parameters) => {
  path += '?'
  Object.keys(parameters).forEach((key) => {
    if (isNotEmpty(parameters[key])) {
      path += `&${key}=${encodeURIComponent(parameters[key])}`
    }
  })
  return path
}

export const buildFormPath = (path, parameters) => {
  path += '?'
  Object.keys(parameters).forEach((key) => {
    path += `&${key}=${encodeURIComponent(parameters[key] ?? '')}`
  })
  return path
}

// 复制指定内容
export const copyToClipboard = (clipboardContent) => {
  var textArea = document.createElement('textarea')
  textArea.style.position = 'fixed'
  textArea.style.top = 0
  textArea.style.left = 0
  textArea.style.width = '2em'
  textArea.style.height = '2em'
  textArea.style.padding = 0
  textArea.style.border = 'none'
  textArea.style.outline = 'none'
  textArea.style.boxShadow = 'none'
  textArea.style.background = 'transparent'
  textArea.value = clipboardContent
  document.body.appendChild(textArea)
  textArea.select()
  try {
    var msg = document.execCommand('copy') ? '成功' : '失败'
    message.success('复制内容 ' + msg, 0.4)
  } catch (err) {
    message.error('不能使用这种方法复制内容')
  }
  document.body.removeChild(textArea)
}

/**
 * 下载dom为图片
 *
 * @param {*} element dom节点或者id
 * @param {*} options 目前options包含imgName, bgcolor, filter可选属性。
 * filter是一个函数，过滤不包含在下载图片里的node。例如过滤id: node => node.id !== 'new-widget'
 */
export const domToImage = (element, options, callback) => {
  const dom =
    typeof element === 'string' ? document.getElementById(element) : element
  domtoimage.toPng(dom, { ...options }).then(function (dataUrl) {
    const link = document.createElement('a')
    link.download = `${options.imgName ? options.imgName : '未命名图片'}.png`
    link.href = dataUrl
    link.click()
    callback && callback()
  })
}

const toDataURL = (url) => {
  return fetch(url)
    .then((response) => {
      return response.blob()
    })
    .then((blob) => {
      return URL.createObjectURL(blob)
    })
}

export const downloadImg = async (url) => {
  const a = document.createElement('a')
  a.href = await toDataURL(getDomain() + url)
  a.download = ''
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export const confirmDelete = (
  title,
  titleValue,
  path,
  callback,
  contentTitle
) => {
  const entity = {
    status: '删除',
    title,
    titleValue,
    path,
    callback,
    contentTitle,
  }
  confirmUpdate(entity)
}

export const confirmChangeStatus = (
  isEnable,
  title,
  titleValue,
  path,
  callback
) => {
  const entity = {
    status: isEnable ? '禁用' : '启用',
    title,
    titleValue,
    path,
    callback,
  }
  confirmUpdate(entity)
}

export const confirmUpdate = ({
  status,
  title,
  titleValue,
  path,
  callback,
  contentTitle,
}) => {
  confirm({
    title: `请问您确认要${status}该${title}吗?`,
    content: `${contentTitle ?? title}名: ${titleValue}`,
    okText: '确定',
    cancelText: '取消',
    onOk: async () => {
      await api.post(path)
      message.success(`${title}${status}成功`)
      callback && callback()
    },
    onCancel() {
      console.log('Cancel')
    },
  })
}

export const getStatus = (isEdit) => {
  return isEdit ? EntityStatus.EDIT : EntityStatus.CREATE
}

export const tableOrder = {
  title: '序号',
  key: 'index',
  render: (text, record, index) => `${index + 1}`,
}

export const getRow = (title, name, width) => ({
  title,
  dataIndex: name,
  key: name,
  width,
})

export const getDateRow = (title, name) => ({
  title,
  dataIndex: name,
  key: name,
  render: (text, record) => <span>{formatTime(record[name])}</span>,
})

export const getLinkRow = (title, link, placeholderNames) => {
  return {
    title,
    render: (text, record) => {
      let finalLink = link
      placeholderNames.forEach((item) => {
        finalLink = finalLink.replace('::', record[item])
      })
      return <Link to={finalLink}>查看</Link>
    },
  }
}

export const getEnableRow = () => ({
  title: '已启用',
  dataIndex: 'isEnable',
  key: 'isEnable',
  render: (text, record) => <span>{record.isEnable ? '是' : '否'}</span>,
})

export const getSwitchRow = (update, title) => ({
  title: title ?? '状态',
  key: 'isEnable',
  render: (text, record) => {
    return (
      <Switch
        onChange={() => update(record)}
        checkedChildren="启用"
        unCheckedChildren="禁用"
        checked={record.isEnable}
      />
    )
  },
})

export const getActionRow = (getPath, deleteEntity) => ({
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <>
      <Link to={getPath(record)}>编辑</Link>
      {deleteEntity && (
        <>
          <Divider type="vertical" />
          <span
            className="table-action"
            onClick={() => {
              deleteEntity(record)
            }}
          >
            删除
          </span>
        </>
      )}
    </>
  ),
})

export const getViewRow = (title, callback) => ({
  title,
  render: (text, record) => {
    return (
      <span>
        <Button size="small" onClick={() => callback(record)}>
          查看{title}
        </Button>
      </span>
    )
  },
})

export const getDeleteRow = (deleteEntity) => ({
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span
      className="table-action"
      onClick={() => {
        deleteEntity(record)
      }}
    >
      删除
    </span>
  ),
})

export const getDetailRow = (getPath) => ({
  title: '操作',
  key: 'action',
  render: (text, record) => <Link to={getPath(record)}>详情</Link>,
})

export const getCustomRow = (title, getValue, width) => ({
  title,
  width,
  render: (text, record) => <span>{getValue(record)}</span>,
})

export const findExamStatus = (examStatusId) => {
  return Object.values(ExamStatus).find((status) => status.id === examStatusId)
}

export const findSignStatus = (signStatusId) => {
  return Object.values(SignStatus).find((status) => status.id === signStatusId)
}

export const checkIsExaming = (examStatus) =>
  examStatus === ExamStatus.waitForExam.id ||
  examStatus === ExamStatus.examing.id

export const isProdEnv = process.env.REACT_APP_IS_PRODUCTION === 'true'
