import { allSettled, fork } from 'effector'
import { describe, expect, it, vi } from 'vitest'
import { forgotPasswordQuery } from './forgot'

describe('forgotPasswordQuery', () => {
  it('should successfully send a password reset link', async () => {
    const mockExecuteFx = vi.fn().mockReturnValue({
      detail: 'Password reset link has been sent to your email. Please, check your spam folder.',
    })

    const scope = fork({
      handlers: [[forgotPasswordQuery.__.executeFx, mockExecuteFx]],
    })

    await allSettled(forgotPasswordQuery.start, {
      scope,
      params: {
        email: 'user@example.com',
      },
    })

    expect(scope.getState(forgotPasswordQuery.$data)).toMatchObject({
      detail: 'Password reset link has been sent to your email. Please, check your spam folder.',
    })
  })

  it('should fail to send a password reset link for non-existent email', async () => {
    const errorResponse = {
      email: 'User with this email does not exist.',
    }

    const mockExecuteFx = vi.fn().mockImplementation(() => {
      throw errorResponse
    })

    const scope = fork({
      handlers: [[forgotPasswordQuery.__.executeFx, mockExecuteFx]],
    })

    await allSettled(forgotPasswordQuery.start, {
      scope,
      params: {
        email: 'nonexistent@example.com',
      },
    })

    expect(scope.getState(forgotPasswordQuery.$error)).toMatchObject(errorResponse)
  })
})
