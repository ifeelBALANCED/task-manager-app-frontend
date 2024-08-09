import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { NotFoundPage } from '@/pages/404'
import { BoardDetailsPage } from '@/pages/board-details'
import { DashboardPage } from '@/pages/dashboard'
import { LoginPage } from '@/pages/login'
import { MyBoardsPage } from '@/pages/my-boards'
import { RegisterPage } from '@/pages/register'
import { Layout } from '../layout'

const routers = createRoutesFromElements(
  <Route path="/" element={<Layout variant="minimal" />}>
    <Route path="/" element={<LoginPage />} />
    <Route path="register" element={<RegisterPage />} />
    <Route path="*" element={<NotFoundPage />} />
    <Route element={<Layout />}>
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="my-boards" element={<MyBoardsPage />} />
      <Route path="my-boards/:boardId" element={<BoardDetailsPage />} />
    </Route>
  </Route>,
)

export const AppRouter = () => {
  const router = createBrowserRouter(routers)

  return <RouterProvider router={router} />
}
