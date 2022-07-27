import * as turf from '@turf/turf'

// 获取多点中心位置
export const getPointCenter = (
    geoJSONPoint: GeoJSON.Feature<GeoJSON.Point>[]
) => {
    try {
        const feature = turf.featureCollection(geoJSONPoint)

        const center = turf.center(feature)

        if (center) {
            return center!.geometry!.coordinates as [number, number]
        } else {
            return null
        }
    } catch (error) {
        return null
    }
}
