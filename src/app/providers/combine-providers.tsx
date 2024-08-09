import { FC, PropsWithChildren } from 'react'

export const combineProviders = <P extends Record<string, unknown>>(
  ...components: FC<PropsWithChildren<P>>[]
): FC<PropsWithChildren<P>> => {
  return components.reduce<FC<PropsWithChildren<P>>>(
    (AccumulatedComponents, CurrentComponent) => {
      const CombinedComponent: FC<PropsWithChildren<P>> = ({ children, ...props }) => (
        <AccumulatedComponents {...(props as P)}>
          <CurrentComponent {...(props as P)}>{children}</CurrentComponent>
        </AccumulatedComponents>
      )
      CombinedComponent.displayName = `Combined(${
        AccumulatedComponents.displayName || AccumulatedComponents.name
      }, ${CurrentComponent.displayName || CurrentComponent.name})`
      return CombinedComponent
    },
    ({ children }) => <>{children}</>,
  )
}
