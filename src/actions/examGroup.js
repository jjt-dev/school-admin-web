import { createAction } from 'redux-actions'
import api from 'src/utils/api'

export const GROUP_GET_EXAM = 'GROUP_GET_EXAM'
export const GET_GROUP_STUDENT_LIST = 'GET_GROUP_STUDENT_LIST'
export const GET_EXAM_GROUP_LIST = 'GET_EXAM_GROUP_LIST'

export const EXAM_GROUP_UPDATE_FILTER = 'EXAM_GROUP_UPDATE_FILTER'

export const EXAM_GROUP_RESET_STORE = 'EXAM_GROUP_RESET_STORE'

export const getExam = createAction(GROUP_GET_EXAM, (examId) =>
  api.get(`/examination/item?id=${examId}`)
)

export const getGroupStudentList = createAction(
  GET_GROUP_STUDENT_LIST,
  (examId, filter) => {
    const { paginator, search } = filter
    const { page, rows } = paginator
    let path = `/examination/examinationStudentGrouped?examinationId=${examId}&page=${page}&rows=${rows}`
    if (search) {
      path += `&keyword=${search}`
    }
    return api.get(path)
  }
)

export const updateFilter = createAction(
  EXAM_GROUP_UPDATE_FILTER,
  (field, value) => ({
    field,
    value,
  })
)

export const resetStore = createAction(
  EXAM_GROUP_RESET_STORE,
  (params) => params
)
