import { useRef, useCallback, useEffect, memo } from 'react'
import Mapboxgl from 'mapbox-gl'
import { withMap } from './context'

// type
import {
  defaultGeoJson,
  LayerEventToHandler,
  ILayerEvents,
  LayerEventToHandlersType,
  Paint,
  Layout,
} from '../types'

// type
import { diff } from '../utils/util'
import deepEqual from 'deep-equal'

export interface ILayerProps extends ILayerEvents {
  /**
   * @description 地图实例
   * @default
   */
  map?: Mapboxgl.Map
  /**
   * @description 用来插入新图层的现有图层 ID。 如果该参数（argument）被省略，该图层将会被添加到图层数组的末尾。
   * @default
   */
  beforeId?: string
  /**
   * @description 获取地图实例方法
   * @default
   */
  getMap?: (map: Mapboxgl.Map) => void
  /**
  * @description 图层的最小缩放级别。在缩放级别小于 minzoom 时，图层将被隐藏。
  * @default
  */
  minZoom?: number
  /**
  * @description 图层的最大缩放级别。当缩放级别等于或大于最大缩放时，图层将被隐藏
  * @default
  */
  maxZoom?: number
  /**
  * @description 过滤器 在源特性上指定条件的表达式。只显示与筛选器匹配的特性。筛选器中的缩放表达式仅在整数缩放级别计算。筛选器表达式不支持特征状态表达式。详情查阅mapboxgl官网
  * @default
  */
  filter?: any[]
  /**
  * @description 图层布局属性。
  * @default
  */
  layout?: Layout
  /**
  * @description 这个图层的默认绘制属性。
  * @default
  */
  paint?: Paint
  /**
  * @description 唯一的图层名称。
  * @default
  */
  id: string
  /**
  * @description 
  * @default
  */
  sourceId?: string
  /**
  * @description geoJSON数据源的配置项
  * @default
  */
  geoJSONSourceOptions?: Mapboxgl.GeoJSONSourceOptions
  /**
 * @description 这个层的渲染类型。
 * @default
 */
  type:
  | 'symbol'
  | 'line'
  | 'fill'
  | 'circle'
  | 'raster'
  | 'fill-extrusion'
  | 'background'
  | 'heatmap'
  /**
  * @description  任意属性有用的跟踪层，但不影响渲染。属性应该加前缀以避免冲突，如“映射框:”。
  * @default
  */
  metadata?: any
  /**
  * @description 从矢量平铺源使用的图层。矢量平铺源需要; 禁止所有其他源类型，包括 GeoJSON 源。
  * @default
  */
  sourceLayer?: string
  /**
  * @description 如果为false，则没有鼠标、触摸或键盘侦听器被附加到地图上，因此它将不会响应输入
  * @default
  */
  interactive?: boolean
}

const Layer = memo((props: ILayerProps) => {
  const {
    map,
    beforeId,
    minZoom,
    maxZoom,
    filter,
    layout,
    paint,
    getMap,
    sourceId,
    id,
    type,
    metadata,
    sourceLayer,
    interactive,
    geoJSONSourceOptions,
    ...eventRest
  } = props
  const propsRef = useRef<ILayerProps>(props)
  const eventRestRef = useRef(eventRest)
  const instance = useRef(false)

  const updateEvents = useCallback(
    (eventsMap: ILayerEvents, type: 'on' | 'off') => {
      if (!map || !id) {
        return
      }
      ; (Object.entries(LayerEventToHandler) as [
        keyof LayerEventToHandlersType,
        keyof ILayerEvents
      ][]).forEach(([event, propName]) => {
        const handler: any = eventsMap[propName]
        if (handler) {
          map[type](event, id, handler)
        }
      })
    },
    [id, map]
  )

  const init = useCallback(() => {
    const {
      id,
      type,
      metadata,
      sourceLayer,
      minZoom,
      maxZoom,
      sourceId,
      interactive,
      filter,
      layout,
      paint,
      beforeId,
      geoJSONSourceOptions,
    } = propsRef.current

    let _sourceId = id

    if (!map) {
      return
    }
    if (sourceId && map.getSource(sourceId)) {
      _sourceId = sourceId
    } else {
      const { data, ...rest } = geoJSONSourceOptions || {}
      map.addSource(_sourceId, {
        type: 'geojson',
        data: data || defaultGeoJson,
        ...rest,
      })
    }
    const layer: any = {
      id,
      type,
      metadata,
      source: _sourceId,
      interactive,
      layout: layout || {} as any,
      paint: paint || {} as any,
    }

    if (sourceLayer) {
      layer['source-layer'] = sourceLayer;
    }

    if (minZoom) {
      layer.minzoom = minZoom;
    }

    if (maxZoom) {
      layer.maxzoom = maxZoom;
    }

    if (filter) {
      layer.filter = filter;
    }
    map.addLayer(
      layer,
      beforeId
    )

    updateEvents(eventRestRef.current, 'on')
    instance.current = true
    getMap && getMap(map)
  }, [])

  const remove = useCallback(() => {
    instance.current = false
    const { map, id, sourceId } = propsRef.current
    if (!map || !map.getStyle() || !id) {
      return
    }
    map.getLayer(id) && map.removeLayer(id)
    if (!sourceId) {
      map.getSource(id) && map.removeSource(id)
    }
    updateEvents(eventRestRef.current, 'off')
  }, [])

  const update = useCallback(() => {
    if (!map || !map.getStyle() || !id || !instance.current) {
      return
    }

    if (
      propsRef.current.id !== id ||
      propsRef.current.sourceId !== sourceId ||
      propsRef.current.type !== type ||
      propsRef.current.metadata !== metadata ||
      propsRef.current.sourceLayer !== sourceLayer ||
      propsRef.current.interactive !== interactive
    ) {
      eventRestRef.current = eventRest
      propsRef.current = props
      remove()
      init()
      return
    }

    if (!deepEqual(propsRef.current.paint, paint)) {
      const paintDiff = diff(propsRef.current.paint || {}, paint || {})
      Object.keys(paintDiff).forEach(key => {
        map.setPaintProperty(id, key, paintDiff[key])
      })
    }

    if (!deepEqual(propsRef.current.layout, layout)) {
      const layoutDiff = diff(propsRef.current.layout || {}, layout || {})
      Object.keys(layoutDiff).forEach(key => {
        map.setLayoutProperty(id, key, layoutDiff[key])
      })
    }

    if (!deepEqual(propsRef.current.filter, filter)) {
      map.setFilter(id, filter)
    }

    if (beforeId !== propsRef.current.beforeId) {
      map.moveLayer(id, beforeId)
    }

    if (
      minZoom !== propsRef.current.minZoom ||
      maxZoom !== propsRef.current.maxZoom
    ) {
      // TODO: Fix when PR https://github.com/DefinitelyTyped/DefinitelyTyped/pull/22036 is merged
      map.setLayerZoomRange(id, minZoom!, maxZoom!)
    }

    ; (Object.entries(LayerEventToHandler) as Array<
      [keyof LayerEventToHandlersType, keyof ILayerEvents]
    >).forEach(([event, propName]) => {
      const oldHandler: any = propsRef.current[propName]
      const newHandler: any = eventRest[propName]
      if (oldHandler !== newHandler) {
        if (oldHandler) {
          map.off(event, id, oldHandler)
        }

        if (newHandler) {
          map.on(event, id, newHandler)
        }
      }
    })

    // 在满足不使用其它图层源，并且 geoJSONSourceOptions 初始状态有值时
    if (
      !sourceId &&
      geoJSONSourceOptions &&
      propsRef.current.geoJSONSourceOptions &&
      geoJSONSourceOptions.data &&
      propsRef.current.geoJSONSourceOptions.data !== geoJSONSourceOptions.data
    ) {
      const geoJsonSource = map.getSource(id) as Mapboxgl.GeoJSONSource
      geoJsonSource.setData(
        geoJSONSourceOptions.data as GeoJSON.FeatureCollection<any>
      )
    }

    eventRestRef.current = eventRest
    propsRef.current = props
  }, [
    map,
    beforeId,
    minZoom,
    maxZoom,
    filter,
    layout,
    paint,
    sourceId,
    id,
    type,
    metadata,
    sourceLayer,
    interactive,
    eventRest,
    geoJSONSourceOptions,
  ])

  useEffect(() => {
    init()
    return () => {
      remove()
    }
  }, [])

  useEffect(() => {
    update()
  }, [update])

  return null
})

export default withMap(Layer)
