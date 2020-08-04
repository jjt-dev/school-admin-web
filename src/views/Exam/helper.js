import { timeFormat } from 'src/utils/const'
import { message } from 'antd'
import api from 'src/utils/api'

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
    const temp = Object.keys(items).map((itemId) => ({
      examItemId: itemId,
      ratio: items[itemId] / 100,
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

export const getExamItemValue = (exam, item) => {
  if (!exam) return 0
  const itemInExam = exam.itemes.find((i) => i.examItemId === item.id)
  if (!itemInExam) return 0
  return itemInExam.ratio * 100
}
