import * as React from 'react';
import { Map } from 'mapbox-gl';
export declare const MapContext: React.Context<Map | undefined>;
export declare const withMap: <T extends object>(Component: React.ComponentType<T>) => (props: T) => JSX.Element;
