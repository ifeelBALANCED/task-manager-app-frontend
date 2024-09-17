import crypto from 'crypto'
import { faker } from '@faker-js/faker'

export interface RegisterDto {
  nickname: string
  email: string
  password: string
}

export function createRegisterDto(): RegisterDto {
  const timestamp = Date.now().toString(36)
  const randomStr = crypto.randomBytes(4).toString('hex')

  const nickname = generateNickname(timestamp, randomStr)
  const emailPrefix = crypto.randomBytes(6).toString('hex')
  const email = `${emailPrefix}@test-${timestamp}.com`

  const password = generateStrongPassword()

  return {
    nickname,
    email,
    password,
  }
}

function generateNickname(timestamp: string, randomStr: string): string {
  const baseNickname = faker.internet.userName()
  const suffix = `_${timestamp.slice(-4)}_${randomStr.slice(0, 4)}`
  const maxBaseLength = 30 - suffix.length

  return (baseNickname.slice(0, maxBaseLength) + suffix).slice(0, 30)
}

function generateStrongPassword(): string {
  const specialChars = '!@#$%^&*()_+{}[]|:;<>,.?~'
  const randomSpecialChar = specialChars[Math.floor(Math.random() * specialChars.length)]

  return (
    faker.internet.password({ length: 12, memorable: true }) +
    faker.number.int({ min: 100, max: 999 }) +
    faker.string.alpha({ length: 2, casing: 'upper' }) +
    randomSpecialChar
  )
}
