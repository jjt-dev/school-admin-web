import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { showLoadingBar, closeLoadingBar } from 'src/actions/app'

const useLoading = () => {
  const dispatch = useDispatch()

  const callWithLoading = useCallback(
    async (callback) => {
      try {
        dispatch(showLoadingBar())
        await callback()
      } finally {
        dispatch(closeLoadingBar())
      }
    },
    [dispatch]
  )

  return [callWithLoading]
}

export default useLoading
