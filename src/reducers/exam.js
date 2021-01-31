import { handleActions } from 'redux-actions'
import set from 'lodash/fp/set'
import { findIndexById } from 'src/utils/common'
import {
  GET_EXAM,
  GET_EXAM_ITEM_LIST,
  GET_EXAM_LEVEL_LIST,
  EXAM_UPDATE_ITEM_RATIO,
  EXAM_UPDATE_LEVEL_CHECK,
  EXAM_SELECT_LEVEL_ITEM,
  EXAM_RESET_STORE,
  EXAM_SELECT_ALL_LEVEL_ITEMS,
} from 'src/actions/exam'

const initState = {
  examList: [],
  examItemList: [],
  examLevelList: [],
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
    [EXAM_UPDATE_ITEM_RATIO]: (state, { payload }) => {
      const { levelId, itemId, ratio } = payload
      const index = findIndexById(state.examLevelList, levelId)
      return set(`examLevelList[${index}].items[${itemId}]`, ratio, state)
    },
    [EXAM_SELECT_LEVEL_ITEM]: (state, { payload }) => {
      const { levelId, selectedItems: selectedItemIds } = payload
      const { examLevelList } = state
      const index = findIndexById(examLevelList, levelId)
      const newItems = {}
      const currentItems = examLevelList[index].items
      selectedItemIds.forEach((itemId) => {
        newItems[itemId] = currentItems[itemId] || 0
      })
      return set(`examLevelList[${index}].items`, newItems, state)
    },
    [EXAM_SELECT_ALL_LEVEL_ITEMS]: (state, { payload }) => {
      const { levelId, checked } = payload
      const { examLevelList } = state
      const index = findIndexById(examLevelList, levelId)
      let newItems = null
      if (checked) {
        newItems = {}
        const allExamItems = examLevelList[index].examItems
        allExamItems.forEach((item) => {
          // 更新考试的时候会统一计算ratio
          newItems[item.id] = 0
        })
      }
      return set(`examLevelList[${index}].items`, newItems, state)
    },
    [EXAM_UPDATE_LEVEL_CHECK]: (state, { payload }) => {
      const { levelId, checked } = payload
      const index = findIndexById(state.examLevelList, levelId)
      return set(`examLevelList[${index}].items`, checked ? {} : null, state)
    },
    [EXAM_RESET_STORE]: () => {
      return initState
    },
  },
  initState
)

export default exam
