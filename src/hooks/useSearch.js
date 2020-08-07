import { useLocation } from 'react-router'
import * as queryString from 'query-string'

const useSearch = () => {
  const location = useLocation()
  return queryString.parse(location.search)
}

export default useSearch
