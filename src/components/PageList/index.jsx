import React from 'react'
import { confirmUpdate } from 'src/utils/common'
import ListHeader from '../ListHeader'
import CustomTable from '../CustomTable'

const { useTableFetch } = CustomTable

const PageList = ({
  path,
  title,
  titleProp = 'name',
  columns,
  add = path,
  placeholder = '请输入查询条件',
  rowKey = 'id',
}) => {
  const tableList = useTableFetch(`${path}/page`)

  const deleteEntity = (entity) => {
    const payload = {
      status: '删除',
      title,
      titleValue: entity[titleProp],
      path: `${path}/del?id=${entity.id}`,
      callback: () => tableList.fetchTable(),
    }
    confirmUpdate(payload)
  }

  return (
    <div className="page page-list">
      <div className="page-list__title">{title}列表</div>
      <ListHeader
        fetchTable={tableList.fetchTable}
        add={add}
        placeholder={placeholder}
      />
      <CustomTable
        {...tableList}
        columns={columns(deleteEntity)}
        rowKey={rowKey}
      />
    </div>
  )
}

export default PageList
