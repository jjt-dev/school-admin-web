import React from 'react'
import { Breadcrumb, Button } from 'antd'
import './index.less'
import { useHistory, useRouteMatch } from 'react-router'
import useActiveRoute from 'src/hooks/useActiveRoute'

const JjtBreadcrumb = () => {
  const activeRoute = useActiveRoute()
  const history = useHistory()
  const match = useRouteMatch({
    path: activeRoute?.path,
    strict: true,
    sensitive: true,
  })

  if (!activeRoute?.back) return null

  const buildReturnUrl = () => {
    const { back } = activeRoute
    let backUrl = back.path
    if (back.params) {
      back.params.forEach((param) => {
        backUrl = backUrl.replace(`:${param}`, match.params[param])
      })
    }
    return backUrl
  }

  return (
    <div className="jjt__breadcrumb">
      <Breadcrumb separator=">">
        {activeRoute.back.breadcrumbs.map((item) => (
          <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
      <Button
        type="primary"
        size="small"
        onClick={() => history.push(buildReturnUrl())}
      >
        返回
      </Button>
    </div>
  )
}

export default JjtBreadcrumb
