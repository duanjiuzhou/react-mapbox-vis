import React from 'react'

// rc
import { Layer } from 'react-mapbox-vis'

const data = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: [
          [115.92824935913087, 28.67447374904897],
          [115.93442916870117, 28.6785401085332],
          [115.94060897827147, 28.67823890213276],
          [115.94593048095702, 28.674021921585027],
          [115.94696044921875, 28.66739489491524],
          [115.94215393066406, 28.65880925995925],
          [115.93082427978514, 28.653838307772872],
          [115.92962265014648, 28.65398894615038],
        ],
      },
    },
  ],
} as GeoJSON.FeatureCollection<GeoJSON.LineString>

interface Props {
  map?: any
}

export default function MapLine(props: Props) {
  const { map } = props

  return (
    <>
      <Layer
        type={'line'}
        map={map}
        id={'map-line'}
        geoJSONSourceOptions={{ data }}
        layout={{
          'line-cap': 'round',
        }}
        paint={{
          'line-color': 'red',
          'line-width': 4,
          'line-opacity': 1,
        }}
      />
    </>
  )
}
