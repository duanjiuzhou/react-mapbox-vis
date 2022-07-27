
import { Point } from 'mapbox-gl';
export type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

// 经纬度
export type LngLat = [number, number] | { lng: number; lat: number };

// 地图坐标系
export type MapCoordinate = "BD-09" | "GCJ-02" | "WGS84";

export const defaultGeoJson: GeoJSON.FeatureCollection<any> = {
  type: "FeatureCollection",
  features: [],
};

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

export type LayerEventToHandlersType = {
  [key in keyof mapboxgl.MapLayerEventType]?: keyof ILayerEvents
};

export const LayerEventToHandler: LayerEventToHandlersType = {
  touchstart: 'onTouchStart',
  touchend: 'onTouchEnd',
  touchcancel: 'onTouchCancel',
  mousemove: 'onMouseMove',
  mouseenter: 'onMouseEnter',
  mouseleave: 'onMouseLeave',
  mousedown: 'onMouseDown',
  mouseup: 'onMouseUp',
  click: 'onClick'
};

export interface IMarkerEvents {
  onDrag?: (ev: any) => any;
  onDragend?: (ev: any) => any;
  onDragstart?: (ev: any) => any;
}

export const MarkerEventToHandler = {
  drag: 'onDrag',
  dragend: 'onDragend',
  dragstart: 'onDragstart',
}

export interface IPopupEvents {
  onOpen?: (ev: any) => any;
  onClose?: (ev: any) => any;
}

export const PopupEventToHandler = {
  open: 'onOpen',
  close: 'onClose',
}


export interface AnchorOffsetLimits {
  'top-left': Point;
  'top-right': Point;
  'bottom-left': Point;
  'bottom-right': Point;
}

export interface AnchorsOffset extends AnchorOffsetLimits {
  center: Point;
  top: Point;
  bottom: Point;
  left: Point;
  right: Point;
}

export type Anchor = keyof AnchorsOffset;

export type Layout =
  | mapboxgl.BackgroundLayout
  | mapboxgl.FillLayout
  | mapboxgl.FillExtrusionLayout
  | mapboxgl.LineLayout
  | mapboxgl.SymbolLayout
  | mapboxgl.RasterLayout
  | mapboxgl.CircleLayout
  | mapboxgl.HeatmapLayer

export type Paint =
  | mapboxgl.BackgroundPaint
  | mapboxgl.FillPaint
  | mapboxgl.FillExtrusionPaint
  | mapboxgl.SymbolPaint
  | mapboxgl.LinePaint
  | mapboxgl.RasterPaint
  | mapboxgl.CirclePaint
  | mapboxgl.HeatmapPaint