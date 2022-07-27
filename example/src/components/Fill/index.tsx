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
        type: 'Polygon',
        coordinates: [
          [
            [115.88001251220702, 28.681853321771165],
            [115.87022781372069, 28.67703406786973],
            [115.86250305175783, 28.65429022225621],
            [115.87297439575194, 28.649469700686463],
            [115.894775390625, 28.669352923691555],
            [115.89168548583984, 28.682907504003612],
            [115.88001251220702, 28.681853321771165],
          ],
        ],
      },
    },
  ],
} as GeoJSON.FeatureCollection<GeoJSON.Polygon>

interface Props {
  map?: any
}

export default function MapFill(props: Props) {
  const { map } = props

  const onClick = (e: mapboxgl.MapLayerMouseEvent) => {
    console.log('Fill', e, e.features)
  }

  return (
    <Layer
      type={'fill'}
      map={map}
      id={'map-Fill'}
      onClick={onClick}
      geoJSONSourceOptions={{ data }}
      paint={{ 'fill-color': '#088', 'fill-opacity': 0.8 }}
    />
  )
}
