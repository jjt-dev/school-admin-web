import React from 'react'
import { Modal, Table, Button, message } from 'antd'
import useFetch from 'src/hooks/useFetch'
import api from 'src/utils/api'
import { useDispatch } from 'react-redux'
import { showLoadingBar, closeLoadingBar } from 'src/actions/app'
import { tableOrder, getRow } from 'src/utils/common'

const ImportExamModal = ({ hideModal }) => {
  const dispatch = useDispatch()
  const [exams = []] = useFetch(`/examination/page?isFormal=true&page=1&rows=5`)

  const importExam = async (record) => {
    dispatch(showLoadingBar())
    hideModal()
    await api.post(
      `/examination/importSomeExamToMockExam?sourceExamId=${record.id}`
    )
    message.success('导入成功')
    dispatch(closeLoadingBar())
  }

  return (
    <Modal
      visible={true}
      onCancel={hideModal}
      footer={[
        <Button key="back" onClick={hideModal}>
          取消
        </Button>,
      ]}
    >
      <Table
        columns={getColumns(importExam)}
        dataSource={exams.data}
        pagination={false}
      />
    </Modal>
  )
}

export default ImportExamModal

const getColumns = (importExam) => [
  tableOrder,
  getRow('名称', 'title'),
  {
    title: '操作',
    render: (text, record) => (
      <>
        <span className="table-action" onClick={() => importExam(record)}>
          导入
        </span>
      </>
    ),
  },
]
