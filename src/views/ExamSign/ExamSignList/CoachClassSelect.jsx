import React, { useState } from 'react'
import { Cascader } from 'antd'
import './index.less'
import api from 'src/utils/api'
import { formatCascaderCoaches } from './helper'
import set from 'lodash/fp/set'

const CoachClassSelect = ({
  allCoaches,
  fetchSignList,
  selectedClasses,
  setSelectedClasses,
}) => {
  const [cascaderCoaches, setCascaderCoaches] = useState(
    formatCascaderCoaches(allCoaches)
  )

  const onChange = (value) => {
    setSelectedClasses(value)
    const [coachId, coachClassId] = Object.values(value)
    fetchSignList({ coachId, coachClassId })
  }

  const loadData = async (selectedOptions) => {
    const targetCoach = selectedOptions[selectedOptions.length - 1]
    targetCoach.loading = true

    const { data: coachClasses } = await api.get(
      `/coach/class/page?coachId=${targetCoach.value}`
    )

    targetCoach.loading = false
    targetCoach.children = coachClasses.map((item) => ({
      value: item.id,
      label: item.name,
    }))

    const targetCoachIndex = cascaderCoaches.findIndex(
      (item) => item.value === targetCoach.value
    )

    setCascaderCoaches(
      set(`[${targetCoachIndex}]`, targetCoach, cascaderCoaches)
    )
  }

  return (
    <Cascader
      value={selectedClasses}
      placeholder="请选择教练班级"
      options={cascaderCoaches}
      loadData={loadData}
      onChange={onChange}
      changeOnSelect
    />
  )
}

export default CoachClassSelect
