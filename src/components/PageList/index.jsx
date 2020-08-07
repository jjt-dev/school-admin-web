import React from 'react'
import { confirmUpdate } from 'src/utils/common'
import ListHeader from '../ListHeader'
import CustomTable from '../CustomTable'
import useActiveRoute from 'src/hooks/useActiveRoute'

const { useTableFetch } = CustomTable

const PageList = ({
  columns,
  showAdd = true,
  addCallback,
  deleteCallback,
  defaultTableList,
  placeholder = '请输入查询条件',
  rowKey = 'id',
  path,
  children,
}) => {
  const {
    editPath,
    title,
    titleProp = 'name',
    apiPath = editPath,
  } = useActiveRoute()

  let fetchPath = ''
  if (!defaultTableList) {
    fetchPath = path ? path : `${apiPath}/page`
  }
  let tableList = useTableFetch(fetchPath)
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
      path: `${apiPath}/del?id=${entity.id}`,
      callback: () => {
        tableList.fetchTable()
        deleteCallback && deleteCallback()
      },
    }
    confirmUpdate(payload)
  }

  return (
    <div className="page page-list">
      <div className="page-list-title">{title}列表</div>
      {children}
      {!children && (
        <ListHeader
          fetchTable={tableList.fetchTable}
          showAdd={showAdd}
          addCallback={addCallback}
          placeholder={placeholder}
        />
      )}
      <CustomTable
        {...tableList}
        columns={columns(deleteEntity)}
        rowKey={rowKey}
      />
    </div>
  )
}

export default PageList
