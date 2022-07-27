import React from 'react';
import Mapboxgl from 'mapbox-gl';
import { OverlayParams } from '../utils/overlays';
import { Anchor } from '../types';
export interface IProjectedLayerProps {
    type: 'marker' | 'popup';
    lngLat: [number, number];
    anchor?: Anchor;
    offset?: number | [number, number] | Mapboxgl.Point;
    children?: JSX.Element | JSX.Element[];
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onDoubleClick?: React.MouseEventHandler<HTMLDivElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
    onScroll?: React.UIEventHandler<HTMLDivElement>;
    onWheel?: React.MouseEventHandler<HTMLDivElement>;
    style?: React.CSSProperties;
    className?: string;
    tabIndex?: number;
    map?: Mapboxgl.Map;
    getMap?: (map: mapboxgl.Map) => void;
}
export declare class ProjectedLayer extends React.Component<IProjectedLayerProps, OverlayParams> {
    private container;
    private prevent;
    static defaultProps: {
        offset: number;
        onClick: (...args: any[]) => any[];
    };
    state: OverlayParams;
    private setContainer;
    private handleMapMove;
    componentDidMount(): void;
    private havePropsChanged;
    componentDidUpdate(prevProps: IProjectedLayerProps): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export default ProjectedLayer;
