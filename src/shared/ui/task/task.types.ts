export const enum Type {
  InProgress = 'inProgress',
  ToDo = 'toDo',
  Completed = 'completed',
  WontDo = 'wontDo',
}

interface taskDetails {
  name: string
  description?: string
  type: Type
  icon: string // Allow any string for icon
}

export interface taskProps {
  details: taskDetails
}
