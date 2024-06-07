import Auth from "./pages/Auth"
import Home from "./pages/Home"
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <Home /> */}
      <Auth />
    </QueryClientProvider>
  )
}

export default App
