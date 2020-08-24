import React, { useEffect } from 'react'
import { Form, message } from 'antd'
import { formLayout } from 'src/utils/const'
import { getStatus, buildFormPath } from 'src/utils/common'
import api from 'src/utils/api'
import FormBottom from 'src/components/FormBottom'
import useFetch from 'src/hooks/useFetch'
import { useHistory, useRouteMatch } from 'react-router'
import useActiveRoute from 'src/hooks/useActiveRoute'
import FormInput from '../FormInput'
import FormEnableRadio from '../FormEnableRadio'
import FormImage from '../FormImage'
import FormSelect from '../FormSelect'
import FormGender from '../FormGender'
import FormDate from '../FormDate'

const PageForm = ({ callback, formItems }) => {
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
    await api.post(buildFormPath(`${defaultPath}/edit`, values))
    message.success(`${status}${title}成功`)
    if (back) {
      history.push(back.path)
    }
    callback && callback()
  }

  return (
    <div className="page jjt-form">
      <div className="jjt-form-title">
        {status}
        {title}
      </div>
      <Form {...formLayout} form={form} onFinish={onFinish}>
        {formItems.map((item, index) => {
          const { comp, disabled, hide, ...rest } = item
          rest.key = index
          rest.form = form
          if (disabled === 'isEdit') {
            rest.disabled = isEdit
          }
          if (hide === 'isEdit') {
            rest.hide = isEdit
          }
          if (comp === 'FormImage') {
            rest.imageUrl = entity ? entity[item.name] : ''
          }
          return React.createElement(compMap[comp], rest)
        })}
        <FormBottom path={back?.path} />
      </Form>
    </div>
  )
}

export default PageForm

const compMap = {
  FormInput,
  FormEnableRadio,
  FormImage,
  FormSelect,
  FormGender,
  FormDate,
}
