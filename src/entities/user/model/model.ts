import { InvalidDataError } from '@farfetched/core'
import { createEvent, createStore, sample } from 'effector'
import { createGate } from 'effector-react'
import { persist } from 'effector-storage/local'
import identity from 'lodash/identity'
import pickBy from 'lodash/pickBy'
import { getLocalAccessToken, getLocalRefreshToken } from '@/shared/api'
import { redirectFx } from '@/shared/lib/router'
import { serializeErrors } from '@/shared/lib/serialize-errors'
import { clearCredentialsFx, getMeQuery, logoutQuery, updateUserProfileQuery } from '../api'
import type { User, UserProfile } from '../types'
import { updateUserProfileForm } from './form'

export const UserSettingsGate = createGate()

export const logoutClicked = createEvent()

export const $user = createStore<User | null>(null)
export const $access = createStore<string>(getLocalAccessToken() ?? '')
export const $refresh = createStore<string>(getLocalRefreshToken() ?? '')
export const $isAuthorized = createStore(false)
export const $updateProfilePending = updateUserProfileQuery.$pending

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

sample({
  clock: updateUserProfileForm.submit,
  source: updateUserProfileForm.$values,
  filter: updateUserProfileForm.$isValid,
  fn: (form) =>
    pickBy(
      {
        nickname: form.nickname,
        password: form.password,
      },
      identity,
    ) as UserProfile,
  target: updateUserProfileQuery.start,
})

sample({
  clock: updateUserProfileQuery.finished.success,
  target: [updateUserProfileForm.reset, getMeQuery.start],
})

sample({
  clock: updateUserProfileQuery.$error,
  filter: updateUserProfileQuery.$failed,
  fn: (error) => {
    return serializeErrors((error as InvalidDataError)?.response)
  },
  target: updateUserProfileForm.addErrors,
})

sample({
  clock: updateUserProfileForm.$values.updates,
  filter: updateUserProfileForm.$values.map(
    ({ password, confirm_password }) =>
      Boolean(password) && Boolean(confirm_password) && password !== confirm_password,
  ),
  fn: () => ({
    rule: 'confirm_password',
    errorText: 'Passwords do not match',
  }),
  target: updateUserProfileForm.fields.confirm_password.addError,
})

sample({
  clock: UserSettingsGate.open,
  source: $user,
  filter: Boolean,
  fn: (user) => ({
    nickname: user.nickname,
    profile_picture: user.profile_picture,
  }),
  target: [getMeQuery.start, updateUserProfileForm.setInitialForm],
})

persist({
  store: $user,
  key: 'user',
})

persist({
  store: $isAuthorized,
  key: 'isAuthorized',
})
