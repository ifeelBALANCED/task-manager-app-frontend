import { createEvent, createStore, sample } from 'effector'
import { createGate } from 'effector-react'
import { taskBoardsLib } from '@/entities/task-board'
import { getDashboardQuery, TaskStatus } from '../api'

type StatusCounts = {
  TODO: number
  IN_PROGRESS: number
  DONE: number
  POSTPONED: number
}

type AreaChartData = {
  TODO: number
  IN_PROGRESS: number
  DONE: number
  POSTPONED: number
  date: string
}[]

type PieChartData = {
  name: string
  value: number
  color: 'gray' | 'blue' | 'green' | 'orange' | 'red'
}[]

export const DashboardGate = createGate()

export const $dashboard = getDashboardQuery.$data
export const $dashboardPending = getDashboardQuery.$pending
export const $selectedDate = createStore<string | null>('all')
export const $dateOptions = $dashboard.map((dashboard) => {
  const dates = Object.keys(dashboard || {}).map((date) => ({ value: date, label: date }))
  return [{ value: 'all', label: 'All Periods' }, ...dates]
})
export const $areaChartData = createStore<AreaChartData>([])
export const $pieChartData = createStore<PieChartData>([])

export const setSelectedDate = createEvent<string | null>()

$selectedDate.on(setSelectedDate, (_, date) => date)

sample({
  clock: DashboardGate.open,
  target: getDashboardQuery.start,
})

sample({
  source: { dashboard: $dashboard, selectedDate: $selectedDate },
  fn: ({ dashboard, selectedDate }) => {
    return Object.entries(dashboard || {})
      .filter(([date]) => selectedDate === 'all' || date === selectedDate)
      .flatMap(([date, statuses]) => ({
        date,
        ...statuses,
      }))
  },
  target: $areaChartData,
})

sample({
  source: $dashboard,
  fn: (dashboard) => {
    const combinedStatuses = Object.values(dashboard || {}).reduce(
      (acc: StatusCounts, dateObj) => {
        Object.entries(dateObj).forEach(([status, count]) => {
          acc[status as keyof StatusCounts] = (acc[status as keyof StatusCounts] || 0) + count
        })
        return acc
      },
      { TODO: 0, IN_PROGRESS: 0, DONE: 0, POSTPONED: 0 } as StatusCounts,
    )

    return Object.entries(combinedStatuses).map(([status, count]) => ({
      name: status,
      value: count,
      color: taskBoardsLib.getStatusColor(status as TaskStatus),
    }))
  },
  target: $pieChartData,
})
