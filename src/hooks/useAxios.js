import axios from 'axios'
import { useEffect, useState } from 'react'
import { WP_REST_API } from '@/constants'

export const useAxios = (apiRoute) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(undefined)
  const [error, setError] = useState(undefined)

  useEffect(() => {
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
  }, [])

  return { data, error, loading }
}