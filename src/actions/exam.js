import { createAction } from 'redux-actions'
import api from 'src/utils/api'
import { ExamStates } from 'src/utils/const'

export const GET_EXAM_LIST = 'GET_EXAM_LIST'
export const GET_EXAM = 'GET_EXAM'
export const GET_EXAM_ITEM_LIST = 'GET_EXAM_ITEM_LIST'
export const GET_EXAM_LEVEL_LIST = 'GET_EXAM_LEVEL_LIST'

export const EXAM_UPDATE_FILTER = 'COACH_UPDATE_FILTER'
export const EXAM_UPDATE_ITEM_RATIO = 'EXAM_UPDATE_ITEM_RATIO'
export const EXAM_SELECT_LEVEL_ITEM = 'EXAM_SELECT_LEVEL_ITEM'
export const EXAM_UPDATE_LEVEL_CEHCK = 'EXAM_UPDATE_LEVEL_CEHCK'

export const EXAM_RESET_STORE = 'EXAM_RESET_STORE'

export const getExam = createAction(GET_EXAM, (params) => params)

export const getExamItemList = createAction(
  GET_EXAM_ITEM_LIST,
  (params) => params
)

export const getExamLevelList = createAction(
  GET_EXAM_LEVEL_LIST,
  (params) => params
)

export const getExamList = createAction(GET_EXAM_LIST, (filter) => {
  const { paginator, search, examState } = filter
  const { page, rows } = paginator
  let path = `/examination/page?page=${page}&rows=${rows}`
  if (search) {
    path += `&keyword=${search}`
  }
  if (ExamStates[examState]) {
    path += `&currState=${examState}`
  }
  return api.get(path)
})

export const updateFilter = createAction(
  EXAM_UPDATE_FILTER,
  (field, value) => ({
    field,
    value,
  })
)

export const updateItemRatio = createAction(
  EXAM_UPDATE_ITEM_RATIO,
  (params) => params
)

export const selectItems = createAction(
  EXAM_SELECT_LEVEL_ITEM,
  (params) => params
)

export const updateLevelCheck = createAction(
  EXAM_UPDATE_LEVEL_CEHCK,
  (params) => params
)

export const resetStore = createAction(EXAM_RESET_STORE, (params) => params)
