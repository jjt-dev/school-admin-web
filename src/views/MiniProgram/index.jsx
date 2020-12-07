import './index.less'

import React from 'react'
import useSearch from 'src/hooks/useSearch'
import QrCode from './QrCode'

const MiniProgram = () => {
  const { page } = useSearch()
  return <div className="mini-program">{page === 'qrcode' && <QrCode />}</div>
}

export default MiniProgram
