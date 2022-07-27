import React, { useCallback, useEffect, useState, useRef, memo } from 'react'

import mapboxgl from 'mapbox-gl'
import { MapContext } from './context'

// utils
import deepEqual from 'deep-equal'
import { assign } from '../utils/util'

// css
import 'mapbox-gl/dist/mapbox-gl.css'
import '../style/index.css'

type MapboxOptions = Omit<mapboxgl.MapboxOptions, 'container'>

interface IMapServiceProps extends React.ComponentProps<any> {
  mapboxOptions: MapboxOptions
  onLoad?: (
    map: mapboxgl.Map,
    ev: mapboxgl.MapboxEvent<undefined> & mapboxgl.EventData
  ) => void
  onError?: (e: any) => void
}

const options = [
  'center',
  'zoom',
  'bearing',
  'pitch',
  'maxPitch',
  'minPitch',
  'minZoom',
  'maxZoom',
  'maxBounds',
]

const ignoreOptions = ['accessToken', 'style']

export default memo(function MapService(props: IMapServiceProps) {
  const {
    children,
    onLoad: _onLoad,
    mapboxOptions,
    style,
    className = '',
    onError: _onError,
  } = props
  const { accessToken, ...rest } = mapboxOptions
  const [mapLoad, setMapLoad] = useState(false)
  const map = useRef<mapboxgl.Map>()
  const container = useRef<any>()
  const instance = useRef(false)
  const mapboxOptionsRef = useRef<any>()

  const onLoad = useCallback(
    ev => {
      _onLoad && _onLoad(map.current!, ev)
      setMapLoad(true)
    },
    [_onLoad]
  )

  const onError = useCallback(
    (e: any) => {
      console.log('mapbox地图加载失败')
      setMapLoad(false)
      _onError && _onError(e)
      // throw new Error('mapbox地图加载失败')
    },
    [_onError]
  )

  const dispose = useCallback(() => {
    if (!map.current) {
      return
    }
    setMapLoad(false)
    map.current.off('load', onLoad)
    map.current.off('error', onError)
    map.current.remove()
    map.current = undefined
    instance.current = false
  }, [onLoad, onError])

  const init = useCallback(() => {
    map.current = new mapboxgl.Map({
      ...rest,
      container: container.current,
    })
    map.current.on('load', onLoad)
    map.current.on('error', onError)
    mapboxOptionsRef.current = rest
  }, [onLoad, onError, rest])

  const update = useCallback(() => {
    if (!container.current) {
      return
    }
    if (!instance.current) {
      console.log('map 初始化')
      init()
      instance.current = true
    } else {
      console.log('更新======》')
      Object.keys(rest).some((key: string) => {
        // 忽略选项
        if (ignoreOptions.includes(key)) {
          return false
        }
        if (!options.includes(key)) {
          if (!deepEqual(rest[key], mapboxOptionsRef.current[key])) {
            console.log('重新注销更新------》', key)
            dispose()
            init()
            return true
          } else {
            return false
          }
        } else {
          if (!deepEqual(rest[key], mapboxOptionsRef.current[key])) {
            const _key = 'set' + key.replace(/^\S/, s => s.toUpperCase())
            console.log('属性更新------》', key, _key, mapboxOptions[key])
            map.current![_key] && map.current![_key](mapboxOptions[key])
          }
          return false
        }
      })
      mapboxOptionsRef.current = rest
    }
  }, [rest, init])

  useEffect(() => {
    assign(mapboxgl, 'accessToken', accessToken)
  }, [accessToken])

  useEffect(() => {
    update()
  }, [update])

  useEffect(() => {
    return () => {
      dispose()
    }
  }, [])

  return (
    <MapContext.Provider value={map.current}>
      <div ref={container} style={style} className={className}>
        {mapLoad && children}
      </div>
    </MapContext.Provider>
  )
})
