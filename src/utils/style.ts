// 参考 https://www.aerisweather.com/support/docs/toolkits/aeris-js-sdk/examples/interactive-map/handling-mapbox-style-changes/
import deepEqual from 'deep-equal'

interface ISetMapStyle {
    map: mapboxgl.Map
    style: string | mapboxgl.Style
    layersList: string[]
    sourcesList: string[]
}
const setMapStyleFn = function (defaultStyle: string | mapboxgl.Style) {
    let prevStyle = defaultStyle
    return (props: ISetMapStyle) => {
        const { map, style, sourcesList, layersList } = props
        if (!map || !style || !layersList || !sourcesList) {
            return
        }

        if (deepEqual(prevStyle, style)) {
            return
        }
        prevStyle = style

        const mapStyle = map.getStyle();
        if (!mapStyle) {
            return
        }
        // const regExp = new RegExp(`^${prefix}`)
        // const layers = (mapStyle.layers || []).filter((layer) => regExp.test(layer.id));
        const layers = (mapStyle.layers || []).filter((layer) => layersList.includes(layer.id));
        const sources = Object.keys((mapStyle.sources || {})).filter((key) => {
            return sourcesList.includes(key)
        }).reduce((prev, result) => {
            prev[result] = (mapStyle.sources || {})[result];
            return prev;
        }, {});

        const handleStyle = () => {
            Object.keys(sources).forEach((key) => {
                const existing = map.getSource(key);
                if (!existing) {
                    map.addSource(key, sources[key]);
                }
            });
            layers.forEach((layer) => {
                const existing = map.getLayer(layer.id);
                if (!existing) {
                    map.addLayer(layer)
                }
            });
            map.off('style.load', handleStyle);
        }
        map.on('style.load', handleStyle);

        map.setStyle(style, { diff: true });
    }
}

export default setMapStyleFn