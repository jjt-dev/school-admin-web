import React, { useEffect } from 'react'
import { Spin } from 'antd'
import Header from 'src/views/App/Header'
import { local, SCHOOL_CODE, session } from 'src/utils/storage'
import { useSelector, useDispatch } from 'react-redux'
import * as appAction from 'src/actions/app'
import SideMenu from 'src/views/App/SideMenu'
import useDidMount from 'src/hooks/useDidMount'
import ErrorBoundary from 'src/components/ErrorBoundary'
import JjtBreadcrumb from 'src/views/App/JjtBreadcrumb'
import classnames from 'classnames'
import useActiveRoute from 'src/hooks/useActiveRoute'
import useLogin from 'src/hooks/useLogin'
import useSearch from 'src/hooks/useSearch'
import Router from '../Router'
import './index.less'
import ChromeCheck from './ChromeCheck'
import MiniProgram from '../MiniProgram'

const App = () => {
  const { mode } = useSearch()
  const dispatch = useDispatch()
  const activeRoute = useActiveRoute()
  const isLogin = useLogin()
  const { loading, user, allCourses } = useSelector((state) => state.app)
  const { schoolCode } = useSearch()
  const isMiniProgram = mode === 'miniProgram'

  /**
   * 从用户输入的url中拿到schoolCode
   */
  useDidMount(() => {
    if (schoolCode) {
      local.setItem(SCHOOL_CODE, schoolCode)
    }
    session.clear()
  })

  useEffect(() => {
    if (!isLogin) {
      dispatch(appAction.getUserInfo())
    }
  }, [dispatch, isLogin])

  useEffect(() => {
    if (user) {
      dispatch(appAction.getAllCourses())
      dispatch(appAction.getAllCoaches())
      dispatch(appAction.getAllExamLevels())
      dispatch(appAction.getAllSigningExams())
      dispatch(appAction.getAllExaminers())
      dispatch(appAction.getAllRooms())
    }
  }, [dispatch, user])

  const changeCourse = (courseId) => {
    local.setItem('course', courseId)
    window.location.reload()
  }

  return (
    <div
      className={classnames('app', {
        'breadcrumb-active': activeRoute.back,
        'print-certificate': activeRoute.isPrintCertif,
        'login-page': isLogin,
      })}
    >
      {!isMiniProgram && (
        <>
          <Header
            user={user}
            courses={allCourses}
            changeCourse={changeCourse}
          />
          <main>
            <SideMenu />
            <ErrorBoundary>
              <JjtBreadcrumb />
              {isLogin || user ? <Router /> : <div></div>}
            </ErrorBoundary>
          </main>
          {loading && <Spin />}
          <ChromeCheck />
        </>
      )}
      {isMiniProgram && <MiniProgram />}
    </div>
  )
}

export default App
