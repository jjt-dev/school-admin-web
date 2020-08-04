import React from 'react'
import { useDispatch } from 'react-redux'
import PageForm from 'src/components/PageForm'
import { getAllCoaches } from 'src/actions/app'

const Coach = () => {
  const dispatch = useDispatch()

  return (
    <PageForm
      callback={() => dispatch(getAllCoaches())}
      formItems={formItems}
    />
  )
}

export default Coach

const formItems = [
  {
    label: '手机号',
    comp: 'FormInput',
    name: 'phone',
  },
  {
    label: '姓名',
    comp: 'FormInput',
    name: 'username',
    disabled: 'isEdit',
  },
  {
    label: '昵称',
    comp: 'FormInput',
    name: 'nickname',
  },
  {
    comp: 'FormEnableRadio',
  },
  {
    label: '描述',
    comp: 'FormInput',
    type: 'textarea',
    name: 'note',
    required: false,
  },
]
