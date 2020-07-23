import React, { useEffect } from 'react'
import './index.less'
import { Descriptions, Table, Avatar, Modal } from 'antd'
import * as examineeAction from 'src/actions/examinee'
import { useDispatch, useSelector } from 'react-redux'
import { Genders } from 'src/utils/const'
import { formatTime, getDomain } from 'src/utils/common'
import { examResultsColumns } from '../helper'
import { useState } from 'react'

const Examinee = ({ match }) => {
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)
  const { examineeDetail } = useSelector((state) => state.examinee)
  const examineeId = match.params.id

  useEffect(() => {
    if (examineeId) {
      dispatch(examineeAction.getExaminee(examineeId))
    }
  }, [dispatch, examineeId])

  return (
    <>
      {examineeDetail && (
        <div className="page examinee">
          <div className="examinee__edit-title">考生详情</div>
          <Descriptions title="基本信息" column={2}>
            <Descriptions.Item label="姓名">
              {examineeDetail.name}
            </Descriptions.Item>
            <Descriptions.Item label="性别">
              {Genders[examineeDetail.gender]}
            </Descriptions.Item>
            <Descriptions.Item label="生日">
              {formatTime(examineeDetail.birthday)}
            </Descriptions.Item>
            <Descriptions.Item label="电话">
              {examineeDetail.phone}
            </Descriptions.Item>
            <Descriptions.Item label="身份证号">
              {examineeDetail.cardId}
            </Descriptions.Item>
            <Descriptions.Item label="住址">
              {examineeDetail.address}
            </Descriptions.Item>
          </Descriptions>
          <span onClick={() => setShowModal(true)} className="examinee__avatar">
            <Avatar
              shape="square"
              size={80}
              src={`${getDomain()}${examineeDetail.faceUrl}`}
            />
          </span>
          <Table
            title={() => '考试记录'}
            className="examinee-result__table"
            columns={examResultsColumns()}
            dataSource={examineeDetail.results}
            rowKey="id"
            size="middle"
            bordered={true}
          />
          {showModal && (
            <AvatarModal
              setShowModal={setShowModal}
              faceUrl={examineeDetail.faceUrl}
            />
          )}
        </div>
      )}
    </>
  )
}

export default Examinee

const AvatarModal = ({ faceUrl, setShowModal }) => {
  return (
    <Modal
      className="examinee-avatar-modal"
      centered={true}
      title="学生头像"
      visible={true}
      footer={null}
      onCancel={() => setShowModal(false)}
    >
      <Avatar shape="square" src={`${getDomain()}${faceUrl}`} />
    </Modal>
  )
}
