import { Center, Container, Loader } from '@mantine/core'
import { useUnit } from 'effector-react'
import { JSX, lazy, Suspense, useLayoutEffect, useState } from 'react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { Navigate, Route, Router, Routes } from 'react-router-dom'
import { userModel } from '@/entities/user'
import { browserHistory, updateHistory } from '@/shared/lib/router'
import { Layout } from '../layout'

export const namedLazy = <T extends Record<string, any>>(loader: () => Promise<T>, name: keyof T) =>
  lazy(async () => {
    const module = await loader()
    return { default: module[name] }
  })

const LoginPage = namedLazy(() => import('@/pages/login'), 'LoginPage')
const ForgotPasswordPage = namedLazy(() => import('@/pages/forgot-password'), 'ForgotPasswordPage')
const ResetPasswordPage = namedLazy(() => import('@/pages/reset-password'), 'ResetPasswordPage')
const RegisterPage = namedLazy(() => import('@/pages/register'), 'RegisterPage')
const DashboardPage = namedLazy(() => import('@/pages/dashboard'), 'DashboardPage')
const TaskBoardsPage = namedLazy(() => import('@/pages/task-boards'), 'TaskBoardsPage')
const TaskBoardDetailsPage = namedLazy(
  () => import('@/pages/task-board-details'),
  'TaskBoardDetailsPage',
)

export const LoggedOutRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout variant="minimal" />}>
      <Route index element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="reset-password" element={<ResetPasswordPage />} />
      <Route path="forgot-password" element={<ForgotPasswordPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  </Routes>
)

export const LoggedInRoutes = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="task-boards" element={<TaskBoardsPage />} />
      <Route path="task-boards/:boardId" element={<TaskBoardDetailsPage />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Route>
  </Routes>
)

export function PageFallback({ error }: FallbackProps): JSX.Element {
  return (
    <Container>
      <p>Something went wrong</p>
      <pre>{error.message}</pre>
    </Container>
  )
}

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
      <ErrorBoundary FallbackComponent={PageFallback} key={state.location.pathname}>
        <Suspense
          fallback={
            <Center style={{ height: '100vh' }}>
              <Loader size="lg" variant="dots" />
            </Center>
          }
        >
          {isAuthorized ? <LoggedInRoutes /> : <LoggedOutRoutes />}
        </Suspense>
      </ErrorBoundary>
    </Router>
  )
}
