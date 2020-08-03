import React from 'react'
import { confirmUpdate } from 'src/utils/common'
import ListHeader from '../ListHeader'
import CustomTable from '../CustomTable'
import useActiveRoute from 'src/hooks/useActiveRoute'

const { useTableFetch } = CustomTable

const PageList = ({
  columns,
  addCallback,
  defaultTableList,
  placeholder = '请输入查询条件',
  rowKey = 'id',
}) => {
  const { editPath, title, titleProp = 'name' } = useActiveRoute()
  let tableList = useTableFetch(defaultTableList ? '' : `${editPath}/page`)
  if (defaultTableList) {
    tableList = defaultTableList
  }

  // addCallback如果没有值，则取list的编辑路径
  if (!addCallback) {
    addCallback = editPath
  }

  const deleteEntity = (entity) => {
    const payload = {
      status: '删除',
      title,
      titleValue: entity[titleProp],
      path: `${editPath}/del?id=${entity.id}`,
      callback: () => tableList.fetchTable(),
    }
    confirmUpdate(payload)
  }

  return (
    <div className="page page-list">
      <div className="page-list__title">{title}列表</div>
      <ListHeader
        fetchTable={tableList.fetchTable}
        addCallback={addCallback}
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
