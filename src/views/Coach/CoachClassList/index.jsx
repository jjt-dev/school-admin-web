import React, { useState } from 'react'
import ActionBar from './ActionBar'
import { Modal, message } from 'antd'
import './index.less'
import { classListColumns } from './helper'
import api from 'src/utils/api'
import { buildParameters, confirmUpdate, parseSearches } from 'src/utils/common'
import ClassExamineeList from './ClassExamineeList'
import CustomTable from 'src/components/CustomTable'

const { useTableFetch } = CustomTable
const { confirm } = Modal

const CoachClassList = ({ match, location }) => {
  const coachId = match.params.id
  const classList = useTableFetch(`/coach/class/page?coachId=${coachId}`)
  const [classInEdit, setClassInEdit] = useState()
  const [selectedClass, setSelectedClass] = useState()
  const { coachName } = parseSearches(location)

  const deleteClass = (coachClass) => {
    const entity = {
      status: '删除',
      title: '学校',
      titleValue: coachClass.name,
      path: `/coach/class/del?id=${coachClass.id}`,
      callback: () => classList.fetchTable(),
    }
    confirmUpdate(entity)
  }

  const confirmDeleteCoach = (coachClass) => {
    confirm({
      title: '请问您确认要删除该班级吗?',
      content: `班级名: ${coachClass.name}`,
      onOk: async () => {
        await api.post(`/coach/class/del?id=${coachClass.id}`)
        message.success('班级删除成功')
      },
      onCancel() {
        console.log('Cancel')
      },
    })
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
    <div className="page page-list">
      <div className="page-list__title">{coachName}教练班级列表</div>
      <ActionBar coachId={coachId} />
      <CustomTable
        {...classList}
        columns={classListColumns(
          confirmDeleteCoach,
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
    </div>
  )
}

export default CoachClassList
