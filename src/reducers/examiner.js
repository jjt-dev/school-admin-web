import { handleActions } from 'redux-actions'
import set from 'lodash/fp/set'
import flow from 'lodash/fp/flow'
import {
  GET_EXAMINER_LIST,
  EXAMINER_UPDATE_FILTER,
  GET_EXAMINER,
  EXAMINER_RESET_EDIT,
  EXAMINER_RESET_STORE,
} from 'src/actions/examiner'

const initState = {
  examinerList: [],
  total: 0,
  filter: {
    search: '',
    paginator: {
      page: 1,
      rows: 10,
    },
  },
  examinerInEdit: null,
}

const examiner = handleActions(
  {
    [GET_EXAMINER]: (state, { payload }) => {
      return {
        ...state,
        examinerInEdit: payload,
      }
    },
    [GET_EXAMINER_LIST]: (state, { payload }) => {
      return flow(
        set(`examinerList`, payload.data),
        set(`total`, payload.totalRecords)
      )(state)
    },
    [EXAMINER_UPDATE_FILTER]: (state, { payload }) => {
      return set(`filter[${payload.field}]`, payload.value, state)
    },
    [EXAMINER_RESET_EDIT]: (state) => {
      return set(`examinerInEdit`, null, state)
    },
    [EXAMINER_RESET_STORE]: () => {
      return initState
    },
  },
  initState
)

export default examiner
