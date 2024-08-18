export interface ResetPasswordFormValues {
  new_password: string
  confirm_new_password: string
}

export type ResetPasswordQueryValues = Omit<ResetPasswordFormValues, 'confirm_new_password'> & {
  token: string
  uid: string
}
