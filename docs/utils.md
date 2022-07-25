## setMapStyleFn

设置地图样式方法。

#### 类型：

```
setMapStyleFn: (defaultStyle: string | mapboxgl.Style) => (props: ISetMapStyle) => void
```

#### 参数说明：

**defaultStyle：**

地图加载时默认的样式。

**ISetMapStyle：**

```
interface ISetMapStyle {
    map: mapboxgl.Map  // 地图实例
    style: string | mapboxgl.Style // 要更改的样式
    layersList: string[] // 图层id列表
    sourcesList: string[] // 数据源id列表
}
```

#### 使用案例

```
import { setMapStyleFn } from 'react-mapbox-vis'

const setMapStyle = setMapStyleFn('xxxxxx')

// 函数中调用

 setMapStyle({
    map: map.current,
    style: 'mapbox://styles/gaea1/cklt80asj26tz17qnqayb7xtc'
    layersList: ['map-Fill', 'map-Circle'],
    sourcesList: ['map-Fill', 'map-Circle'],
})
```
