# Image

用作图标[icon-image](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#layout-symbol-icon-image)的图像添加到地图中；

## 何时使用

需添加图标[icon-image]，用在地图上的时候，一般配合`MapSymbol`组件使用。

## 代码演示

```
<Image id={'icon-xxx'} url={'http://images/school.png'} />
```

## API

```
export interface IMapImage {
  /**
   * @description  图像的ID。
   * @default
   */
  id: string
  /**
   * @description  地图实例
   * @default
   */
  map: Map
  /**
   * @description  图片地址 url 与 data 同时存在，data会作用，url无效
   * @default
   */
  url?: string
  /**
   * @description 图片数据
   * @default
   */
  data?: ImageDataType
  /**
   * @description  图片配置项
   * @default
   */
  options?: ImageOptionsType
  /**
   * @description  图片加载成功回调事件
   * @default
   */
  onLoaded?: () => void
  /**
   * @description  图片加载失败回调事件
   * @default
   */
  onError?: (error: Error) => void
}
```

```
interface ImageOptionsType {
  /**
   * @description 图像像素与屏幕真实像素的比例。
   * @default
   */
  pixelRatio?: number
  /**
   * @description 图像是否应该被解析为SDF图像。
   * @default
   */
  sdf?: boolean
}

type ImageDataType =
  | HTMLImageElement
  | ArrayBufferView
  | { width: number; height: number; data: Uint8Array | Uint8ClampedArray }
  | ImageData
```
