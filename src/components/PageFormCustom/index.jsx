import React from 'react'
import { Form } from 'antd'
import { formLayout } from 'src/utils/const'
import { getStatus } from 'src/utils/common'
import FormBottom from 'src/components/FormBottom'
import { useRouteMatch } from 'react-router'
import useActiveRoute from 'src/hooks/useActiveRoute'
import usePageForm from './usePageForm'

const PageFormCustom = ({ onFinish, children, title, customClass }) => {
  const match = useRouteMatch()
  const { title: defaultTitle, back } = useActiveRoute()
  const [form] = Form.useForm()
  const entityId = match.params.id
  const isEdit = !!entityId
  const status = getStatus(isEdit)
  if (!title) {
    title = defaultTitle
  }

  return (
    <div className={`page jjt-form ${customClass}`}>
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

PageFormCustom.usePageForm = usePageForm

export default PageFormCustom
