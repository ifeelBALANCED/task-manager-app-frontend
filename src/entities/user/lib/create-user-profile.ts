import { TokenPair, User } from '../types'

export function createUserProfile(user: User, tokens: TokenPair) {
  return {
    token: tokens.access,
    profile: {
      user,
      access: tokens.access,
      refresh: tokens.refresh,
    },
  }
}
