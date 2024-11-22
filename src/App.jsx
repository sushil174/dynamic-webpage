import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './components/HomePage'
import EditPage from './components/EditPage'
import RenderPage from './components/RenderPage'

const router = createBrowserRouter([
  {
    path : '/',
    element : <HomePage />
  }, 

  {
    path : '/edit/:id',
    element : <EditPage />,
  },

  {
    path : '/view/:id',
    element : <RenderPage />
  }
])
function App() {
  return <RouterProvider router={router} />
}

export default App
