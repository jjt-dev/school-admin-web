import React from 'react'
import './index.less'
import { Descriptions, Table, Avatar, Modal } from 'antd'
import { Genders } from 'src/utils/const'
import {
  formatTime,
  getDateRow,
  getDomain,
  getRow,
  tableOrder,
} from 'src/utils/common'
import { useState } from 'react'
import useFetch from 'src/hooks/useFetch'
import PageListCustom from 'src/components/PageListCustom'

const Examinee = ({ match }) => {
  const [showModal, setShowModal] = useState(false)
  const [examineeDetail] = useFetch(
    `/student/studentInfo?studentId=${match.params.id}`,
    {}
  )

  return (
    <PageListCustom customClass="examinee" title="考生详情">
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
        columns={columns}
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
    </PageListCustom>
  )
}

export default Examinee

const columns = [
  tableOrder,
  getRow('级别', 'levelName'),
  getRow('结果', 'result'),
  getDateRow('考试时间', 'createTime'),
]

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
