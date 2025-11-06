import HomePage from './pages/HomePage'

interface User {
  id: string
  nome: string
  email: string
  avatar: string
  cargo: string
  departamento: string
}

interface AppProps {
  authToken?: string | null
  authUser?: User | null
}

const App = ({ authToken, authUser }: AppProps) => {
  return <HomePage authToken={authToken} authUser={authUser} />
}

export default App