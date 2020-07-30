import { message } from 'antd'

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
