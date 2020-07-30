import React, { useEffect, useMemo } from 'react'
import { Spin } from 'antd'
import Header from 'src/components/Header'
import { parseSearches } from 'src/utils/common'
import { local, SCHOOL_CODE } from 'src/utils/storage'
import { useSelector, useDispatch } from 'react-redux'
import * as appAction from 'src/actions/app'
import SideMenu from 'src/views/App/SideMenu'
import useDidMount from 'src/hooks/useDidMount'
import Router, { routes } from '../Router'
import './index.less'
import { useHistory, useLocation } from 'react-router'
import ErrorBoundary from 'src/components/ErrorBoundary'
import JjtBreadcrumb from 'src/components/JjtBreadcrumb'
import { matchPath } from 'react-router'
import classnames from 'classnames'

const App = () => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const { loading, user } = useSelector((state) => state.app)
  const isLoginPage = useMemo(() => location.pathname.startsWith('/login'), [
    location,
  ])

  const activeRoute = useMemo(() => {
    return routes.find(
      (route) =>
        !!matchPath(location.pathname, { path: route.path, exact: true })
    )
  }, [location])

  const hasBreadcrumb = activeRoute && activeRoute.back

  /**
   * 从用户输入的url中拿到schoolCode
   */
  useDidMount(() => {
    const { schoolCode } = parseSearches(location)
    if (schoolCode) {
      local.setItem(SCHOOL_CODE, schoolCode)
    }
  })

  useEffect(() => {
    if (!isLoginPage) {
      dispatch(appAction.getUserInfo())
    }
  }, [dispatch, isLoginPage])

  useEffect(() => {
    if (user) {
      dispatch(appAction.getAllCoaches())
      dispatch(appAction.getAllExamLevels())
      dispatch(appAction.getAllSigningExams())
      dispatch(appAction.getAllExaminers())
      dispatch(appAction.getAllRooms())
    }
  }, [dispatch, user])

  return (
    <div
      className={classnames('app', {
        'breadcrumb-active': hasBreadcrumb,
        'print-certificate': activeRoute?.isPrintCertif,
        'login-page': isLoginPage,
      })}
    >
      {/* <Header user={user} /> */}
      <main>
        <SideMenu history={history} location={location} />
        <ErrorBoundary>
          <JjtBreadcrumb activeRoute={activeRoute} history={history} />
          {isLoginPage || user ? <Router /> : <div></div>}
        </ErrorBoundary>
      </main>
      {loading && <Spin />}
    </div>
  )
}

export default App
