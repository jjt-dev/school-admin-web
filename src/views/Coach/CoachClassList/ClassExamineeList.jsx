import React from 'react'
import { getDateRow, getRow, tableOrder } from 'src/utils/common'
import JjtModal from 'src/components/JjtModal'
import CustomTable from 'src/components/CustomTable'

const { useTableFetch } = CustomTable

const ClassExamineeList = ({ coachId, classId, setSelectedClass }) => {
  const tableList = useTableFetch('/coach/class/pageCoachStudent', {
    coachClassId: classId,
    coachId,
  })

  return (
    <JjtModal title="班级考生列表" hide={() => setSelectedClass()}>
      <CustomTable {...tableList} columns={columns} rowKey="studentId" />
    </JjtModal>
  )
}

export default ClassExamineeList

const columns = [
  tableOrder,
  getRow('姓名', 'name'),
  getRow('级别', 'levelName'),
  getDateRow('出生日期', 'birthday'),
]
