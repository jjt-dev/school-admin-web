import { handleActions } from 'redux-actions'
import set from 'lodash/fp/set'
import flow from 'lodash/fp/flow'
import {
  GET_ROOM_LIST,
  GET_ROOM,
  ROOM_UPDATE_FILTER,
  ROOM_RESET_STORE,
} from 'src/actions/room'

const initState = {
  roomList: [],
  total: 0,
  filter: {
    search: '',
    paginator: {
      page: 1,
      rows: 10,
    },
  },
  roomInEdit: null,
}

const room = handleActions(
  {
    [GET_ROOM]: (state, { payload }) => {
      return {
        ...state,
        roomInEdit: payload,
      }
    },
    [GET_ROOM_LIST]: (state, { payload }) => {
      return flow(
        set(`roomList`, payload.data),
        set(`total`, payload.totalRecords)
      )(state)
    },
    [ROOM_UPDATE_FILTER]: (state, { payload }) => {
      return set(`filter[${payload.field}]`, payload.value, state)
    },
    [ROOM_RESET_STORE]: () => {
      return initState
    },
  },
  initState
)

export default room
