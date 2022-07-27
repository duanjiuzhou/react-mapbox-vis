import React, { useState, useCallback } from 'react'

// rc
import { Marker } from 'react-mapbox-vis'

interface Props {
  map?: any
}

export default function MapMarker(props: Props) {
  const { map } = props
  const [index, setIndex] = useState(1)

  const onClick = useCallback(
    (e: any) => {
      console.log('Marker onClick', e)
      setIndex(index + 1)
    },
    [index]
  )

  return (
    <>
      <Marker
        map={map}
        lngLat={[115.91305907923112, 28.68857323024]}
        onClick={onClick}
      >
        <div style={{ color: 'red' }}>MapMarker{index}</div>
      </Marker>
    </>
  )
}
