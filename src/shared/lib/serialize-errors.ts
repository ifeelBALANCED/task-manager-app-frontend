type SerializedError = {
  field: string
  rule: 'backend'
  errorText: string
}

export const serializeErrors = (errors: unknown): SerializedError[] => {
  if (typeof errors !== 'object' || errors === null) {
    return []
  }

  return Object.entries(errors).map(([field, messages]) => ({
    field,
    rule: 'backend',
    errorText: Array.isArray(messages) ? messages[0] : messages,
  }))
}
