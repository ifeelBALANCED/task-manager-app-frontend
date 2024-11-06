export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE'

export interface Dashboard {
  [date: string]: {
    [status in TaskStatus]: number
  }
}
