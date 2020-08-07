import React from 'react'
import { useDispatch } from 'react-redux'
import { getAllRooms } from 'src/actions/app'
import PageForm from 'src/components/PageForm'

const Room = () => {
  const dispatch = useDispatch()

  return (
    <PageForm callback={() => dispatch(getAllRooms())} formItems={formItems} />
  )
}

export default Room

const formItems = [
  {
    label: '考场',
    name: 'name',
    comp: 'FormInput',
  },
  {
    label: '地点',
    name: 'address',
    comp: 'FormInput',
  },
]
