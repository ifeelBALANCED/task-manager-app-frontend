import { allSettled, fork } from 'effector'
import { describe, expect, it } from 'vitest'
import { registerQuery } from './register'

describe('registerQuery', () => {
  it('register success', async () => {
    const scope = fork({
      handlers: [
        [
          registerQuery.__.executeFx,
          () => ({
            email: 'test@email.com',
            nickname: 'test_nickname',
          }),
        ],
      ],
    })

    await allSettled(registerQuery.start, {
      scope,
      params: {
        email: 'mock@example.com',
        nickname: 'mockNickname',
        password: 'mockPassword',
      },
    })

    expect(scope.getState(registerQuery.$data)).toMatchObject({
      email: 'test@email.com',
      nickname: 'test_nickname',
    })
  })

  it('register fail', async () => {
    const errorResponse = {
      detail: 'Enter a valid email address.',
    }

    const scope = fork({
      handlers: [
        [
          registerQuery.__.executeFx,
          () => {
            throw errorResponse
          },
        ],
      ],
    })

    await allSettled(registerQuery.start, {
      scope,
      params: {
        email: 'test@email.com',
        nickname: 'test_nickname',
        password: 'mockPassword',
      },
    })

    expect(scope.getState(registerQuery.$error)).toMatchObject(errorResponse)
  })
})
