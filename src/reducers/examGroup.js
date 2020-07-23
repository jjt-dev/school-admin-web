import { handleActions } from 'redux-actions'
import set from 'lodash/fp/set'
import flow from 'lodash/fp/flow'
import {
  GROUP_GET_EXAM,
  GET_GROUP_STUDENT_LIST,
  EXAM_GROUP_UPDATE_FILTER,
  EXAM_GROUP_RESET_STORE,
} from 'src/actions/examGroup'

const initState = {
  exam: null,
  total: 0,
  groupStudentList: [],
  filter: {
    search: '',
    paginator: {
      page: 1,
      rows: 10,
    },
  },
}

const examGroup = handleActions(
  {
    [GROUP_GET_EXAM]: (state, { payload }) => {
      return {
        ...state,
        exam: payload,
      }
    },
    [GET_GROUP_STUDENT_LIST]: (state, { payload }) => {
      return flow(
        set(`groupStudentList`, payload.data),
        set(`total`, payload.totalRecords)
      )(state)
    },
    [EXAM_GROUP_UPDATE_FILTER]: (state, { payload }) => {
      return set(`filter[${payload.field}]`, payload.value, state)
    },
    [EXAM_GROUP_RESET_STORE]: () => {
      return initState
    },
  },
  initState
)

export default examGroup
