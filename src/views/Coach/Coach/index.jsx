import React from 'react'
import './index.less'
import { useDispatch } from 'react-redux'
import FormInput from 'src/components/FormInput'
import FormEnableRadio from 'src/components/FormEnableRadio'
import PageForm from 'src/components/PageForm'
import { getAllCoaches } from 'src/actions/app'

const Coach = ({ match }) => {
  const dispatch = useDispatch()
  const isEdit = !!match.params.id

  return (
    <PageForm callback={() => dispatch(getAllCoaches())}>
      <FormInput label="手机号" name="phone" />
      <FormInput label="姓名" name="username" disabled={isEdit} />
      <FormInput label="昵称" name="nickname" />
      <FormEnableRadio />
      <FormInput type="textarea" label="描述" name="note" required={false} />
    </PageForm>
  )
}

export default Coach

const formItems = [
  {
    comp: 'FormInput',
    label: '手机号',
    name: 'phone',
  },
  {
    comp: 'FormInput',
    label: '姓名',
    name: 'username',
    disabled: 'isEdit',
  },
  {
    comp: 'FormInput',
    label: '昵称',
    name: 'nickname',
  },
  {
    comp: 'FormEnableRadio',
  },
  {
    comp: 'FormInput',
    type: 'textarea',
    label: '描述',
    name: 'note',
    required: false,
  },
]
