import { useUnit } from 'effector-react/effector-react.mjs'
import { useLayoutEffect, useState } from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import { NotFoundPage } from '@/pages/404'
import { BoardDetailsPage } from '@/pages/board-details'
import { DashboardPage } from '@/pages/dashboard'
import { LoginPage } from '@/pages/login'
import { MyBoardsPage } from '@/pages/my-boards'
import { RegisterPage } from '@/pages/register'
import { browserHistory, updateHistory } from '@/shared/lib/router'
import { Layout } from '../layout'

const routers = (
  <Routes>
    <Route path="/" element={<Layout variant="minimal" />}>
      <Route path="/" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route element={<Layout />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="my-boards" element={<MyBoardsPage />} />
        <Route path="my-boards/:boardId" element={<BoardDetailsPage />} />
      </Route>
    </Route>
  </Routes>
)

export const AppRouter = () => {
  const { update } = useUnit({ update: updateHistory })
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
      {routers}
    </Router>
  )
}
