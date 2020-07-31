import { useState, useEffect, useCallback, useRef } from 'react'
import { debounce } from 'lodash'
import CustomTable from '.'

const defaultPageSizeOptions = ['10', '20', '30', '50', '100']

const useTableFetch = (defaultPath = null, options = {}) => {
  const { defaultValue = [], ...defaultSearch } = options
  const [path, setPath] = useState(defaultPath)
  const [data, setData] = useState(defaultValue)
  const [hasPagination, setHasPagination] = useState(true)
  const [refreshInterval, setRefreshInterval] = useState()
  const [total, setTotal] = useState(0)
  const [forceRefreshCount, setForceRefreshCount] = useState(0)
  const [paginator, setPaignator] = useState({
    current: 1,
    pageSize: Number(defaultPageSizeOptions[0]),
  })
  const [sorter, setSorter] = useState({})
  const [filters, setFilters] = useState({})
  const defaultSearchRef = useRef(defaultSearch)
  const [search, setSearch] = useState(defaultSearchRef.current)
  const [loading, setLoading] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => setSelectedRowKeys(selectedRowKeys),
  }

  const resetPaginator = useCallback(() => {
    setPaignator((pre) => ({
      current: 1,
      pageSize: pre.pageSize,
    }))
  }, [])

  /**
   * __tableChange__的命名方式是为了不被用户碰巧同名
   */
  const updateSearch = useCallback(
    (value) => {
      if (value.__tableChange__) {
        const {
          paginator: newPaginator,
          filters: newFilters,
          sorter: newSorter,
        } = value.__tableChange__
        setPaignator({
          current: newPaginator.current,
          pageSize: newPaginator.pageSize,
        })
        setFilters(newFilters)
        setSorter({
          sort: newSorter.field,
          direction: newSorter.order,
        })
        return
      }

      if (value.__updateDefaultPageSize__) {
        setPaignator((pre) => ({
          ...pre,
          pageSize: value.__updateDefaultPageSize__,
        }))
        return
      }

      if (value.__updateHasPagination__ === false) {
        setHasPagination(false)
        return
      }

      if (value.__updateRefreshInterval__) {
        setRefreshInterval(value.__updateRefreshInterval__)
        return
      }

      const length = Object.keys(value).length
      setSearch(
        length
          ? (pre) => ({
              ...pre,
              ...value,
            })
          : defaultSearchRef.current
      )
      // 搜索条件变化的时候需要把分页重置
      resetPaginator()
    },
    [resetPaginator]
  )

  /**
   * value如果是string那么就是path,如果是object就是filter对象
   */
  const fetchTable = useCallback(
    (value) => {
      if (value) {
        const type = typeof value
        switch (type) {
          case 'string':
            setPath(value)
            resetPaginator()
            break

          case 'object':
            updateSearch(value)
            break

          default:
            break
        }
      } else {
        setForceRefreshCount((pre) => pre + 1)
      }
    },
    [resetPaginator, updateSearch]
  )

  useEffect(() => {
    let interval
    if (refreshInterval) {
      interval = setInterval(() => {
        setForceRefreshCount((pre) => pre + 1)
      }, refreshInterval)
    }
    return () => clearInterval(interval)
  }, [refreshInterval])

  const debouncedFetch = useCallback(
    debounce(
      async (
        path,
        search,
        paginator,
        filters,
        sorter,
        setData,
        setTotal,
        hasPagination
      ) => {
        setLoading(true)
        try {
          const { current, pageSize } = paginator
          path += `?page=${current}&rows=${pageSize}`
          Object.keys(search).forEach((key) => {
            if (isNotEmpty(search[key])) {
              path += `&${key}=${search[key]}`
            }
          })
          Object.keys(filters).forEach((key) => {
            if (isNotEmpty(filters[key])) {
              path += `&${key}=${filters[key]}`
            }
          })
          const result = await CustomTable.api.get(path)
          if (hasPagination) {
            setData(result.data)
            setTotal(result.totalRecords)
          } else {
            setData(result)
          }
        } finally {
          setLoading(false)
        }
      },
      200
    ),
    []
  )

  useEffect(() => {
    if (!CustomTable.api || !CustomTable.api.post) {
      console.error(
        '没有引入api接口。请参考http://192.168.199.203/components/general/custom-table/使用说明'
      )
      return
    }
    if (path) {
      debouncedFetch(
        path,
        search,
        paginator,
        filters,
        sorter,
        setData,
        setTotal,
        hasPagination
      )
    }
  }, [
    paginator,
    search,
    path,
    forceRefreshCount,
    debouncedFetch,
    filters,
    sorter,
    hasPagination,
  ])

  const pagination = {
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: defaultPageSizeOptions,
    size: 'small',
    ...paginator,
    total,
  }

  return {
    dataSource: data,
    search,
    loading,
    fetchTable,
    pagination: hasPagination ? pagination : false,
    rowSelection,
    selectedRowKeys,
  }
}

export default useTableFetch

const isNotEmpty = (value) => {
  if (!value) return false
  if (Array.isArray(value)) {
    return value.length > 0
  }
  if (typeof value === 'boolean') return value
  if (value instanceof Object) return value

  return value.trim() !== ''
}
