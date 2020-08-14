import { useState, useEffect, useCallback } from 'react'
import api from 'src/utils/api'
import { useDispatch } from 'react-redux'
import { showLoadingBar, closeLoadingBar } from 'src/actions/app'

const useFetch = (
  defaultPath,
  { params = null, hasPagination = false } = {}
) => {
  const dispatch = useDispatch()
  const [path, setPath] = useState(defaultPath)
  const [data, setData] = useState()
  const [forceRefreshCount, setForceRefreshCount] = useState(0)

  const refetch = useCallback((path) => {
    if (path) {
      setPath(path)
    }
    setForceRefreshCount((pre) => pre + 1)
  }, [])

  useEffect(() => {
    const fetchData = async ({ path, params }) => {
      try {
        dispatch(showLoadingBar())
        const result = await api.get(path, params)
        setData(hasPagination ? result.data : result)
        dispatch(closeLoadingBar())
      } catch (error) {
        console.log(error)
        dispatch(closeLoadingBar())
      }
    }
    if (path) {
      fetchData({ path, params })
    }
  }, [path, params, forceRefreshCount, dispatch, hasPagination])

  return [data, refetch]
}

export default useFetch
