import { Card, Flex, Text, Image } from '@mantine/core'
import { clsx } from 'clsx'
import { Icon } from '../icon'
import { taskProps, Type } from './task.types'

export const Task = ({ details }: taskProps) => (
  <Card
    style={{
      width: '100%',
      maxWidth: '552px', // Optional max width
    }}
    className={clsx(
      `rounded-xl`,
      details.type === Type.Completed && 'bg-green-300',
      details.type === Type.WontDo && 'bg-red-200',
      details.type === Type.InProgress && 'bg-yellow-300',
      details.type === Type.ToDo && 'bg-gray-200',
    )}
  >
    <Flex align="center" justify="space-between" gap="lg">
      <Flex align="start" gap="md">
        <Flex className={clsx('w-12 h-12 rounded-xl bg-white')} align="center" justify="center">
          <Image
            src={`/img/${details.icon}.png`}
            alt={`${details.icon} icon`}
            width={20}
            height={20}
          />
        </Flex>
        <Flex direction="column" gap="xs" className="pt-2">
          <Text className="text-xl font-semibold text-zinc-950">{details.name}</Text>
          {details.description && (
            <Text className="text-md text-zinc-700">{details.description}</Text>
          )}
        </Flex>
      </Flex>
      {details.type !== Type.ToDo && (
        <Flex
          align="center"
          justify="center"
          className={clsx(
            details.type === Type.Completed && 'bg-green-500',
            details.type === Type.WontDo && 'bg-red-500',
            details.type === Type.InProgress && 'bg-yellow-500',
            'w-12 h-12 rounded-xl',
          )}
        >
          {details.type === Type.Completed && (
            <Icon
              className="text-[1.5em] text-white"
              name="sprite/done-round-duotone"
              aria-label="Logo"
            />
          )}
          {details.type === Type.WontDo && (
            <Icon
              className="text-[1.5em] text-white"
              name="sprite/close-ring-duotone"
              aria-label="Logo"
            />
          )}
          {details.type === Type.InProgress && (
            <Icon
              className="text-[1.5em] text-white"
              name="sprite/time-atack-duotone"
              aria-label="Logo"
            />
          )}
        </Flex>
      )}
    </Flex>
  </Card>
)
