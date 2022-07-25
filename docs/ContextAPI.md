# Context API

## MapContext

支持状态上下文。您可以从`<Map />`组件中的任何位置从上下文中获取地图实例。

```
import Map, { MapContext } from 'react-mapbox-vis'

const MyMap = () => (
  <Map style="your-style-here">
    <MapContext.Consumer>
      {(map) => {
        // use `map` here
      }}
    </MapContext.Consumer>
  </Map>
);
```
