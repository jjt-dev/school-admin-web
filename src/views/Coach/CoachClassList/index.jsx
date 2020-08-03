import React, { useState } from 'react'
import './index.less'
import { classListColumns } from './helper'
import api from 'src/utils/api'
import { buildParameters, confirmUpdate, parseSearches } from 'src/utils/common'
import ClassExamineeList from './ClassExamineeList'
import CustomTable from 'src/components/CustomTable'
import ListHeader from 'src/components/ListHeader'
import AddClassModal from './AddClassModal'
import PageListCustom from 'src/components/PageListCustom'

const { useTableFetch } = CustomTable

const CoachClassList = ({ match, location }) => {
  const coachId = match.params.id
  const classList = useTableFetch(`/coach/class/page`, { coachId })
  const [classInEdit, setClassInEdit] = useState()
  const [selectedClass, setSelectedClass] = useState()
  const { coachName } = parseSearches(location)
  const [showAddClassModal, setShowAddClassModal] = useState(false)

  const deleteClass = (coachClass) => {
    const entity = {
      status: '删除',
      title: '班级',
      titleValue: coachClass.name,
      path: `/coach/class/del?id=${coachClass.id}`,
      callback: () => classList.fetchTable(),
    }
    confirmUpdate(entity)
  }

  const updateClass = async (classId, newClassName) => {
    const params = {
      coachId,
      name: newClassName,
      id: classId,
    }
    await api.post(buildParameters('/coach/class/edit', params))
    setClassInEdit()
    classList.fetchTable()
  }

  return (
    <PageListCustom title={`${coachName}教练班级列表`}>
      <ListHeader
        fetchTable={classList.fetchTable}
        add={() => setShowAddClassModal(true)}
      />
      <CustomTable
        {...classList}
        columns={classListColumns(
          deleteClass,
          classInEdit,
          setClassInEdit,
          updateClass,
          setSelectedClass
        )}
        rowKey="id"
      />
      {selectedClass && (
        <ClassExamineeList
          coachId={coachId}
          classId={selectedClass.id}
          setSelectedClass={setSelectedClass}
        />
      )}
      {showAddClassModal && (
        <AddClassModal
          coachId={coachId}
          callback={classList.fetchTable}
          hideModal={() => setShowAddClassModal(false)}
        />
      )}
    </PageListCustom>
  )
}

export default CoachClassList
