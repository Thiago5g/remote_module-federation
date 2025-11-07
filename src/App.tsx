import { useEffect } from 'react'
import './i18n/i18n'
import { useTranslation } from 'react-i18next'
import HomePage from './pages/HomePage'

interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: string
  department: string
}

interface AppProps {
  authToken?: string | null
  authUser?: User | null
  sharedCount?: number
  onIncrement?: () => void
  onDecrement?: () => void
  language?: 'pt' | 'en' | 'es'
}

const App = ({ authToken, authUser, sharedCount, onIncrement, onDecrement, language }: AppProps) => {
  const { i18n } = useTranslation()
  useEffect(() => {
    if (language) {
      const current = (i18n as any).resolvedLanguage || i18n.language
      const canChange = typeof (i18n as any).changeLanguage === 'function'
      if (canChange && current !== language) {
        ;(i18n as any).changeLanguage(language)
      }
    }
  }, [language, i18n])
  return (
    <HomePage 
      authToken={authToken} 
      authUser={authUser} 
      sharedCount={sharedCount}
      onIncrement={onIncrement}
      onDecrement={onDecrement}
    />
  )
}

export default App