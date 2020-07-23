import { createAction } from 'redux-actions'
import api from 'src/utils/api'

export const GET_COACH_LIST = 'GET_COACH_LIST'
export const GET_COACH = 'GET_COACH'

export const COACH_UPDATE_FILTER = 'COACH_UPDATE_FILTER'

export const COACH_RESET_STORE = 'COACH_RESET_STORE'

export const getCoach = createAction(GET_COACH, (id) =>
  api.get(`/coach/item?id=${id}`)
)

export const getCoachList = createAction(GET_COACH_LIST, (filter) => {
  const { paginator, search } = filter
  const { page, rows } = paginator
  let path = `/coach/page?page=${page}&rows=${rows}`
  if (search) {
    path += `&keyword=${search}`
  }
  return api.get(path)
})

export const updateFilter = createAction(
  COACH_UPDATE_FILTER,
  (field, value) => ({
    field,
    value,
  })
)

export const resetStore = createAction(COACH_RESET_STORE, (params) => params)
