import Mapboxgl from 'mapbox-gl';
interface ImageOptionsType {
    /**
     * @description 图像像素与屏幕真实像素的比例。
     * @default
     */
    pixelRatio?: number;
    /**
     * @description 图像是否应该被解析为SDF图像。
     * @default
     */
    sdf?: boolean;
}
declare type ImageDataType = HTMLImageElement | ArrayBufferView | {
    width: number;
    height: number;
    data: Uint8Array | Uint8ClampedArray;
} | ImageData;
export interface IMapImage {
    /**
     * @description  图像的ID。
     * @default
     */
    id: string;
    /**
     * @description  地图实例
     * @default
     */
    map?: Mapboxgl.Map;
    /**
     * @description  图片地址 url 与 data 同时存在，data会作用，url无效
     * @default
     */
    url?: string;
    /**
     * @description 图片数据
     * @default
     */
    data?: ImageDataType;
    /**
     * @description  图片配置项
     * @default
     */
    options?: ImageOptionsType;
    /**
     * @description  图片加载成功回调事件
     * @default
     */
    onLoaded?: () => void;
    /**
     * @description  图片加载失败回调事件
     * @default
     */
    onError?: (error: Error) => void;
}
declare const _default: (props: IMapImage) => JSX.Element;
export default _default;
