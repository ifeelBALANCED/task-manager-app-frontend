import { allSettled, fork } from 'effector'
import { describe, expect, it, vi } from 'vitest'
import { resetPasswordQuery } from './reset'

describe('resetPasswordQuery', () => {
  it('should successfully reset the password', async () => {
    const mockExecuteFx = vi.fn().mockReturnValue({
      detail: 'Password has been reset successfully.',
    })

    const scope = fork({
      handlers: [[resetPasswordQuery.__.executeFx, mockExecuteFx]],
    })

    await allSettled(resetPasswordQuery.start, {
      scope,
      params: {
        uid: 'mockUid',
        token: 'mockToken',
        new_password: 'mockNewPassword',
      },
    })

    expect(scope.getState(resetPasswordQuery.$data)).toMatchObject({
      detail: 'Password has been reset successfully.',
    })
  })

  it('should fail to reset the password with expired link', async () => {
    const errorResponse = {
      detail: 'Reset password link is expired!',
    }

    const mockExecuteFx = vi.fn().mockImplementation(() => {
      throw errorResponse
    })

    const scope = fork({
      handlers: [[resetPasswordQuery.__.executeFx, mockExecuteFx]],
    })

    await allSettled(resetPasswordQuery.start, {
      scope,
      params: {
        uid: 'mockUid',
        token: 'mockToken',
        new_password: 'mockNewPassword',
      },
    })

    expect(scope.getState(resetPasswordQuery.$error)).toMatchObject(errorResponse)
  })
})
