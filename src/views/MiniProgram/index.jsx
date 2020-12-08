import './index.less'

import React from 'react'
import useSearch from 'src/hooks/useSearch'
import QrCode from './QrCode'
import ExamResult from './ExamResult'
import useWindowSize from 'src/hooks/useWindowSize'

const MiniProgram = () => {
  const { page } = useSearch()
  const { width: windowWidth } = useWindowSize()

  return (
    <div className={`mini-program ${page} ${getClass(windowWidth)}`}>
      {page === 'qrcode' && <QrCode />}
      {page === 'examResult' && <ExamResult />}
    </div>
  )
}

export default MiniProgram

const getClass = (windowWidth) => {
  let width = 320
  if (windowWidth > 320 && windowWidth <= 375) {
    width = 375
  }
  if (windowWidth > 375 && windowWidth <= 414) {
    width = 414
  }
  return `width-${width}`
}
