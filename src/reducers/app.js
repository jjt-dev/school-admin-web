import { handleActions } from 'redux-actions'

import {
  APP_SHOW_LOADING,
  APP_CLOSE_LOADING,
  APP_OAUTH_USER,
  GET_ALL_COACHES,
  GET_ALL_EXAM_LEVELS,
  GET_ALL_SIGNING_EXAMS,
  GET_ALL_EXAMINERS,
  GET_ALL_ROOMS,
} from 'src/actions/app'

const initState = {
  loading: false,
  user: null,
  allCoaches: [],
  enabledCoaches: [],
  allExamLevels: [],
  allSigningExams: [],
  allExaminers: [],
  allRooms: [],
}

const app = handleActions(
  {
    [APP_SHOW_LOADING]: (state) => {
      return {
        ...state,
        loading: true,
      }
    },
    [APP_CLOSE_LOADING]: (state) => {
      return {
        ...state,
        loading: false,
      }
    },
    [APP_OAUTH_USER]: (state, { payload }) => {
      return {
        ...state,
        user: payload,
      }
    },
    [GET_ALL_COACHES]: (state, { payload }) => {
      const allCoaches = payload.data
      return {
        ...state,
        allCoaches,
        enabledCoaches: allCoaches.filter((item) => item.isEnable),
      }
    },
    [GET_ALL_EXAM_LEVELS]: (state, { payload }) => {
      return {
        ...state,
        allExamLevels: payload,
      }
    },
    [GET_ALL_SIGNING_EXAMS]: (state, { payload }) => {
      return {
        ...state,
        allSigningExams: payload.data,
      }
    },
    [GET_ALL_EXAMINERS]: (state, { payload }) => {
      return {
        ...state,
        allExaminers: payload.data,
      }
    },
    [GET_ALL_ROOMS]: (state, { payload }) => {
      return {
        ...state,
        allRooms: payload.data,
      }
    },
  },
  initState
)

export default app
