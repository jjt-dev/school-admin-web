import './index.less'

import { Button, Divider, Form, message, Modal, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import FormInput from 'src/components/FormInput'
import useFetch from 'src/hooks/useFetch'
import { getCustomRow, getRow, tableOrder } from 'src/utils/tableUtil'
import { useForm } from 'antd/lib/form/Form'
import { formLayout } from 'src/utils/const'
import api from 'src/utils/api'
import { buildFormPath } from 'src/utils/common'

const { confirm } = Modal

const CustomExamItems = ({ level, hide }) => {
  const [examItems = [], fetchItems] = useFetch(
    `/config/item/list?levelId=${level.id}`
  )
  const [selectedItem, setSelectedItem] = useState()

  const deleteItem = (item) => {
    confirm({
      title: '请问您确认要删除该自定义考项吗?',
      content: `考项名称: ${item.name}`,
      onOk: async () => {
        await api.post(`/config/item/del?id=${item.id}`)
        message.success('删除自定义考项成功')
        fetchItems()
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  const columns = [
    tableOrder,
    getRow('自定义考项名称', 'name'),
    getRow('默认差评', 'defaultBadComment'),
    getCustomRow('操作', (record) => (
      <>
        <span className="table-action" onClick={() => setSelectedItem(record)}>
          编辑
        </span>
        <Divider type="vertical" />
        <span className="table-action" onClick={() => deleteItem(record)}>
          删除
        </span>
      </>
    )),
  ]

  return (
    <div className="page page-list exam-item-list">
      <div className="page-list-title">{level.name}自定义考项列表</div>
      <Button type="primary" onClick={hide}>
        返回
      </Button>
      <Button type="primary" onClick={() => setSelectedItem({})}>
        新增
      </Button>
      <Table
        dataSource={examItems}
        columns={columns}
        pagination={false}
        rowKey="id"
        bordered
      />
      {selectedItem && (
        <EditExamItem
          selectedItem={selectedItem}
          level={level}
          hide={() => setSelectedItem(null)}
          fetchItems={fetchItems}
        />
      )}
    </div>
  )
}

export default CustomExamItems

const EditExamItem = ({ selectedItem, level, hide, fetchItems }) => {
  const isEdit = !!selectedItem.id
  const status = isEdit ? '编辑' : '新增'
  const [form] = useForm()

  useEffect(() => {
    form.setFieldsValue({ ...selectedItem, levelId: level.id })
  }, [form, level.id, selectedItem])

  const onFinish = async () => {
    const values = await form.validateFields()
    await api.post(
      buildFormPath(`/config/item/edit`, {
        ...values,
        id: selectedItem.id,
        levelId: level.id,
      })
    )
    message.success(`${status}自定义考项成功`)
    fetchItems()
    hide()
  }

  return (
    <Modal
      title={`${status}${level.name}自定义考项`}
      visible={true}
      onCancel={hide}
      onOk={onFinish}
    >
      <Form {...formLayout} form={form}>
        <FormInput label="考项名称" name="name" />
        <FormInput label="考项默认差评" name="defaultBadComment" />
      </Form>
    </Modal>
  )
}
