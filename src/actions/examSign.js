import { createAction } from 'redux-actions'
import api from 'src/utils/api'

export const GET_EXAM_SIGN = 'GET_EXAM_SIGN'
export const GET_AVAILABLE_EXAM_LEVELS = 'GET_AVAILABLE_EXAM_LEVELS'

export const EXAM_SIGN_RESET_STORE = 'EXAM_SIGN_RESET_STORE'

export const getExamSign = createAction(GET_EXAM_SIGN, (signId) =>
  api.get(`/exam/sign/signInfo?signId=${signId}`)
)

export const getAvailableExamLevels = createAction(
  GET_AVAILABLE_EXAM_LEVELS,
  (examId) => api.get(`/exam/sign/canSignLevelList?examinationId=${examId}`)
)
export const resetStore = createAction(
  EXAM_SIGN_RESET_STORE,
  (params) => params
)
