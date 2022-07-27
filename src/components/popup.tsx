import React, { useCallback, useState, useEffect } from 'react'
import ProjectedLayer, { IProjectedLayerProps } from './projected-layer'
import { withMap } from './context'

type IOwnPopupProps = Omit<IProjectedLayerProps, 'type'>

export interface IPopupProps extends IOwnPopupProps {
  maxWidth?: string
  closeButton?: boolean
  closeOnClick?: boolean
  onClose?: () => void
}

export const defaultClassName = 'mapboxgl-popup'

export const Popup = (props: IPopupProps) => {
  const {
    children,
    className,
    maxWidth = '240px',
    map,
    closeButton,
    closeOnClick,
    style,
    onClose,
    ...rest
  } = props
  const [isShow, setIsShow] = useState(true)
  const _className = className
    ? `${defaultClassName} ${className}`
    : defaultClassName
  const _style = { maxWidth, ...style }

  const onCloseButton = useCallback(() => {
    setIsShow(false)
    onClose && onClose()
  }, [])

  useEffect(() => {
    closeOnClick === true &&
      map &&
      map.getStyle() &&
      map.on('click', onCloseButton)
    return () => {
      closeOnClick === true &&
        map &&
        map.getStyle() &&
        map.off('click', onCloseButton)
    }
  }, [map, closeOnClick])

  return (
    <>
      {isShow && (
        <ProjectedLayer
          {...rest}
          type="popup"
          map={map}
          style={_style}
          className={_className}
        >
          <div className="mapboxgl-popup-tip" />
          <div className="mapboxgl-popup-content">
            {closeButton && (
              <button
                className="mapboxgl-popup-close-button"
                type="button"
                aria-label="Close popup"
                onClick={onCloseButton}
              >
                ×
              </button>
            )}
            {children}
          </div>
        </ProjectedLayer>
      )}
    </>
  )
}

export default withMap(Popup)
