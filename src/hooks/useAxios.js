import axios from 'axios'
import { useEffect, useState } from 'react'
import { WP_REST_API } from '@/constants'

export const useAxios = (apiRoute, options) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(undefined)
  const [error, setError] = useState(undefined)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    if(!options?.skip) {
      setLoading(true)
      axios
        .get(`${WP_REST_API}${apiRoute}`)
        .then((response) => {
          setLoading(false)
          setData(response?.data)
        }).catch((err) => {
          console.log('err', err)
          setLoading(false)
          setError(err)
        })
    }
  }, [apiRoute])

  const getMore = async (offset) => {
    try {
      let response = await axios.get(`${WP_REST_API}${apiRoute}?offset=${offset}`)
      setData([ ...data, ...response?.data])
      if(response?.data?.length <= 0) {
        setHasMore(false)
      }
    } catch (err) {
      setError(err)
      setHasMore(false)
    }
  }

  return { data, error, loading, hasMore, getMore }
}