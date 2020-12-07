import './index.less'

import React from 'react'
import useSearch from 'src/hooks/useSearch'
import QrCode from './QrCode'
import ExamResult from './ExamResult'

const MiniProgram = () => {
  const { page } = useSearch()
  return (
    <div className={`mini-program ${page}`}>
      {page === 'qrcode' && <QrCode />}
      {page === 'examResult' && <ExamResult />}
    </div>
  )
}

export default MiniProgram
