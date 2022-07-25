# Popup

弹窗组件。

## 何时使用

交互需要弹框时使用；

## 代码演示

[点击我](/example/src/components/Popup/index.tsx)

## API

| 参数         | 说明                                                                                                                                  | 类型                                                                                                           | 默认值  | 备注 | 必选 | 版本 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------- | ---- | ---- | ---- |
| lngLat       | 表示一个指定的经纬度坐标，单位为度                                                                                                    | [number,number]                                                                                                | -       | -    | y    | -    |
| anchor       | 表示弹窗位置的字符，通过 Popup#setLngLat 与坐标集关联。如未设置，将对锚点 进行动态设置，以保证弹窗落在地图容器内， 并偏向 'bottom' 。 | 'center' , 'top' , 'bottom' , 'left' , 'right' , 'top-left' , 'top-right' , 'bottom-left' , and 'bottom-right' | -       | -    | n    | -    |
| offset       | 通过 PointLike 对象表示相对于元素中心偏移的像素数，左和上分别为负方向。                                                               | number，[number, number]，Point                                                                                | 0       | -    | n    | -    |
| children     | 子组件                                                                                                                                | JSX.Element，JSX.Element[]                                                                                     | -       | -    | n    | -    |
| onClick      | 点击事件                                                                                                                              | (event:React.MouseEvent<HTMLDivElement, MouseEvent>) => void                                                   | -       | -    | n    | -    |
| onMouseEnter | 鼠标移入事件                                                                                                                          | (event:React.MouseEvent<HTMLDivElement, MouseEvent>) => void                                                   | -       | -    | n    | -    |
| onMouseLeave | 鼠标移出事件                                                                                                                          | (event:React.MouseEvent<HTMLDivElement, MouseEvent>) => void                                                   | -       | -    | n    | -    |
| onClose      | 弹框关闭事件回调                                                                                                                      | () => void                                                                                                     | -       | -    | n    | -    |
| style        | 内联样式                                                                                                                              | React.CSSProperties                                                                                            | -       | -    | n    | -    |
| className    | 类名                                                                                                                                  | string                                                                                                         | -       | -    | n    | -    |
| tabIndex     | 指示其元素是否可以聚焦                                                                                                                | number                                                                                                         | -       | -    | n    | -    |
| map          | 地图实例                                                                                                                              | mapboxgl.Map                                                                                                   | -       | -    | n    | -    |
| maxWidth     | 设置弹窗 CSS 属性中最大宽度的字符串，例如 '300px' 。                                                                                  | string                                                                                                         | '240px' | -    | n    | -    |
| closeButton  | 如果为 true ，弹窗右上角 将出现关闭按钮。                                                                                             | boolean                                                                                                        | false   | -    | n    | -    |
| closeOnClick | 如果为 true ，点击地图时 弹窗将关闭。                                                                                                 | boolean                                                                                                        | false   | -    | n    | -    |
| getMap       | 获取地图实例方法                                                                                                                      | (map: mapboxgl.Map) => void                                                                                    | -       | -    | n    | -    |
