import * as queryString from 'query-string'
import moment from 'moment'
import { message } from 'antd'
import { ExamStates, SignStates } from './const'
import domtoimage from 'dom-to-image'

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
  if (!value) return false
  if (Array.isArray(value)) {
    return value.length > 0
  }
  if (typeof value === 'boolean' || typeof value === 'number') return value
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
  Object.keys(parameters).forEach((key) => {
    if (typeof isNotEmpty(parameters[key])) {
      path += `&${key}=${encodeURIComponent(parameters[key])}`
    }
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

export const findExamStateId = (title) => {
  let result
  Object.keys(ExamStates).forEach((key) => {
    if (ExamStates[key] === title) {
      result = key
    }
  })
  return Number(result)
}

export const findSignStateId = (title) => {
  let result
  Object.keys(SignStates).forEach((key) => {
    if (SignStates[key] === title) {
      result = key
    }
  })
  return Number(result)
}

export const DefaultPaginator = {
  page: 1,
  rows: 10,
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
