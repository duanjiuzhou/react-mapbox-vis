/// <reference types="mapbox-gl" />
interface ISetMapStyle {
    map: mapboxgl.Map;
    style: string | mapboxgl.Style;
    layersList: string[];
    sourcesList: string[];
}
declare const setMapStyleFn: (defaultStyle: string | mapboxgl.Style) => (props: ISetMapStyle) => void;
export default setMapStyleFn;
