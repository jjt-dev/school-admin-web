import { dateFormat } from 'src/utils/const'
import { message } from 'antd'
import api from 'src/utils/api'

export const getExamItemValue = (exam, item) => {
  if (!exam) return 0
  const itemInExam = exam.itemes.find((i) => i.examItemId === item.id)
  if (!itemInExam) return 0
  return itemInExam.ratio * 100
}

export const updateExamSign = async (history, examId, values) => {
  let currState = 0
  if (values.isPayed) {
    currState = 10
  }

  await api.post(
    `/exam/sign/signOffLine?examinationId=${examId}&address=${
      values.address
    }&birthday=${values.birthday.format(dateFormat)}&cardId=${
      values.cardId
    }&coachId=${values.coachId}&currLevelId=${
      values.currLevelId
    }&currState=${currState}&faceUrl=${values.faceUrl}&gender=${
      values.gender
    }&levels=${values.levels.join(',')}&name=${values.name}&note=${
      values.note
    }&parentName=${values.parentName}&phone=${values.phone}&relationship=${
      values.relationship
    }&coachClassId=${values.coachClassId}`
  )
  message.success(`报名成功`)
  history.push(`/exam/${examId}/signs`)
}
