import React, { useCallback } from 'react'

// rc
import { Image, Layer } from 'react-mapbox-vis'

// assets
import positionUrl from '../../assets/position.png'

const data = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { id: 1, name: 'Open Sans Semibold' },
      geometry: {
        type: 'Point',
        coordinates: [115.90061187744139, 28.68275690719147],
      },
    },
    {
      type: 'Feature',
      properties: { id: 2, name: '图标1' },
      geometry: {
        type: 'Point',
        coordinates: [115.89614868164062, 28.671009688694735],
      },
    },
    {
      type: 'Feature',
      properties: { id: 3, name: '图标2' },
      geometry: {
        type: 'Point',
        coordinates: [115.92018127441405, 28.698417815639452],
      },
    },
    {
      type: 'Feature',
      properties: { id: 4, name: '图标3' },
      geometry: {
        type: 'Point',
        coordinates: [115.94146728515625, 28.6797449254734],
      },
    },
    {
      type: 'Feature',
      properties: { id: 5, name: '图标4' },
      geometry: {
        type: 'Point',
        coordinates: [115.95382690429686, 28.70203153871824],
      },
    },
    {
      type: 'Feature',
      properties: { id: 6, name: '图标6' },
      geometry: {
        type: 'Point',
        coordinates: [115.94730377197264, 28.66438247151326],
      },
    },
    {
      type: 'Feature',
      properties: { id: 7, name: '图标7' },
      geometry: {
        type: 'Point',
        coordinates: [115.92842102050781, 28.689985309884026],
      },
    },
    {
      type: 'Feature',
      properties: { id: 8, name: '图标8' },
      geometry: {
        type: 'Point',
        coordinates: [115.92327117919922, 28.67432314011083],
      },
    },
    {
      type: 'Feature',
      properties: { id: 9, name: '图标9' },
      geometry: {
        type: 'Point',
        coordinates: [115.87108612060548, 28.700224692776988],
      },
    },
  ],
} as GeoJSON.FeatureCollection<GeoJSON.Point>

interface Props {
  map?: any
}
export default function Symbol(props: Props) {
  const onClick = useCallback((ev: mapboxgl.MapLayerMouseEvent) => {
    console.log(
      ev,
      ev.lngLat,
      ev.type,
      ev.features![0].geometry,
      ev.features![0].properties
    )
  }, [])

  return (
    <>
      <Image id="icon-my-position" url={positionUrl} />
      <Layer
        type={'symbol'}
        id={'map-Symbol'}
        geoJSONSourceOptions={{ data }}
        layout={{
          'icon-image': 'icon-my-position',
          'icon-size': 0.5,
          'text-field': '{name}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 1],
          'text-anchor': 'top',
        }}
        paint={{ 'text-color': '#fff' }}
        onClick={onClick}
        // filter={['in', 'id', 1, 2, 3, 4]}
      />
    </>
  )
}
