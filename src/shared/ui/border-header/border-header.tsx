import { Title, Text, Flex, Box, Button } from '@mantine/core'
import { Icon } from '../icon'

interface boardInfoProps {
  name: string
  description?: string
}

interface boardHeaderProps {
  boardInfo: boardInfoProps
  onEdit: () => void
}

export const BoardHeader = ({ boardInfo, onEdit }: boardHeaderProps) => {
  return (
    <Flex gap={12} mb={40}>
      <Icon className="text-[2.5em] text-yellow-400" name="sprite/logo" aria-label="Logo" />
      <Box>
        <Flex gap={10} align="center">
          <Title className="text-5xl font-normal">{boardInfo.name}</Title>
          <Button className="bg-transparent w-auto p-0 hover:bg-transparent" onClick={onEdit}>
            <Icon
              className="text-[1.75em] text-black"
              name="sprite/edit-duotone"
              aria-label="Logo"
            />
          </Button>
        </Flex>
        {boardInfo.description && <Text className="mt-3">{boardInfo.description}</Text>}
      </Box>
    </Flex>
  )
}
