import { message } from 'antd'
import api from 'src/utils/api'
import { findIndexById } from 'src/utils/common'
import { timeFormat } from 'src/utils/const'

export const enforceLevelList = (exam, levelList) => {
  const { itemes: totalItems } = exam
  const uniqLevelIds = Array.from(
    new Set(totalItems.filter((i) => i.levelId).map((i) => i.levelId))
  )
  uniqLevelIds.forEach((levelId) => {
    const items = {}
    totalItems
      .filter((item) => item.levelId === levelId)
      .forEach((item) => {
        items[item.examItemId] = item.ratio * 100
      })
    const index = findIndexById(levelList, levelId)
    levelList[index].items = items
  })
  return levelList
}

export const updateExam = async (
  history,
  status,
  id,
  values,
  checkedLevels
) => {
  const {
    title,
    examTime,
    signTime,
    note,
    address,
    isEnable,
    isFormal,
  } = values
  const examStartTime = examTime[0].format(timeFormat)
  const examEndTime = examTime[1].format(timeFormat)
  const signStartTime = signTime[0].format(timeFormat)
  const signEndTime = signTime[1].format(timeFormat)

  const levelItems = {}
  checkedLevels.forEach((level) => {
    const { id: levelId, items } = level
    const itemNumber = Object.keys(items).length
    const ratio = Number((100 / itemNumber / 100).toFixed(2))
    const temp = Object.keys(items).map((itemId, index) => ({
      examItemId: itemId,
      ratio: index === 0 ? ratio + (1 - itemNumber * ratio) : ratio,
    }))
    levelItems[levelId] = temp
  })

  const levelsCanSign = checkedLevels.map((level) => level.id).join(',')

  const postData = {
    id,
    address,
    examStartTime,
    examEndTime,
    levelItems,
    levelsCanSign,
    note,
    signStartTime,
    signEndTime,
    title,
    isEnable,
    isFormal,
  }

  await api.post(`/examination/edit`, postData)
  message.success(`${status}考试成功`)
  history.push('/exams')
}
