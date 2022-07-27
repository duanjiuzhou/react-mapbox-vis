import Mapboxgl from 'mapbox-gl';
import { IProjectedLayerProps } from '../components/projected-layer';
import { Anchor } from '../types';
export interface PointDef {
    x: number;
    y: number;
}
export interface OverlayParams {
    anchor?: Anchor;
    offset?: Mapboxgl.Point;
    position?: Mapboxgl.Point;
}
export declare const anchors: ("center" | "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right")[];
export declare const anchorTranslates: {
    center: string;
    top: string;
    left: string;
    right: string;
    bottom: string;
    'top-left': string;
    'top-right': string;
    'bottom-left': string;
    'bottom-right': string;
};
export declare const overlayState: (props: IProjectedLayerProps, map: Mapboxgl.Map, container: HTMLElement) => {
    anchor: "center" | "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
    position: Mapboxgl.Point;
    offset: Mapboxgl.Point;
};
export declare const overlayTransform: ({ anchor, position, offset }: OverlayParams) => string[];
