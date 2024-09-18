export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE' | 'POSTPONED'

export interface Dashboard {
  [date: string]: {
    [status in TaskStatus]: number
  }
}
