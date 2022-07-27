import React from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../style/index.css';
declare type MapboxOptions = Omit<mapboxgl.MapboxOptions, 'container'>;
interface IMapServiceProps extends React.ComponentProps<any> {
    mapboxOptions: MapboxOptions;
    onLoad?: (map: mapboxgl.Map, ev: mapboxgl.MapboxEvent<undefined> & mapboxgl.EventData) => void;
    onError?: (e: any) => void;
}
declare const _default: React.NamedExoticComponent<IMapServiceProps>;
export default _default;
