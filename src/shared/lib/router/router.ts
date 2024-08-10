import { createEffect, createEvent, createStore, sample } from 'effector'
import type { Location } from 'history'
import { Action } from 'history'
import { browserHistory } from './history'

export const $history = createStore({
  action: browserHistory.action,
  location: browserHistory.location,
})

export const updateHistory = createEvent<{
  action: Action
  location: Location
}>('update history')

sample({
  clock: updateHistory,
  target: $history,
})

export const $queryParams = createStore(new URLSearchParams(browserHistory.location.search))

sample({
  clock: $history,
  fn: ({ location }) => new URLSearchParams(location.search),
  target: $queryParams,
})

export const redirectFx = createEffect((path: string) => {
  browserHistory.push(path)
})
