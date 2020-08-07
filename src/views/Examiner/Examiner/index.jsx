import React from 'react'
import { useDispatch } from 'react-redux'
import { getAllExaminers } from 'src/actions/app'
import PageForm from 'src/components/PageForm'

const Examiner = () => {
  const dispatch = useDispatch()

  return (
    <PageForm
      callback={() => dispatch(getAllExaminers())}
      formItems={formItems}
    />
  )
}

export default Examiner

const formItems = [
  {
    label: '姓名',
    comp: 'FormInput',
    name: 'username',
    disabled: 'isEdit',
  },
  {
    label: '考官编号',
    comp: 'FormInput',
    name: 'number',
    disabled: 'isEdit',
  },
  {
    label: '手机号',
    comp: 'FormInput',
    name: 'phone',
  },
  {
    label: '密码',
    comp: 'FormInput',
    name: 'password',
    hide: 'isEdit',
  },
  {
    label: '照片',
    comp: 'FormImage',
    name: 'faceUrl',
    message: '请上传头像图片',
  },
  {
    comp: 'FormEnableRadio',
  },
  {
    label: '简历',
    comp: 'FormInput',
    type: 'textarea',
    name: 'note',
    required: false,
  },
]
