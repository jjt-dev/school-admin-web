import { routerMiddleware, connectRouter } from 'connected-react-router'
import { applyMiddleware } from 'redux'
import thunkMiddleware from './middlewares/thunk'
import promiseMiddleware from './middlewares/promise'
import errorMiddleware from './middlewares/error'
import loadingMiddleware from './middlewares/loading'
import app from 'src/reducers/app'
import coach from 'src/reducers/coach'
import exam from 'src/reducers/exam'
import examSign from 'src/reducers/examSign'
import examGroup from 'src/reducers/examGroup'
import examinee from 'src/reducers/examinee'
import examiner from 'src/reducers/examiner'
import room from 'src/reducers/room'
import certificate from 'src/reducers/certificate'

import { createStore } from 'src/utils/injectReducer'

export default (history) => {
  return createStore(
    {
      router: connectRouter(history),
      app,
      coach,
      exam,
      examSign,
      examGroup,
      examinee,
      examiner,
      room,
      certificate,
    },
    applyMiddleware(
      routerMiddleware(history),
      thunkMiddleware,
      loadingMiddleware,
      promiseMiddleware,
      errorMiddleware
    )
  )
}
