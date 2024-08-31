export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE' | 'POSTPONED'

export interface Dashboard {
  [date: string]: {
    [status in TaskStatus]: number
  }
}

export type StatusCounts = {
  TODO: number
  IN_PROGRESS: number
  DONE: number
  POSTPONED: number
}
