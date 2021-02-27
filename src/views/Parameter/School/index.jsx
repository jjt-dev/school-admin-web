import React from 'react'
import PageForm from 'src/components/PageForm'
import useFetch from 'src/hooks/useFetch'

const School = () => {
  const [associations = []] = useFetch(`/school/organizationList`)

  return <PageForm formItems={getFormItems(associations)} />
}

export default School

const getFormItems = (associations) => [
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
    noImageCrop: true,
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
    label: '学科协会',
    name: 'organizationId',
    titleKey: 'name',
    comp: 'FormSelect',
    options: associations,
  },
  {
    label: '付款码',
    name: 'qrCodeUrl',
    comp: 'FormImage',
    message: '请上传付款码',
    required: false,
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
