import { ActionIcon, Tooltip, useComputedColorScheme, useMantineColorScheme } from '@mantine/core'
import { IconMoon, IconSun } from '@tabler/icons-react'
import cn from 'classnames'

export const ThemeToggleControl = () => {
  const { setColorScheme } = useMantineColorScheme()
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true })

  return (
    <Tooltip
      label={`Switch to ${computedColorScheme === 'light' ? 'dark' : 'light'} mode`}
      withArrow
    >
      <ActionIcon
        disabled
        onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
        variant="default"
        size="lg"
        radius="xl"
        aria-label="Toggle color scheme"
        className="transition-colors duration-300"
      >
        <IconSun
          className={cn('w- h-5', { hidden: computedColorScheme === 'dark' })}
          stroke={1.5}
        />
        <IconMoon
          className={cn('w-5 h-5', { hidden: computedColorScheme === 'light' })}
          stroke={1.5}
        />
      </ActionIcon>
    </Tooltip>
  )
}
