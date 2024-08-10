import { Rule } from 'effector-forms/dist-types'
import { Schema, ValidationError } from 'yup'

export function createRule<V, T = unknown>({
  schema,
  name,
}: {
  schema: Schema<T>
  name: string
}): Rule<V> {
  return {
    name,
    validator: (v: V) => {
      try {
        schema.validateSync(v)
        return {
          isValid: true,
          value: v,
        }
      } catch (err) {
        if (err instanceof ValidationError) {
          return {
            isValid: false,
            value: v,
            errorText: err.message,
          }
        }
        throw err
      }
    },
  }
}
