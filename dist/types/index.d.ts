import { Point } from 'mapbox-gl';
export declare type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
export declare type LngLat = [number, number] | {
    lng: number;
    lat: number;
};
export declare type MapCoordinate = "BD-09" | "GCJ-02" | "WGS84";
export declare const defaultGeoJson: GeoJSON.FeatureCollection<any>;
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
export declare type LayerEventToHandlersType = {
    [key in keyof mapboxgl.MapLayerEventType]?: keyof ILayerEvents;
};
export declare const LayerEventToHandler: LayerEventToHandlersType;
export interface IMarkerEvents {
    onDrag?: (ev: any) => any;
    onDragend?: (ev: any) => any;
    onDragstart?: (ev: any) => any;
}
export declare const MarkerEventToHandler: {
    drag: string;
    dragend: string;
    dragstart: string;
};
export interface IPopupEvents {
    onOpen?: (ev: any) => any;
    onClose?: (ev: any) => any;
}
export declare const PopupEventToHandler: {
    open: string;
    close: string;
};
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
export declare type Anchor = keyof AnchorsOffset;
export declare type Layout = mapboxgl.BackgroundLayout | mapboxgl.FillLayout | mapboxgl.FillExtrusionLayout | mapboxgl.LineLayout | mapboxgl.SymbolLayout | mapboxgl.RasterLayout | mapboxgl.CircleLayout | mapboxgl.HeatmapLayer;
export declare type Paint = mapboxgl.BackgroundPaint | mapboxgl.FillPaint | mapboxgl.FillExtrusionPaint | mapboxgl.SymbolPaint | mapboxgl.LinePaint | mapboxgl.RasterPaint | mapboxgl.CirclePaint | mapboxgl.HeatmapPaint;
