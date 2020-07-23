import { createAction } from 'redux-actions'
import api from 'src/utils/api'

export const GET_ROOM = 'GET_ROOM'
export const GET_ROOM_LIST = 'GET_ROOM_LIST'

export const ROOM_UPDATE_FILTER = 'ROOM_UPDATE_FILTER'

export const ROOM_RESET_STORE = 'ROOM_RESET_STORE'

export const getRoom = createAction(GET_ROOM, (id) =>
  api.get(`/config/room/item?id=${id}`)
)

export const geRoomList = createAction(GET_ROOM_LIST, (filter) => {
  const { paginator, search } = filter
  const { page, rows } = paginator
  let path = `/config/room/page?page=${page}&rows=${rows}`
  if (search) {
    path += `&keyword=${search}`
  }
  return api.get(path)
})

export const updateFilter = createAction(
  ROOM_UPDATE_FILTER,
  (field, value) => ({
    field,
    value,
  })
)

export const resetStore = createAction(ROOM_RESET_STORE, (params) => params)
