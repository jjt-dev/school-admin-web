import './index.less'

import { Button, Descriptions } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import useFetch from 'src/hooks/useFetch'
import { findById, formatTime, getDomain } from 'src/utils/common'
import { Genders } from 'src/utils/const'

const ExamSignDetail = () => {
  const { id: examId, signId } = useParams()
  const history = useHistory()
  const { allCoaches } = useSelector((state) => state.app)
  let [sign] = useFetch(`/exam/sign/signInfo?signId=${signId}`)
  const [exam = {}] = useFetch(`/examination/item?id=${examId}`)

  const goToPrint = (type, comp) => {
    history.push(
      `/exam/${examId}/sign/${signId}/print/${type}?key=signs&comp=${comp}`
    )
  }

  if (!sign) return null

  sign = {
    ...sign.signInfo,
    ...sign.studentInfo,
    signLevels: sign.signLevels,
  }

  return (
    <>
      {sign && (
        <div className="page sign-detail">
          <Descriptions title="报名详情" bordered>
            <Descriptions.Item label="考试名称" span={3}>
              {exam.title}
            </Descriptions.Item>
            <Descriptions.Item label="考生姓名" span={3}>
              {sign.name}
            </Descriptions.Item>
            <Descriptions.Item label="身份证号" span={3}>
              {sign.cardId}
            </Descriptions.Item>
            <Descriptions.Item label="考生性别" span={3}>
              {Genders[sign.gender]}
            </Descriptions.Item>
            <Descriptions.Item label="考生生日" span={3}>
              {formatTime(sign.birthday)}
            </Descriptions.Item>
            <Descriptions.Item label="家长电话" span={3}>
              {sign.phone}
            </Descriptions.Item>
            <Descriptions.Item label="照片" span={3}>
              <img
                src={`${getDomain()}${sign.faceUrl}`}
                alt="avatar"
                style={{ width: '70px' }}
              />
            </Descriptions.Item>
            <Descriptions.Item label="住址" span={3}>
              {sign.address}
            </Descriptions.Item>
            <Descriptions.Item label="教练" span={3}>
              {findById(allCoaches, sign.coachId).username}
            </Descriptions.Item>
            <Descriptions.Item label="报考级别" span={3}>
              {sign.signLevels.map((level) => level.levelName).join(',')}
            </Descriptions.Item>
            <Descriptions.Item label="已缴费" span={3}>
              {sign.currState > 0 ? '是' : '否'}
            </Descriptions.Item>
          </Descriptions>
          <div className="sign-detail__btns">
            <Button
              type="primary"
              onClick={() => goToPrint('exam-certif', 'PrintExamCertif')}
            >
              打印准考证
            </Button>
            <Button
              type="primary"
              onClick={() => goToPrint('report', 'PrintReport')}
            >
              打印成绩单
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default ExamSignDetail
