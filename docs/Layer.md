# Layer

创建一个新的 MapBox 层。

## 何时使用

创建地图图层，支持`"symbol" | "circle" | "line" | "background" | "fill-extrusion" | "fill" | "heatmap" | "hillshade" | "raster"`类型的图层。

## 代码演示

暂无。

## API

```
export interface ILayerProps extends ILayerEvents {
  /**
   * @description 地图实例
   * @default
   */
  map: Mapboxgl.Map
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
```

```
export interface ILayerEvents {
  onMouseMove?: (ev: mapboxgl.MapLayerMouseEvent) => any;
  onMouseEnter?: (ev: mapboxgl.MapLayerMouseEvent) => any;
  onMouseLeave?: (ev: mapboxgl.MapLayerMouseEvent) => any;
  onMouseDown?: (ev: mapboxgl.MapLayerMouseEvent) => any;
  onMouseUp?: (ev: mapboxgl.MapLayerMouseEvent) => any;
  onClick?: (ev: mapboxgl.MapLayerMouseEvent) => any;
  onTouchStart?: (ev: mapboxgl.MapLayerMouseEvent) => any;
  onTouchEnd?: (ev: mapboxgl.MapLayerMouseEvent) => any;
  onTouchCancel?: (ev: mapboxgl.MapLayerMouseEvent) => any;
}
```
