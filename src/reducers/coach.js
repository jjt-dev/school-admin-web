import { handleActions } from 'redux-actions'
import set from 'lodash/fp/set'
import flow from 'lodash/fp/flow'
import {
  GET_COACH_LIST,
  COACH_UPDATE_FILTER,
  GET_COACH,
  COACH_RESET_STORE,
} from 'src/actions/coach'

const initState = {
  coachList: [],
  total: 0,
  filter: {
    search: '',
    paginator: {
      page: 1,
      rows: 10,
    },
  },
  coachInEdit: null,
}

const coach = handleActions(
  {
    [GET_COACH]: (state, { payload }) => {
      return {
        ...state,
        coachInEdit: payload,
      }
    },
    [GET_COACH_LIST]: (state, { payload }) => {
      return flow(
        set(`coachList`, payload.data),
        set(`total`, payload.totalRecords)
      )(state)
    },
    [COACH_UPDATE_FILTER]: (state, { payload }) => {
      return set(`filter[${payload.field}]`, payload.value, state)
    },
    [COACH_RESET_STORE]: () => {
      return initState
    },
  },
  initState
)

export default coach
