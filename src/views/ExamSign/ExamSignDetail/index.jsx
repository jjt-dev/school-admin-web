import React from 'react'
import './index.less'
import { useSelector } from 'react-redux'
import { findById, formatTime, getDomain } from 'src/utils/common'
import { Descriptions, Button } from 'antd'
import { Genders } from 'src/utils/const'
import useFetch from 'src/hooks/useFetch'

const ExamSignDetail = ({ match, history }) => {
  const { id: examId, signId } = match.params
  const { allCoaches } = useSelector((state) => state.app)
  let [sign] = useFetch(`/exam/sign/signInfo?signId=${signId}`)
  const [exam = {}] = useFetch(`/examination/item?id=${examId}`)
  // 当前只有一个等级考试
  const signLevel = (sign && sign.signLevels[0]) || {}
  const examFinished = signLevel.resultScore !== -1

  const goToPrint = (type) => {
    history.push(`/exam/${examId}/sign/${signId}/print/${type}`)
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
            {!examFinished && (
              <Button type="primary" onClick={() => goToPrint('exam-certif')}>
                打印准考证
              </Button>
            )}
            {examFinished && (
              <Button type="primary" onClick={() => goToPrint('report')}>
                打印成绩单
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default ExamSignDetail
