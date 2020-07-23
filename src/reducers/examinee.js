import { handleActions } from 'redux-actions'
import set from 'lodash/fp/set'
import flow from 'lodash/fp/flow'
import {
  GET_EXAMINEE_LIST,
  EXAMINEE_UPDATE_FILTER,
  GET_EXAMINEE,
  EXAMINEE_RESET_STORE,
} from 'src/actions/examinee'

const initState = {
  examineeList: [],
  total: 0,
  filter: {
    search: '',
    paginator: {
      page: 1,
      rows: 10,
    },
  },
  examineeDetail: null,
}

const coach = handleActions(
  {
    [GET_EXAMINEE]: (state, { payload }) => {
      return {
        ...state,
        examineeDetail: payload,
      }
    },
    [GET_EXAMINEE_LIST]: (state, { payload }) => {
      return flow(
        set(`examineeList`, payload.data),
        set(`total`, payload.totalRecords)
      )(state)
    },
    [EXAMINEE_UPDATE_FILTER]: (state, { payload }) => {
      return set(`filter[${payload.field}]`, payload.value, state)
    },
    [EXAMINEE_RESET_STORE]: () => {
      return initState
    },
  },
  initState
)

export default coach
