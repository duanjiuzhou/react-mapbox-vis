# usePointClusters

在线地图上浏览点数据最常见的应用需求之一，众多 JS 库都可以很轻松地实现。然而，但点数据规模达到一定程度后，直接对每个点进行渲染是不现实的，尤其是在点数据集达到百万级以上的时候。这个时候需要点聚类处理。

## 功能列表

- ✅ 查找一定范围内的所有点；
- ✅ 查找屏幕内的所有点簇；
- ✅ 基于`supercluster`实现数据实时聚类可视化；
- ✅ 通过实例化函数，并传入相关参数，获取处理后的点聚类数据；
- ✅ 支持获取多点中心位置和缩放层级；
- ⚪ 基于`Web Worker` 来完成数据集的聚类处理，不影响主线程中的地图渲染过程；

## 参数

```jsx
interface PointClustersType {
  /** 点GeoJSON数据集  */
  geojson: GeoJSON.Feature<GeoJSON.Point, any>[]
  /** 地图实例 */
  map: mapboxgl.Map
  /** 集群半径，以像素为单位 */
  radius?: number
  /** 在其中产生的簇的最大缩放级别。 */
  maxZoom?: number
}
```

## 返回值

| 参数                  | 说明                       | 类型                                                                               | 默认值 |
| --------------------- | -------------------------- | ---------------------------------------------------------------------------------- | ------ |
| clustersGeojson       | 聚类数据                   | ClusterGeojsonType                                                                 | -      |
| getPointZoomAndCenter | 获取多点中心位置和缩放层级 | `(clusterId: number) => {zoom: number \| null; center: [number, number] \| null;}` | -      |

**ClusterGeojsonType 类型：**

```
export type ClusterGeojsonType = {
  clustersGeojson: Supercluster.PointFeature<Supercluster.AnyProps>[]
  pointsGeojson: Supercluster.ClusterFeature<Supercluster.AnyProps>[]
}
```

## 使用方法

```jsx
// 引用
import usePointClusters from './usePointClusters'

// 实例化
const { clustersGeojson, getPointZoomAndCenter } = usePointClusters({
    map,
    geojson: data.features as any,
    radius: 80,
    maxZoom: 20,
})

// render
<>
 {clustersGeojson.clustersGeojson.map((item, index) => (
        <Marker
          key={'clustersGeojson' + index}
          map={map}
          lngLat={item.geometry.coordinates as any}
          onClick={onClick.bind(null, item.properties.cluster_id)}
        >
          <div
            style={{
              color: '#fff',
            }}
          >
            聚合数：{item.properties.point_count}
          </div>
        </Marker>
  ))}
  {clustersGeojson.pointsGeojson.map((item, index) => (
        <Marker
          key={'pointsGeojson' + index}
          map={map}
          lngLat={item.geometry.coordinates as any}
        >
          <div
            style={{
              color: '#7c797b',
            }}
          >
            {item.properties.name}
          </div>
        </Marker>
  ))}
</>
```

## 参考

- [空间索引 RBush](https://github.com/mourner/rbush)
- [Supercluster-JavaScript 聚类库](https://github.com/mapbox/supercluster)
- [利用 Supercluster 实现百万级点数据的实时聚类可视化](https://wysrc.github.io/2017/11/23/supercluster/)
