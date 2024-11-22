import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './components/HomePage'
import EditPage from './components/EditPage'
import RenderPage from './components/RenderPage'
import { getPages, getPageById } from '../api'
const router = createBrowserRouter([
  {
    path : '/',
    element : <HomePage />,
    loader: async () => {
      const pages = await getPages();
      return {pages}
    },
    // errorElement: <div>Oops! Something went wrong.</div>
  }, 

  {
    path : '/edit/:id',
    element : <EditPage />,
    loader: async ({params}) => {
      if(params.id === "new") return {page : null}
      const page = await getPageById(params.id);
      return {page}
    }
  },

  {
    path : '/view/:id',
    element : <RenderPage />,
    loader: async ({params}) => {
      const page = await getPageById(params.id);
      return {page}
    }
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
