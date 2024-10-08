import cn from 'classnames'
import { ReactNode } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'

type NavLinkProps = {
  to: string
  icon: ReactNode
  children: ReactNode
  'aria-label': string
  end?: boolean
  className?: string
}

export const NavLink = ({
  to,
  icon,
  children,
  'aria-label': ariaLabel,
  end = false,
  className = '',
}: NavLinkProps) => {
  const location = useLocation()

  const isActive = end
    ? location.pathname === to
    : matchPath({ path: to, end: false }, location.pathname) !== null

  return (
    <Link
      to={to}
      className={cn(
        'flex items-center gap-3 p-3 rounded-md transition-colors duration-300 no-underline',
        {
          'bg-sapphire text-white': isActive,
          'text-[#C9C9C9] hover:bg-sapphire hover:text-white': !isActive,
        },
        className,
      )}
      aria-label={ariaLabel}
    >
      <span className="w-5 h-5">{icon}</span>
      <span className="font-medium">{children}</span>
    </Link>
  )
}
