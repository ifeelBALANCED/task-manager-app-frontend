import { createEvent, createStore, sample } from 'effector'
import { persist } from 'effector-storage/local'
import { getLocalAccessToken, getLocalRefreshToken } from '@/shared/api'
import { redirectFx } from '@/shared/lib/router'
import { clearCredentialsFx, getMeQuery, logoutQuery } from '../api'
import type { User } from '../types'

export const logoutClicked = createEvent()

export const $user = createStore<User | null>(null)
export const $access = createStore<string>(getLocalAccessToken() ?? '')
export const $refresh = createStore<string>(getLocalRefreshToken() ?? '')
export const $isAuthorized = createStore(false)

sample({
  source: [$refresh, $access] as const,
  fn: ([refresh, token]) => !!refresh && !!token,
  target: $isAuthorized,
})

sample({
  clock: getMeQuery.$data,
  filter: (user): user is User => user !== null,
  target: $user,
})

sample({
  clock: logoutClicked,
  target: logoutQuery.start,
})

sample({
  clock: [logoutQuery.finished.success, logoutQuery.finished.failure],
  target: [$isAuthorized.reinit, clearCredentialsFx, redirectFx.prepend(() => '/')],
})

persist({
  store: $user,
  key: 'user',
})

persist({
  store: $isAuthorized,
  key: 'isAuthorized',
})
