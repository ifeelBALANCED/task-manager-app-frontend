import { Anchor, Breadcrumbs as MantineBreadcrumbs } from '@mantine/core'
import cn from 'classnames'
import { Link, useLocation } from 'react-router-dom'

type BreadcrumbItem = {
  title: string
  path: string
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const location = useLocation()

  return (
    <MantineBreadcrumbs separator="/" className="mb-6">
      {items.map((item) => {
        const isActive = location.pathname === item.path

        return (
          <Anchor
            component={Link}
            to={item.path}
            key={item.path}
            className={cn('font-medium text-sm transition-colors duration-300', {
              'text-blue-600 font-bold cursor-default': isActive,
              'text-black hover:text-blue-500': !isActive,
            })}
            underline={isActive ? 'always' : 'hover'}
          >
            {item.title}
          </Anchor>
        )
      })}
    </MantineBreadcrumbs>
  )
}
