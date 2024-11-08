export type User = {
  email: string
  nickname: string
  profile_picture: string
  date_joined: string
}

export type UserProfile = Pick<User, 'nickname'> & {
  password: string
  confirm_password: string
}

export type TokenPair = {
  access: string
  refresh: string
}
