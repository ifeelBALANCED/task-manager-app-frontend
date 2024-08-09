import cn from 'classnames'
import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

type NavLinkProps = {
  to: string
  icon: ReactNode
  children: ReactNode
  'aria-label': string
}

export const NavLink = ({ to, icon, children, 'aria-label': ariaLabel }: NavLinkProps) => {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link
      to={to}
      className={cn(
        'flex items-center gap-3 p-3 rounded-md transition-colors duration-300 no-underline',
        {
          'bg-sapphire text-white': isActive,
          'text-black hover:bg-sapphire hover:text-white': !isActive,
        },
      )}
      aria-label={ariaLabel}
    >
      <span className="w-5 h-5">{icon}</span>
      <span className="font-medium">{children}</span>
    </Link>
  )
}
