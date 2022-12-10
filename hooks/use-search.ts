import { useEffect, useState } from 'react'

import { SearchType } from 'types/spotify'
import { useSpotify } from './use-spotify'

export const useSearch = (query: string | undefined, types: SearchType[]) => {
  const spotifyApi = useSpotify()

  const [data, setData] = useState<SpotifyApi.SearchResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setData(null)
    setError(null)

    if (query && spotifyApi.getAccessToken()) {
      setIsLoading(true)

      spotifyApi
        .search(query, types)
        .then((data) => setData(data.body))
        .catch((err) => setError(err.message))
        .finally(() => setIsLoading(false))
    }
  }, [spotifyApi, query, types])

  return { data, isLoading, error }
}
