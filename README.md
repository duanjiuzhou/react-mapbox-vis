# react-mapbox-vis

`react-mapbox-vis`是基于`mapbox-gl-js`进行了包装。

## ✨ 特性

- 📦 开箱即用的高质量 React 组件。
- 🛡 使用 TypeScript 开发，提供完整的类型定义文件。
- 🌈 基于 React 框架对`mapbox-gl-js`进行组织抽象，能更好地融合于项目。

## 文档

[点击查看](/docs/API.md)

## 兼容环境

- 现代浏览器。
- `mapbox-gl`最低版本`^1.12.0`。
- `react`最低版本`^16.13.1`。
- `react-dom`最低版本`^16.13.1`。
- v1.2.0 版本后，取消了对结束了对 Internet Explorer 11 的支持。
- `typescript`最低版本 `^3.8.3`。


## 使用说明

`react-mapbox-vis`中，通过 React Context 内置了 map 实例。通过`<Map />`组件构建地图实例，其它的地图图层，标记，弹框等已自动绑定地图实例，并且其都在`<Map> ... </Map>` 内部创建，作为其子组件，不用额外添加属性`map`。

### 实例

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

## Components 组件

- ✅ Layer 创建地图图层，支持`"symbol" | "circle" | "line" | "background" | "fill-extrusion" | "fill" | "heatmap" | "hillshade" | "raster"`类型的图层。
- ✅ `Image` 用作图标[icon-image](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#layout-symbol-icon-image)的图像添加到地图中；
- ✅ `Marker` 创建标记。
- ✅ `Popup` 弹窗。

