import { AuthProvider, useAuth } from "./contexts/AuthContext"
import Auth from "./pages/Auth"
import Home from "./pages/Home"
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <AuthCheck />
      </QueryClientProvider>
    </AuthProvider>
  )
}

function AuthCheck() {
  const { user } = useAuth()

  if (!user) {
    return <Auth />
  }

  return <Home />
}

export default App
