import { createAction } from 'redux-actions'
import api from 'src/utils/api'

export const GET_CERTIFICATE_LIST = 'GET_COACH_LIST'
export const GET_CERTIFICATE = 'GET_CERTIFICATE'

export const CERTIFICATE_UPDATE_FILTER = 'CERTIFICATE_UPDATE_FILTER'

export const UPDATE_BASIC_INFO = 'UPDATE_BASIC_INFO'

export const RESET_CERTIFICATE = 'RESET_CERTIFICATE'

export const getCertificate = createAction(GET_CERTIFICATE, (id) =>
  api.get(`/config/file/item?id=${id}`)
)

export const getCertificateList = createAction(
  GET_CERTIFICATE_LIST,
  (filter) => {
    const { paginator, search } = filter
    const { page, rows } = paginator
    let path = `/config/file/page?page=${page}&rows=${rows}`
    if (search) {
      path += `&keyword=${search}`
    }
    return api.get(path)
  }
)

export const updateBasicInfo = createAction(
  UPDATE_BASIC_INFO,
  (position, name) => ({
    position,
    name,
  })
)

export const updateFilter = createAction(
  CERTIFICATE_UPDATE_FILTER,
  (field, value) => ({
    field,
    value,
  })
)

export const resetCertificate = createAction(
  RESET_CERTIFICATE,
  (params) => params
)
