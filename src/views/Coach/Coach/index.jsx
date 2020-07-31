import React, { useEffect } from 'react'
import './index.less'
import { Form, message } from 'antd'
import { formLayout } from 'src/utils/const'
import { buildParameters, getStatus } from 'src/utils/common'
import api from 'src/utils/api'
import { useDispatch } from 'react-redux'
import { getAllCoaches } from 'src/actions/app'
import FormInput from 'src/components/FormInput'
import FormEnableRadio from 'src/components/FormEnableRadio'
import FormBottom from 'src/components/FormBottom'
import useFetch from 'src/hooks/useFetch'

const Coach = ({ match, history }) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const coachId = match.params.id
  const isEdit = !!coachId
  const status = getStatus(isEdit)
  const [coach] = useFetch(isEdit ? `/coach/item?id=${coachId}` : '')

  useEffect(() => {
    form.setFieldsValue(coach ?? null)
  }, [coach, form])

  const onFinish = async (values) => {
    if (!!coachId) {
      values.id = coachId
    }
    await api.post(buildParameters(`/coach/edit`, values))
    message.success(`${status}教练成功`)
    dispatch(getAllCoaches())
    history.push('/coaches')
  }

  return (
    <div className="page jjt-form">
      <div className="jjt-form-title">{status}教练</div>
      <Form {...formLayout} form={form} onFinish={onFinish}>
        <FormInput label="手机号" name="phone" />
        <FormInput label="姓名" name="username" disabled={isEdit} />
        <FormInput label="昵称" name="nickname" />
        <FormEnableRadio />
        <FormInput type="textarea" label="描述" name="note" required={false} />
        <FormBottom path="/coaches" />
      </Form>
    </div>
  )
}

export default Coach
