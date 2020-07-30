import { message } from 'antd'
import { findIndexById } from 'src/utils/common'

export const validateItems = (checkedLevels) => {
  checkedLevels.forEach(({ items }) => {
    let totalRatio = 0
    Object.keys(items).map((itemId) => (totalRatio += items[itemId] ?? 0))
    if (totalRatio !== 100) {
      message.error('请保证每一个级别的考项比例之和为100')
      return false
    }
  })
  return true
}

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
