import { handleActions } from 'redux-actions'
import {
  GET_AVAILABLE_EXAM_LEVELS,
  GET_EXAM_SIGN,
  EXAM_SIGN_RESET_STORE,
} from 'src/actions/examSign'

const initState = {
  signInEdit: null,
  availableExamLevels: [],
}

const examSign = handleActions(
  {
    [GET_EXAM_SIGN]: (state, { payload }) => {
      return {
        ...state,
        signInEdit: {
          ...payload.signInfo,
          ...payload.studentInfo,
          signLevels: payload.signLevels,
        },
      }
    },
    [GET_AVAILABLE_EXAM_LEVELS]: (state, { payload }) => {
      return {
        ...state,
        availableExamLevels: payload,
      }
    },
    [EXAM_SIGN_RESET_STORE]: () => {
      return initState
    },
  },
  initState
)

export default examSign
