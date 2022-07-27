import * as React from 'react'
import { Map } from 'mapbox-gl'

export const MapContext = React.createContext<Map | undefined>(undefined)

export const withMap = <T extends object>(
  Component: React.ComponentType<T>
) => {
  return (props: T) => (
    <MapContext.Consumer>
      {map => {
        // 优先使用props传入的map
        return <Component {...props} map={props['map'] || map} />
      }}
    </MapContext.Consumer>
  )
}
