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

  // 一个等级最多15个考项
  const itemMoreThan15 = checkedLevels.some(
    (level) => Object.keys(level.items).length > 15
  )
  if (itemMoreThan15) {
    message.error('等级的考项数量最多15个')
    return
  }

  const levelItems = {}
  checkedLevels.forEach((level) => {
    const { id: levelId, items } = level
    const itemNumber = Object.keys(items).length
    const ratio = Number((1 / itemNumber).toFixed(4))
    const temp = Object.keys(items).map((itemId, index) => {
      const firstRatio = ratio + (1 - itemNumber * ratio)
      return {
        examItemId: itemId,
        ratio: index === 0 ? firstRatio.toFixed(4) : ratio,
      }
    })
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
