import { createAction } from 'redux-actions'
import api from 'src/utils/api'

export const GET_EXAMINEE = 'GET_EXAMINEE'
export const GET_EXAMINEE_LIST = 'GET_EXAMINEE_LIST'

export const EXAMINEE_UPDATE_FILTER = 'EXAMINEE_UPDATE_FILTER'

export const EXAMINEE_RESET_STORE = 'EXAMINEE_RESET_STORE'

export const getExaminee = createAction(GET_EXAMINEE, (studentId) =>
  api.get(`/student/studentInfo?studentId=${studentId}`)
)

export const getExamineeList = createAction(GET_EXAMINEE_LIST, (filter) => {
  const { paginator, search } = filter
  const { page, rows } = paginator
  let path = `/student/examResults?page=${page}&rows=${rows}`
  if (search) {
    path += `&keyword=${search}`
  }
  return api.get(path)
})

export const updateFilter = createAction(
  EXAMINEE_UPDATE_FILTER,
  (field, value) => ({
    field,
    value,
  })
)

export const resetStore = createAction(EXAMINEE_RESET_STORE, (params) => params)
