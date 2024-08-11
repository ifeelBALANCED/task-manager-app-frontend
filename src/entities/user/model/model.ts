import { createEvent, createStore, sample } from 'effector'
import { persist } from 'effector-storage/local'
import { redirectFx } from '@/shared/lib/router'
import { clearCredentialsFx, getMeQuery, logoutQuery } from '../api'
import type { User } from '../types'

export const logoutClicked = createEvent()

export const $user = createStore<User | null>(null)
export const $token = createStore<string>(window.localStorage.getItem('access') || '')

export const $isAuthorized = createStore(false)

sample({
  source: [$user, $token] as const,
  fn: ([user, token]) => user !== null && !!token,
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
