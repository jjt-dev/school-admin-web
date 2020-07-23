import { createAction } from 'redux-actions'
import api from 'src/utils/api'

export const APP_SHOW_LOADING = 'APP_SHOW_LOADING'
export const APP_CLOSE_LOADING = 'APP_CLOSE_LOADING'

export const APP_OAUTH_USER = 'APP_OAUTH_USER'

export const GET_ALL_COACHES = 'GET_ALL_COACHES'
export const GET_ALL_EXAM_LEVELS = 'GET_ALL_EXAM_LEVELS'
export const GET_ALL_SIGNING_EXAMS = 'GET_ALL_SIGNING_EXAMS'
export const GET_ALL_EXAMINERS = 'GET_ALL_EXAMINERS'
export const GET_ALL_ROOMS = 'GET_ALL_ROOMS'

// 显示/隐藏顶层loading bar
export const showLoadingBar = createAction(APP_SHOW_LOADING)

export const closeLoadingBar = createAction(APP_CLOSE_LOADING)

export const getUserInfo = createAction(APP_OAUTH_USER, () =>
  api.get(`/user/userInfo`)
)

export const getAllCoaches = createAction(GET_ALL_COACHES, () =>
  api.get(`/coach/page?page=1&rows=10000`)
)

export const getAllExamLevels = createAction(GET_ALL_EXAM_LEVELS, () =>
  api.get(`/examination/levelList`)
)

/**
 * 把rows设置得足够大，使得一次性返回所有的注册中的考试
 */
export const getAllSigningExams = createAction(GET_ALL_SIGNING_EXAMS, () =>
  api.get(`/examination/page?page=1&rows=10000&currState=10`)
)

/**
 * 把rows设置得足够大，使得一次性返回所有考官
 */
export const getAllExaminers = createAction(GET_ALL_EXAMINERS, () =>
  api.get(`/examiner/page?page=1&rows=10000&&isEnable=true`)
)

/**
 * 把rows设置得足够大，使得一次性返回所有场地
 */
export const getAllRooms = createAction(GET_ALL_ROOMS, () =>
  api.get(`/config/room/page?page=1&rows=10000`)
)
