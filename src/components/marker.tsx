import * as React from 'react'
import ProjectedLayer, { IProjectedLayerProps } from './projected-layer'
import { withMap } from './context'

export type IMarkerProps = Omit<
  IProjectedLayerProps,
  'type' | 'onWheel' | 'onScroll' | 'onDoubleClick'
>

const defaultClassName = 'mapboxgl-marker'

export const Marker = (props: IMarkerProps) => {
  const { anchor = 'center', className, ...rest } = props
  const _className = className
    ? `${defaultClassName} ${className}`
    : defaultClassName

  return (
    <ProjectedLayer
      {...rest}
      anchor={anchor}
      type="marker"
      className={_className}
    />
  )
}

export default withMap(Marker)
