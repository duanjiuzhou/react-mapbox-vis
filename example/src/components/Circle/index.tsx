import React from 'react'

// rc
import { Layer } from 'react-mapbox-vis'

const data = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { id: 1 },
      geometry: {
        type: 'Point',
        coordinates: [115.90061187744139, 28.68275690719147],
      },
    },
    {
      type: 'Feature',
      properties: { id: 2 },
      geometry: {
        type: 'Point',
        coordinates: [115.89614868164062, 28.671009688694735],
      },
    },
    {
      type: 'Feature',
      properties: { id: 3 },
      geometry: {
        type: 'Point',
        coordinates: [115.92018127441405, 28.698417815639452],
      },
    },
  ],
} as GeoJSON.FeatureCollection<GeoJSON.Point>

interface Props {
  map?: any
}

export default function Circle(props: Props) {
  const { map } = props
  return (
    <Layer
      type={'circle'}
      map={map}
      id={'map-Circle'}
      geoJSONSourceOptions={{ data }}
      layout={{}}
      paint={{
        'circle-color': '#9B9B9B',
        'circle-radius': 50,
        'circle-opacity': 0.5,
      }}
    />
  )
}
