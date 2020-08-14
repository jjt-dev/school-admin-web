import React from 'react'
import useFetch from 'src/hooks/useFetch'
import { pathExamRooms } from 'src/utils/httpUtil'
import FormSelect from 'src/components/FormSelect'
import { findById } from 'src/utils/common'

const LevelRoom = ({ exam, levelIds = [], levels = [] }) => {
  const [rooms = []] = useFetch(pathExamRooms(exam.id))

  return (
    <>
      {levelIds.map((levelId) => {
        const level = findById(levels, levelId)
        return (
          <FormSelect
            key={levelId}
            label={`${level.name}考场`}
            name={`level_${levelId}_room`}
            options={rooms}
            valueKey="roomId"
            titleKey="name"
          />
        )
      })}
    </>
  )
}

export default LevelRoom
