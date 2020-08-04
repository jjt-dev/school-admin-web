import React from 'react'
import PageForm from 'src/components/PageForm'

const School = () => {
  return <PageForm formItems={formItems} />
}

export default School

const formItems = [
  {
    label: '名称',
    name: 'name',
    comp: 'FormInput',
  },
  {
    label: 'Logo',
    name: 'logoUrl',
    comp: 'FormImage',
    message: '请上传logo',
  },
  {
    label: '地址',
    name: 'address',
    comp: 'FormInput',
  },
  {
    label: '电话',
    name: 'linkPhone',
    comp: 'FormInput',
  },
  {
    label: '联系人',
    name: 'linkMan',
    comp: 'FormInput',
  },
  {
    label: '网址',
    name: 'website',
    comp: 'FormInput',
    required: false,
  },
  {
    label: '道馆介绍',
    type: 'textarea',
    name: 'note',
    comp: 'FormInput',
    required: false,
  },
]
