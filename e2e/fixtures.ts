import { faker } from '@faker-js/faker'

export interface RegisterDto {
  nickname: string
  email: string
  password: string
}

export function createRegisterDto(): RegisterDto {
  const timestamp = Date.now().toString(36)
  const randomStr = Math.random().toString(36).substring(2, 8)

  const nickname = `${faker.internet.userName()}_${timestamp}_${randomStr}`
  const email = `${randomStr}@test-${timestamp}.com`
  const password =
    faker.internet.password({
      length: 12,
      memorable: true,
    }) +
    faker.number.int({ min: 10, max: 99 }) +
    faker.string.alpha({ length: 2, casing: 'upper' })

  return {
    nickname,
    email,
    password,
  }
}
