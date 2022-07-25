# map

创建一个 react Mapbox 地图实例。

## 何时使用

当使用地图时，用于创建地图实例。

## 运行原理

初始化`<Map>子组件</MAp>`后，`<Map />`组件内部先加载地图实例，加载地图成功后，再渲染子组件。

## 代码演示

```
import Map, { Marker } from 'react-mapbox-vis'
 <Map mapboxOptions={{
    accessToken: "pk.eyJ1IjoiZ2FlYTEiLCJhIjoiY2pvNnc3cW5oMDJ2ejNwc2IwbHZsOW5ucyJ9.ac1ZYblbOZyhUm9ZpIcq-w",
    center: [115.8962, 28.673558],
    style: "mapbox://styles/gaea1/ckerxp6tp5q7a19mrokqnh6n6",
    zoom: 13,
    pitch: 45,
 }} className="map">
    <Marker lngLat={[115.91305, 28.68857]}>MapMarker</Marker>
 </Map>
```

## API

| 参数          | 说明               | 类型                                                                        | 默认值 | 备注                                                        | 必选 | 版本 |
| ------------- | ------------------ | --------------------------------------------------------------------------- | ------ | ----------------------------------------------------------- | ---- | ---- |
| mapboxOptions | 地图参数           | Object                                                                      | -      | 详情见[链接](https://docs.mapbox.com/mapbox-gl-js/api/map/) | y    | -    |
| onStyleLoad   | 地图加载成功的回调 | ( map: mapboxgl.Map,ev: mapboxgl.MapboxEvent & mapboxgl.EventData ) => void | -      | -                                                           | n    | -    |
| onError       | 地图加载失败的回调 | (e: any) => void                                                            | -      | -                                                           | n    | -    |
| children      | 子组件             | React.ReactNode                                                             | -      | -                                                           | n    | -    |

## FAQ

### `mapboxOptions`中的参数`container`不用传入的问题？

`Map` 组件内已经自带参数`container`，故不需要再额外传入。
