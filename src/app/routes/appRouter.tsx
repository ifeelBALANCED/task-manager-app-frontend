import { useUnit } from 'effector-react/effector-react.mjs'
import { useLayoutEffect, useState } from 'react'
import { Navigate, Route, Router, Routes } from 'react-router-dom'
import { BoardDetailsPage } from '@/pages/board-details'
import { DashboardPage } from '@/pages/dashboard'
import { LoginPage } from '@/pages/login'
import { MyBoardsPage } from '@/pages/my-boards'
import { RegisterPage } from '@/pages/register'
import { userModel } from '@/entities/user'
import { browserHistory, updateHistory } from '@/shared/lib/router'
import { Layout } from '../layout'

export const LoggedOutRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout variant="minimal" />}>
      <Route index element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="*" element={<Navigate to={'/'} />} />
    </Route>
  </Routes>
)

export const LoggedInRoutes = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="my-boards" element={<MyBoardsPage />} />
      <Route path="my-boards/:boardId" element={<BoardDetailsPage />} />
      <Route path="*" element={<Navigate to={'/dashboard'} />} />
    </Route>
  </Routes>
)

export const AppRouter = () => {
  const { update, isAuthorized } = useUnit({
    update: updateHistory,
    isAuthorized: userModel.$isAuthorized,
  })

  const [state, setState] = useState({
    action: browserHistory.action,
    location: browserHistory.location,
  })

  useLayoutEffect(() => {
    browserHistory.listen((hist) => {
      setState(hist)
      update(hist)
    })
  }, [update])

  return (
    <Router location={state.location} navigationType={state.action} navigator={browserHistory}>
      {isAuthorized ? <LoggedInRoutes /> : <LoggedOutRoutes />}
    </Router>
  )
}
