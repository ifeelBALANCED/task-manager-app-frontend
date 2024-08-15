import { createApi, createStore } from 'effector'

export const createBooleanStore = (defaultState: boolean = false) => {
  const $value = createStore<boolean>(defaultState)

  return {
    $value,
    ...createApi($value, {
      toggle: (open) => !open,
      enable: () => true,
      disable: () => false,
    }),
  }
}

export function createModalApi() {
  const {
    $value: $modal,
    enable: modalOpened,
    disable: modalClosed,
    toggle: modalToggle,
  } = createBooleanStore()

  return { $modal, modalOpened, modalClosed, modalToggle }
}
