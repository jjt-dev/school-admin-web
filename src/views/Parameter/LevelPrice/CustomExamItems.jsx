import './index.less'

import { Button, Form, Modal, Table } from 'antd'
import React, { useState } from 'react'
import FormInput from 'src/components/FormInput'
import useFetch from 'src/hooks/useFetch'
import { getCustomRow, getRow, tableOrder } from 'src/utils/tableUtil'
import { useForm } from 'antd/lib/form/Form'
import { formLayout } from 'src/utils/const'

const CustomExamItems = ({ level, hide }) => {
  const [examItems = []] = useFetch(`/config/item/list?levelId=${level.id}`)
  const [selectedItem, setSelectedItem] = useState()

  const columns = [
    tableOrder,
    getRow('自定义考项名称', 'name'),
    getRow('默认差评', 'defaultBadComment'),
    getCustomRow('操作', (record) => (
      <span className="table-action" onClick={() => setSelectedItem(record)}>
        编辑
      </span>
    )),
  ]

  return (
    <div className="page page-list exam-item-list">
      <div className="page-list-title">{level.name}自定义考项列表</div>
      <Button type="primary" onClick={hide}>
        返回
      </Button>
      <Button type="primary" onClick={hide}>
        新增
      </Button>
      <Table dataSource={examItems} columns={columns} pagination={false} />
      {selectedItem && (
        <EditExamItem
          selectedItem={selectedItem}
          level={level}
          hide={() => setSelectedItem(null)}
        />
      )}
    </div>
  )
}

export default CustomExamItems

const EditExamItem = ({ selectedItem, level, hide }) => {
  const [form] = useForm()
  const defaultTitle = `${level.name}自定义考项`
  const title = selectedItem.id ? `编辑${defaultTitle}` : `新增${defaultTitle}`

  const onFinish = () => {}

  return (
    <Modal title={title} visible={true} onCancel={hide}>
      <Form {...formLayout} form={form} onFinish={onFinish}>
        <FormInput label="考项名称" name="name" />
        <FormInput label="考项默认差评" name="defaultBadComment" />
      </Form>
    </Modal>
  )
}
