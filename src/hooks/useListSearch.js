import { useState, useEffect, useCallback, useRef } from 'react'
import { debounce } from 'lodash'
import api from 'src/utils/api'
import { showLoadingBar, closeLoadingBar } from 'src/actions/app'
import { useDispatch } from 'react-redux'
import { pagConfig } from 'src/utils/const'
import { isNotEmpty } from 'src/utils/common'

const useListSearch = (defaultPath, options = {}) => {
  const dispatch = useDispatch()
  const [path, setPath] = useState(defaultPath)
  const {
    pagination = true,
    pageSize = 10,
    defaultValue = [],
    ...defaultFilter
  } = options
  const [data, setData] = useState(defaultValue)
  const [total, setTotal] = useState(0)
  const [forceRefreshCount, setForceRefreshCount] = useState(0)
  const [paginator, setPaignator] = useState({ current: 1, pageSize })
  const initFilterRef = useRef(defaultFilter)
  const [filter, setFilter] = useState(initFilterRef.current)

  const resetPaginator = useCallback(() => {
    setPaignator((pre) => ({ current: 1, pageSize: pre.pageSize }))
  }, [])

  const updateFilter = useCallback(
    (value) => {
      const newPaginator = value.paginator
      if (newPaginator) {
        setPaignator({
          current: newPaginator.current,
          pageSize: newPaginator.pageSize,
        })
        return
      }

      const length = Object.keys(value).length
      setFilter(
        length ? (pre) => ({ ...pre, ...value }) : initFilterRef.current
      )
      // 搜索条件变化的时候需要把分页重置
      resetPaginator()
    },
    [resetPaginator]
  )

  /**
   * value如果是string那么就是path,如果是object就是filter对象
   */
  const refetchList = useCallback(
    (value) => {
      if (value) {
        const type = typeof value
        // eslint-disable-next-line default-case
        switch (type) {
          case 'string':
            setPath(value)
            resetPaginator()
            break

          case 'object':
            updateFilter(value)
            break
        }
      } else {
        setForceRefreshCount((pre) => pre + 1)
      }
    },
    [resetPaginator, updateFilter]
  )

  const debouncedFetch = useCallback(
    debounce(async (path, paginator, filter, setData, setTotal) => {
      dispatch(showLoadingBar())
      try {
        const { current, pageSize } = paginator
        path += `?page=${current}&rows=${pageSize}`
        Object.keys(filter).forEach((key) => {
          if (isNotEmpty(filter[key])) {
            path += `&${key}=${filter[key]}`
          }
        })
        const result = await api.get(path)
        if (pagination) {
          setData(result.data)
          setTotal(result.totalRecords)
        } else {
          setData(result)
        }
      } finally {
        dispatch(closeLoadingBar())
      }
    }, 200),
    []
  )

  useEffect(() => {
    if (path) {
      debouncedFetch(path, paginator, filter, setData, setTotal)
    }
  }, [paginator, filter, path, forceRefreshCount, debouncedFetch])

  return {
    data,
    filter,
    refetchList,
    pagination: {
      ...pagConfig,
      ...paginator,
      total,
    },
  }
}

export default useListSearch
