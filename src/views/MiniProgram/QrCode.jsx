import './index.less'

import React from 'react'
import useSearch from 'src/hooks/useSearch'
import useFetch from 'src/hooks/useFetch'
import { getDomain } from 'src/utils/common'

const QrCode = () => {
  const { signId } = useSearch()
  const [paymentInfo = {}] = useFetch(
    `/client/sign/paymentInfo?signId=${signId}`
  )

  return (
    <div className="mini-qrcode">
      <div>报名费: ¥{paymentInfo.signFee}</div>
      <img src={`${getDomain()}${paymentInfo.qrCodeUrl}`} alt="qrcode" />
    </div>
  )
}

export default QrCode
