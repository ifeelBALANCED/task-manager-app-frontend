import { faker } from '@faker-js/faker'

export interface RegisterDto {
  nickname: string
  email: string
  password: string
}

export function createRegisterDto(): RegisterDto {
  const timestamp = Date.now().toString(36)
  const randomStr = Math.random().toString(36).substring(2, 5)

  const nickname = `${faker.internet.userName()}_${timestamp.slice(-4)}${randomStr}`

  const email = faker.internet.email({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    provider: `test-${timestamp}${randomStr}.com`,
  })

  const password =
    faker.internet.password({
      length: 12,
      memorable: true,
    }) +
    faker.number.int({ min: 0, max: 99 }) +
    faker.string.alpha({ length: 1, casing: 'upper' })

  return {
    nickname,
    email,
    password,
  }
}
