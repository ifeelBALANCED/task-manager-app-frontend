import { allSettled, fork } from 'effector'
import { describe, expect, it } from 'vitest'
import { loginQuery } from './login'

describe('loginQuery', () => {
  it('should successfully login with correct credentials', async () => {
    const scope = fork({
      handlers: [
        [
          loginQuery.__.executeFx,
          () => ({
            access: 'mockAccessToken',
            refresh: 'mockRefreshToken',
          }),
        ],
      ],
    })

    await allSettled(loginQuery.start, {
      scope,
      params: {
        email: 'mock@example.com',
        password: 'mockPassword',
      },
    })

    expect(scope.getState(loginQuery.$data)).toMatchObject({
      access: 'mockAccessToken',
      refresh: 'mockRefreshToken',
    })
  })

  it('should fail to login with incorrect credentials', async () => {
    const errorResponse = {
      email: 'No active account found with the given credentials.',
    }

    const scope = fork({
      handlers: [
        [
          loginQuery.__.executeFx,
          () => {
            throw errorResponse
          },
        ],
      ],
    })

    await allSettled(loginQuery.start, {
      scope,
      params: {
        email: 'wrong@example.com',
        password: 'wrongPassword',
      },
    })

    expect(scope.getState(loginQuery.$error)).toMatchObject(errorResponse)
  })
})
