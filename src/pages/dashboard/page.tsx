import { AreaChart, PieChart } from '@mantine/charts'
import { Badge, Card, Grid, Group, Loader, Select, Text, Title } from '@mantine/core'
import { IconChartLine, IconChartPie } from '@tabler/icons-react'
import { useGate, useUnit } from 'effector-react'
import {
  $areaChartData,
  $dashboardPending,
  $dateOptions,
  $pieChartData,
  $selectedDate,
  DashboardGate,
  setSelectedDate,
} from './model'

export const DashboardPage = () => {
  useGate(DashboardGate)

  const { loading, selectedDate, dateOptions, areaChartData, pieChartData } = useUnit({
    loading: $dashboardPending,
    selectedDate: $selectedDate,
    dateOptions: $dateOptions,
    areaChartData: $areaChartData,
    pieChartData: $pieChartData,
  })

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <Title order={2}>Dashboard</Title>
        <Group>
          <Badge color="blue" variant="light">
            {new Date().toLocaleDateString()}
          </Badge>
          <Select
            placeholder="Select date"
            data={dateOptions}
            value={selectedDate}
            onChange={(date) => {
              if (date !== null) {
                setSelectedDate(date)
              }
            }}
          />
        </Group>
      </div>

      {loading ? (
        <div className="flex justify-center items-center w-full h-full">
          <Loader size={30} />
        </div>
      ) : (
        <Grid gutter="md">
          <Grid.Col span={12}>
            <Card className="p-4 shadow-sm">
              <Title order={4} className="mb-4">
                Task Status Over Time
              </Title>
              {areaChartData.length === 0 ? (
                <div className="flex items-end gap-x-2">
                  <IconChartLine size={30} color="gray" />
                  <Text mt="sm" c="dimmed">
                    No data available for the selected date range.
                  </Text>
                </div>
              ) : (
                <AreaChart
                  h={300}
                  data={areaChartData}
                  dataKey="date"
                  series={[
                    { name: 'TODO', color: 'indigo.6' },
                    { name: 'IN_PROGRESS', color: 'blue.4' },
                    { name: 'DONE', color: 'green.4' },
                  ]}
                  curveType="linear"
                />
              )}
            </Card>
          </Grid.Col>
          <Grid.Col span={12}>
            <Card className="p-4 shadow-sm">
              <Title order={4} className="mb-4">
                Task Status Overview
              </Title>
              {pieChartData.map((pie) => pie.value).every((value) => value === 0) ? (
                <div className="flex items-end gap-x-2">
                  <IconChartPie size={30} color="gray" />
                  <Text mt="sm" c="dimmed">
                    No data available for task status overview.
                  </Text>
                </div>
              ) : (
                <PieChart
                  data={pieChartData}
                  mx="auto"
                  withLabels
                  labelsType="percent"
                  withTooltip
                />
              )}
            </Card>
          </Grid.Col>
        </Grid>
      )}
    </div>
  )
}
