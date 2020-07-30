import { handleActions } from 'redux-actions'
import set from 'lodash/fp/set'
import flow from 'lodash/fp/flow'
import {
  GET_EXAM_LIST,
  EXAM_UPDATE_FILTER,
  GET_EXAM,
  GET_EXAM_ITEM_LIST,
  GET_EXAM_LEVEL_LIST,
  EXAM_UPDATE_ITEM_RATIO,
  EXAM_UPDATE_LEVEL_CEHCK,
  EXAM_SELECT_LEVEL_ITEM,
  EXAM_RESET_STORE,
} from 'src/actions/exam'

const initState = {
  examList: [],
  total: 0,
  examItemList: [],
  examLevelList: [],
  filter: {
    search: '',
    examState: 'all',
    paginator: {
      page: 1,
      rows: 10,
    },
  },
  examInEdit: null,
}

const exam = handleActions(
  {
    [GET_EXAM]: (state, { payload }) => {
      return {
        ...state,
        examInEdit: payload,
      }
    },
    [GET_EXAM_LIST]: (state, { payload }) => {
      return flow(
        set(`examList`, payload.data),
        set(`total`, payload.totalRecords)
      )(state)
    },
    [GET_EXAM_ITEM_LIST]: (state, { payload }) => {
      return {
        ...state,
        examItemList: payload,
      }
    },
    [GET_EXAM_LEVEL_LIST]: (state, { payload }) => {
      return {
        ...state,
        examLevelList: payload,
      }
    },
    [EXAM_UPDATE_FILTER]: (state, { payload }) => {
      return set(`filter[${payload.field}]`, payload.value, state)
    },
    [EXAM_UPDATE_ITEM_RATIO]: (state, { payload }) => {
      const { itemId, ratio } = payload
      const index = state.examItemList.findIndex((item) => item.id === itemId)
      return set(`examItemList[${index}].ratio`, ratio, state)
    },
    [EXAM_SELECT_LEVEL_ITEM]: (state, { payload }) => {
      const { levelId, selectedItems } = payload
      const index = state.examLevelList.findIndex((item) => item.id === levelId)
      return set(`examLevelList[${index}].items`, selectedItems, state)
    },
    [EXAM_UPDATE_LEVEL_CEHCK]: (state, { payload }) => {
      const { levelId, checked } = payload
      const index = state.examLevelList.findIndex(
        (level) => level.id === levelId
      )
      return set(`examLevelList[${index}].checked`, checked, state)
    },
    [EXAM_RESET_STORE]: () => {
      return initState
    },
  },
  initState
)

export default exam
