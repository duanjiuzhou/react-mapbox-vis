/// <reference types="mapbox-gl" />
import Supercluster from 'supercluster';
import * as GeoJSON from 'geojson';
declare type PointFeature = Supercluster.PointFeature<Supercluster.AnyProps>[];
declare type ClusterFeature = Supercluster.ClusterFeature<Supercluster.AnyProps>[];
export declare type ClusterGeojsonType = {
    clustersGeojson: ClusterFeature;
    pointsGeojson: PointFeature;
};
interface PointClustersType {
    /** 点GeoJSON数据集  */
    geojson: GeoJSON.Feature<GeoJSON.Point, any>[];
    /** 地图实例 */
    map: mapboxgl.Map;
    /** 集群半径，以像素为单位 */
    radius?: number;
    /** 在其中产生的簇的最大缩放级别。 */
    maxZoom?: number;
}
declare const usePointClusters: (props: PointClustersType) => {
    clustersGeojson: ClusterGeojsonType;
    getPointZoomAndCenter: (clusterId: number) => {
        zoom: null;
        center: null;
    } | {
        zoom: number;
        center: [number, number] | null;
    };
};
export default usePointClusters;
