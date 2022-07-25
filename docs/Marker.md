# Marker

创建标记。

## 何时使用

点实例数量不多，设计交互复杂；
点实例数据多，设计交互复杂，需要点聚类处理；

## 代码演示

[点击我](/example/src/components/Marker/index.tsx)

## API

| 参数         | 说明                                                                    | 类型                                                                                                           | 默认值   | 备注 | 必选 | 版本 |
| ------------ | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------- | ---- | ---- | ---- |
| lngLat       | 表示一个指定的经纬度坐标，单位为度                                      | [number,number]                                                                                                | -        | -    | y    | -    |
| anchor       | 一个字符串，用来表示标记的哪个部位距离坐标点最近                        | 'center' , 'top' , 'bottom' , 'left' , 'right' , 'top-left' , 'top-right' , 'bottom-left' , and 'bottom-right' | 'center' | -    | n    | -    |
| offset       | 通过 PointLike 对象表示相对于元素中心偏移的像素数，左和上分别为负方向。 | number，[number, number]，Point                                                                                | 0        | -    | n    | -    |
| children     | 子组件                                                                  | JSX.Element，JSX.Element[]                                                                                     | -        | -    | n    | -    |
| onClick      | 点击事件                                                                | (event:React.MouseEvent<HTMLDivElement, MouseEvent>) => void                                                   | -        | -    | n    | -    |
| onMouseEnter | 鼠标移入事件                                                            | (event:React.MouseEvent<HTMLDivElement, MouseEvent>) => void                                                   | -        | -    | n    | -    |
| onMouseLeave | 鼠标移出事件                                                            | (event:React.MouseEvent<HTMLDivElement, MouseEvent>) => void                                                   | -        | -    | n    | -    |
| style        | 内联样式                                                                | React.CSSProperties                                                                                            | -        | -    | n    | -    |
| className    | 类名                                                                    | string                                                                                                         | -        | -    | n    | -    |
| tabIndex     | 指示其元素是否可以聚焦                                                  | number                                                                                                         | -        | -    | n    | -    |
| map          | 地图实例                                                                | mapboxgl.Map                                                                                                   | -        | -    | n    | -    |
| getMap       | 获取地图实例方法                                                        | (map: mapboxgl.Map) => void                                                                                    | -        | -    | n    | -    |
