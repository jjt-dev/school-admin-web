import React, { useEffect } from 'react'
import './index.less'
import { useDispatch, useSelector } from 'react-redux'
import { findById, formatTime, getDomain } from 'src/utils/common'
import { Descriptions, Button } from 'antd'
import * as examSignAction from 'src/actions/examSign'
import { Genders, Relationships } from 'src/utils/const'

const ExamSignDetail = ({ match, history }) => {
  const dispatch = useDispatch()
  const { allCoaches, allSigningExams } = useSelector((state) => state.app)
  const { signInEdit } = useSelector((state) => state.examSign)
  const examId = match.params.id
  const signId = match.params.signId
  // 当前只有一个等级考试
  const signLevel = (signInEdit && signInEdit.signLevels[0]) || {}
  const examFinished = signLevel.resultScore !== -1

  useEffect(() => {
    dispatch(examSignAction.getExamSign(signId))
  }, [dispatch, signId])

  const goToPrint = (type) => {
    history.push(`/exam/${examId}/sign/${signId}/print/${type}`)
  }

  return (
    <>
      {signInEdit && (
        <div className="page sign-detail">
          <Descriptions title="报名详情" bordered>
            <Descriptions.Item label="教练" span={3}>
              {findById(allCoaches, signInEdit.coachId).username}
            </Descriptions.Item>
            <Descriptions.Item label="考试名称" span={3}>
              {findById(allSigningExams, signInEdit.examinationId).title}
            </Descriptions.Item>
            <Descriptions.Item label="考生姓名" span={3}>
              {signInEdit.name}
            </Descriptions.Item>
            <Descriptions.Item label="考生性别" span={3}>
              {Genders[signInEdit.gender]}
            </Descriptions.Item>
            <Descriptions.Item label="考生生日" span={3}>
              {formatTime(signInEdit.birthday)}
            </Descriptions.Item>
            <Descriptions.Item label="照片" span={3}>
              <img
                src={`${getDomain()}${signInEdit.faceUrl}`}
                alt="avatar"
                style={{ width: '70px' }}
              />
            </Descriptions.Item>
            <Descriptions.Item label="家长电话" span={3}>
              {signInEdit.phone}
            </Descriptions.Item>
            <Descriptions.Item label="家长关系" span={3}>
              {Relationships[signInEdit.relationship]}
            </Descriptions.Item>
            <Descriptions.Item label="家长姓名" span={3}>
              {signInEdit.parentName}
            </Descriptions.Item>
            <Descriptions.Item label="报考级别" span={3}>
              {signInEdit.signLevels.map((level) => level.levelName).join(',')}
            </Descriptions.Item>
            <Descriptions.Item label="住址" span={3}>
              {signInEdit.address}
            </Descriptions.Item>
            <Descriptions.Item label="已缴费" span={3}>
              {signInEdit.currState > 0 ? '是' : '否'}
            </Descriptions.Item>
          </Descriptions>
          <div className="sign-detail__btns">
            <Button type="primary" onClick={() => goToPrint('exam-certif')}>
              打印准考证
            </Button>
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
