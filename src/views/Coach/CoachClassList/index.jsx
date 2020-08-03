import React, { useState } from 'react'
import './index.less'
import { getClassColumns } from './helper'
import api from 'src/utils/api'
import { buildParameters } from 'src/utils/common'
import ClassExamineeList from './ClassExamineeList'
import CustomTable from 'src/components/CustomTable'
import AddClassModal from './AddClassModal'
import PageList from 'src/components/PageList'

const { useTableFetch } = CustomTable

const CoachClassList = ({ match }) => {
  const coachId = match.params.id
  const classList = useTableFetch(`/coach/class/page`, { coachId })
  const [classInEdit, setClassInEdit] = useState()
  const [selectedClass, setSelectedClass] = useState()
  const [showAddClassModal, setShowAddClassModal] = useState(false)

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
    <>
      <PageList
        defaultTableList={classList}
        columns={getClassColumns(
          classInEdit,
          setClassInEdit,
          updateClass,
          setSelectedClass
        )}
        addCallback={() => setShowAddClassModal(true)}
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
    </>
  )
}

export default CoachClassList
