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
}

const App = ({ authToken, authUser }: AppProps) => {
  return <HomePage authToken={authToken} authUser={authUser} />
}

export default App