import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as certificateAction from 'src/actions/certificate'
import ActionBar from './ActionBar'
import { Modal, Table, message } from 'antd'
import './index.less'
import { pagConfig } from 'src/utils/const'
import { useHistory } from 'react-router'
import api from 'src/utils/api'
import { certificateListColumns, CertificateTypes } from '../helper'

const { confirm } = Modal

const Certificates = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { certificateList, filter, total } = useSelector(
    (state) => state.certificate
  )
  const { page, rows } = filter.paginator

  useEffect(() => {
    dispatch(certificateAction.getCertificateList(filter))
  }, [dispatch, filter])

  const updateFilter = (field, value) => {
    dispatch(certificateAction.updateFilter(field, value))
  }

  const confirmDeleteCoach = (certificate) => {
    confirm({
      title: '请问您确认要删除该证书模板吗?',
      content: `证书类型: ${CertificateTypes[certificate.type].title}`,
      onOk: async () => {
        await api.post(`/config/file/del?id=${certificate.id}`)
        message.success('删除证书模板成功')
        dispatch(certificateAction.getCertificateList(filter))
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  return (
    <div className="page certificate-list">
      <div className="certificate-list__title">证书列表</div>
      <ActionBar
        updateFilter={updateFilter}
        filter={filter}
        certificateList={certificateList}
      />
      <Table
        className="certificate-list__table"
        columns={certificateListColumns(history, confirmDeleteCoach)}
        dataSource={certificateList}
        rowKey="id"
        size="middle"
        bordered={true}
        pagination={{
          ...pagConfig,
          current: page,
          pageSize: rows,
          total,
        }}
        onChange={({ current, pageSize }) =>
          updateFilter('paginator', { page: current, rows: pageSize })
        }
      />
    </div>
  )
}

export default Certificates
