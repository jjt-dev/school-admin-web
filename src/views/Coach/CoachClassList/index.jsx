import React, { useState } from 'react'
import ActionBar from './ActionBar'
import { Modal, Table, message } from 'antd'
import './index.less'
import { classListColumns } from '../helper'
import api from 'src/utils/api'
import useListSearch from 'src/hooks/useListSearch'
import { parseSearches } from 'src/utils/common'
import ClassExamineeList from './ClassExamineeList'

const { confirm } = Modal

const CoachClassList = ({ match, history, location }) => {
  const [classInEdit, setClassInEdit] = useState()
  const [selectedClass, setSelectedClass] = useState()
  const coachId = match.params.id
  const { coachName } = parseSearches(location)
  const { data, refetchList, pagination } = useListSearch(`/coach/class/page`, {
    coachId,
  })

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
    await api.post(
      `/coach/class/edit?coachId=${coachId}&name=${newClassName}&id=${classId}`
    )
    setClassInEdit()
    refetchList()
  }

  return (
    <div className="page class-list">
      <div className="class-list__title">{coachName}教练班级列表</div>
      <ActionBar coachId={coachId} refetchList={refetchList} />
      <Table
        className="class-list__table"
        columns={classListColumns(
          history,
          confirmDeleteCoach,
          classInEdit,
          setClassInEdit,
          updateClass,
          setSelectedClass
        )}
        dataSource={data}
        rowKey="id"
        size="middle"
        bordered={true}
        pagination={pagination}
        onChange={(value) => refetchList({ paginator: value })}
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
