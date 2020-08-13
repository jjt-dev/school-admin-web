import React, { useState } from 'react'
import './index.less'
import api from 'src/utils/api'
import {
  buildParameters,
  getDeleteRow,
  getViewRow,
  tableOrder,
} from 'src/utils/common'
import ClassExamineeList from './ClassExamineeList'
import AddClassModal from './AddClassModal'
import PageList from 'src/components/PageList'
import getEditClass from './EditClass'
import useTableFetch from 'src/hooks/useTableFetch'

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
        columns={getColumns(
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

const getColumns = (
  classInEdit,
  setClassInEdit,
  updateClass,
  setSelectedClass
) => (deleteClass) => [
  tableOrder,
  {
    title: '班级名称',
    dataIndex: 'name',
    render: (text, record) =>
      getEditClass(record, classInEdit, setClassInEdit, updateClass),
  },
  getViewRow('班级学生', setSelectedClass),
  getDeleteRow(deleteClass),
]
