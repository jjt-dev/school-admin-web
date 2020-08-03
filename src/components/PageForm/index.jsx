import React, { useEffect } from 'react'
import { Form, message } from 'antd'
import { formLayout } from 'src/utils/const'
import { buildParameters, getStatus } from 'src/utils/common'
import api from 'src/utils/api'
import FormBottom from 'src/components/FormBottom'
import useFetch from 'src/hooks/useFetch'
import { useHistory, useRouteMatch } from 'react-router'
import useActiveRoute from 'src/hooks/useActiveRoute'

const PageForm = ({ callback, children }) => {
  const match = useRouteMatch()
  const history = useHistory()
  const { path, title, back, defaultPath = path } = useActiveRoute()
  const [form] = Form.useForm()
  const entityId = match.params.id
  const isEdit = !!entityId
  const status = getStatus(isEdit)
  const [entity] = useFetch(isEdit ? `${defaultPath}/item?id=${entityId}` : '')

  useEffect(() => {
    form.setFieldsValue(entity ?? null)
  }, [entity, form])

  const onFinish = async (values) => {
    if (!!entityId) {
      values.id = entityId
    }
    await api.post(buildParameters(`${defaultPath}/edit`, values))
    message.success(`${status}${title}成功`)
    history.push(back.path)
    callback && callback()
  }

  return (
    <div className="page jjt-form">
      <div className="jjt-form-title">
        {status}
        {title}
      </div>
      <Form {...formLayout} form={form} onFinish={onFinish}>
        {children}
        <FormBottom path={back} />
      </Form>
    </div>
  )
}

export default PageForm
