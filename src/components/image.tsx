import React from 'react'
import Mapboxgl from 'mapbox-gl'
import { withMap } from './context'
import deepEqual from 'deep-equal'

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
  map?: Mapboxgl.Map
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

class Image extends React.Component<IMapImage> {
  public componentDidMount() {
    this.loadImage(this.props)
  }

  public componentWillUnmount() {
    Image.removeImage(this.props)
  }

  public shouldComponentUpdate(nextProps: IMapImage) {
    return !deepEqual(nextProps, this.props)
  }

  public componentDidUpdate(prevProps: IMapImage) {
    const { id } = prevProps

    if (prevProps.map !== this.props.map) {
      // Remove image from old map
      Image.removeImage(this.props)
    }

    if (this.props.map && !this.props.map.hasImage(id)) {
      // Add missing image to map
      this.loadImage(this.props)
    }
  }

  public render() {
    console.log('图标')
    return null
  }

  private loadImage(props: IMapImage) {
    const { map, id, url, data, options, onError } = props

    if (!map) {
      return
    }

    if (map.hasImage(id)) {
      return
    }

    if (data) {
      map.addImage(id, data, options)
      this.loaded()
    } else if (url) {
      map.loadImage(url, (error: Error | undefined, image: ImageDataType) => {
        if (error) {
          if (onError) {
            onError(error)
          }

          return
        }
        map.addImage(id, image, options)
        this.loaded()
      })
    }
  }

  private static removeImage(props: IMapImage) {
    const { id, map } = props
    if (map && map.getStyle()) {
      map.hasImage(id) && map.removeImage(id)
    }
  }
  private loaded() {
    const { onLoaded } = this.props
    if (onLoaded) {
      onLoaded()
    }
  }
}

export default withMap(Image)
