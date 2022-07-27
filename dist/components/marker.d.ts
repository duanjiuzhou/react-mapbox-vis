import { IProjectedLayerProps } from './projected-layer';
export declare type IMarkerProps = Omit<IProjectedLayerProps, 'type' | 'onWheel' | 'onScroll' | 'onDoubleClick'>;
export declare const Marker: (props: IMarkerProps) => JSX.Element;
declare const _default: (props: Pick<IProjectedLayerProps, "lngLat" | "anchor" | "offset" | "children" | "onClick" | "onMouseEnter" | "onMouseLeave" | "style" | "className" | "tabIndex" | "map" | "getMap">) => JSX.Element;
export default _default;
