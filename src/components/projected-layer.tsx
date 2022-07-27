import React from 'react'
import Mapboxgl from 'mapbox-gl'
import {
  OverlayParams,
  overlayState,
  overlayTransform,
} from '../utils/overlays'
import { Anchor } from '../types'

export interface IProjectedLayerProps {
  type: 'marker' | 'popup'
  lngLat: [number, number]
  anchor?: Anchor
  offset?: number | [number, number] | Mapboxgl.Point
  children?: JSX.Element | JSX.Element[]
  onClick?: React.MouseEventHandler<HTMLDivElement>
  onDoubleClick?: React.MouseEventHandler<HTMLDivElement>
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>
  onScroll?: React.UIEventHandler<HTMLDivElement>
  onWheel?: React.MouseEventHandler<HTMLDivElement>
  style?: React.CSSProperties
  className?: string
  tabIndex?: number
  map?: Mapboxgl.Map
  getMap?: (map: mapboxgl.Map) => void
}

export class ProjectedLayer extends React.Component<
  IProjectedLayerProps,
  OverlayParams
> {
  private container: HTMLElement | undefined = undefined
  private prevent: boolean = false

  public static defaultProps = {
    offset: 0,
    onClick: (...args: any[]) => args,
  }

  public state: OverlayParams = {}

  private setContainer = (el: HTMLElement | null) => {
    if (el) {
      this.container = el
    }
  }

  private handleMapMove = () => {
    const { map } = this.props
    if (!map || !map.getStyle()) {
      return
    }
    if (!this.prevent) {
      this.setState(overlayState(this.props, map, this.container!))
    }
  }

  public componentDidMount() {
    const { map, getMap } = this.props
    if (!map || !map.getStyle()) {
      return
    }
    map.on('move', this.handleMapMove)
    // Now this.container is rendered and the size of container is known.
    // Recalculate the anchor/position
    this.handleMapMove()
    getMap && getMap(map)
  }

  private havePropsChanged(
    props: IProjectedLayerProps,
    prevProps: IProjectedLayerProps
  ) {
    return (
      props.lngLat[0] !== prevProps.lngLat[0] ||
      props.lngLat[1] !== prevProps.lngLat[1] ||
      props.offset !== prevProps.offset ||
      props.anchor !== prevProps.anchor
    )
  }

  public componentDidUpdate(prevProps: IProjectedLayerProps) {
    const { map } = this.props
    if (!map || !map.getStyle()) {
      return
    }
    if (this.havePropsChanged(this.props, prevProps)) {
      this.setState(overlayState(this.props, map, this.container!))
    }
  }

  public componentWillUnmount() {
    const { map } = this.props
    if (!map || !map.getStyle()) {
      return
    }

    this.prevent = true

    map.off('move', this.handleMapMove)
  }

  public render() {
    const {
      style,
      children,
      className = '',
      onClick,
      onDoubleClick,
      onMouseEnter,
      onMouseLeave,
      onScroll,
      onWheel,
      type,
      tabIndex,
    } = this.props
    const { anchor } = this.state
    const finalStyle = {
      ...style,
      transform: overlayTransform(this.state).join(' '),
    }
    const _className =
      anchor && type === 'popup'
        ? `${className} mapboxgl-popup-anchor-${anchor}`
        : className
    return (
      <div
        className={_className}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onScroll={onScroll}
        onWheel={onWheel}
        style={finalStyle}
        ref={this.setContainer}
        tabIndex={tabIndex}
      >
        {children}
      </div>
    )
  }
}

export default ProjectedLayer
