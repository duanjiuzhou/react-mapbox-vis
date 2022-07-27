import Supercluster from 'supercluster'
import { useEffect, useCallback, useState } from 'react'

// utils
import { getPointCenter } from './utils'

// type
import * as GeoJSON from 'geojson'

type PointFeature = Supercluster.PointFeature<Supercluster.AnyProps>[]
type ClusterFeature = Supercluster.ClusterFeature<Supercluster.AnyProps>[]

export type ClusterGeojsonType = {
  clustersGeojson: ClusterFeature
  pointsGeojson: PointFeature
}

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

const usePointClusters = (props: PointClustersType) => {
  const { geojson, map, radius = 60, maxZoom = 16 } = props
  const [clustersGeojson, setClustersGeojson] = useState<ClusterGeojsonType>({
    clustersGeojson: [],
    pointsGeojson: [],
  })
  const [superclusterInstance, setSuperclusterInstance] = useState<
    Supercluster
  >()

  const initSupercluster = useCallback(() => {
    if (!geojson) {
      return
    }
    setSuperclusterInstance(
      new Supercluster({
        radius,
        maxZoom,
      }).load(geojson)
    )
  }, [geojson, maxZoom, radius])

  const handleFeatures = useCallback(
    (
      features: (
        | Supercluster.ClusterFeature<Supercluster.AnyProps>
        | Supercluster.PointFeature<Supercluster.AnyProps>
      )[]
    ) => {
      const clustersGeojson: ClusterFeature = []
      const pointsGeojson: PointFeature = []
      features.forEach(feature => {
        const isCluster = !!feature.properties.cluster
        if (isCluster) {
          clustersGeojson.push(
            feature as Supercluster.ClusterFeature<Supercluster.AnyProps>
          )
        } else {
          pointsGeojson.push(feature)
        }
      })
      setClustersGeojson({ clustersGeojson, pointsGeojson })
    },
    []
  )

  const updateClusters = useCallback(() => {
    if (!superclusterInstance) {
      return
    }
    const bounds = map.getBounds()
    const boundsMap = [
      bounds.getWest(),
      bounds.getSouth(),
      bounds.getEast(),
      bounds.getNorth(),
    ] as any
    const zoom = Math.floor(map.getZoom())
    const clustersGeojson = superclusterInstance.getClusters(boundsMap, zoom)

    handleFeatures(clustersGeojson)
  }, [handleFeatures, map, superclusterInstance])

  const getPointZoomAndCenter = useCallback(
    (clusterId: number) => {
      if (!superclusterInstance) {
        return { zoom: null, center: null }
      }
      const zoom = superclusterInstance.getClusterExpansionZoom(clusterId)
      const geoJson = superclusterInstance.getChildren(clusterId)
      const center = getPointCenter(geoJson)
      return { zoom, center }
    },
    [superclusterInstance]
  )

  useEffect(() => {
    initSupercluster()
  }, [initSupercluster])

  useEffect(() => {
    if (map) {
      updateClusters()
      map.on('moveend', updateClusters)
    }
    return () => {
      map && map.off('moveend', updateClusters)
    }
  }, [map, updateClusters])

  return { clustersGeojson, getPointZoomAndCenter }
}

export default usePointClusters
