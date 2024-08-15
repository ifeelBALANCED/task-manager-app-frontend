import { CreateTaskFormValues } from './create'

export type UpdateTaskFormValues = CreateTaskFormValues & { status: string }
