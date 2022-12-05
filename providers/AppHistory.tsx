import { useRouter } from 'next/router'
import React, { useContext, createContext, useEffect, useState, PropsWithChildren, FC } from 'react'

interface ProviderValue {
  history: string[]
  canGoBack: () => boolean
}

const defaultState: ProviderValue = {
  history: [],
  canGoBack: () => false,
}

const AppHistoryContext = createContext<ProviderValue>(defaultState)

export const AppHistoryProvider: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const [history, setHistory] = useState<string[]>([router.asPath])

  useEffect(() => {
    const handleRouteChange = (url: string, { shallow }: { shallow: boolean }) => {
      if (!shallow) {
        setHistory((prevState) => [...prevState, url])
      }
    }

    router.beforePopState(() => {
      setHistory((prevState) => prevState.slice(0, -2))
      return true
    })

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  return (
    <AppHistoryContext.Provider value={{ history, canGoBack: () => history.length > 1 }}>
      {children}
    </AppHistoryContext.Provider>
  )
}

export const useHistory = () => useContext(AppHistoryContext)
