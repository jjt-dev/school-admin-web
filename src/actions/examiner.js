import { createAction } from 'redux-actions'
import api from 'src/utils/api'

export const GET_EXAMINER = 'GET_EXAMINER'
export const GET_EXAMINER_LIST = 'GET_EXAMINER_LIST'

export const EXAMINER_RESET_EDIT = 'EXAMINER_RESET_EDIT'
export const EXAMINER_RESET_STORE = 'EXAMINER_RESET_STORE'

export const EXAMINER_UPDATE_FILTER = 'EXAMINER_UPDATE_FILTER'

export const getExaminer = createAction(GET_EXAMINER, (id) =>
  api.get(`/examiner/item?id=${id}`)
)

export const getExaminerList = createAction(GET_EXAMINER_LIST, (filter) => {
  const { paginator, search } = filter
  const { page, rows } = paginator
  let path = `/examiner/page?page=${page}&rows=${rows}`
  if (search) {
    path += `&keyword=${search}`
  }
  return api.get(path)
})

export const updateFilter = createAction(
  EXAMINER_UPDATE_FILTER,
  (field, value) => ({
    field,
    value,
  })
)

export const resetEdit = createAction(EXAMINER_RESET_EDIT, () => {})

export const resetStore = createAction(EXAMINER_RESET_STORE, (params) => params)
