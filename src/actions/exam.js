import { createAction } from 'redux-actions'

export const GET_EXAM = 'GET_EXAM'
export const GET_EXAM_ITEM_LIST = 'GET_EXAM_ITEM_LIST'
export const GET_EXAM_LEVEL_LIST = 'GET_EXAM_LEVEL_LIST'

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
