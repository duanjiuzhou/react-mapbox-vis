import React, { useState, useCallback } from 'react'

// rc
import { Popup } from 'react-mapbox-vis'

interface Props {
  map?: any
}
export default function MapPopup(props: Props) {
  const { map } = props
  const [index, setIndex] = useState(1)

  const onClick = useCallback(
    (e: any) => {
      console.log('Popup onClick', e)
      setIndex(index + 1)
    },
    [index]
  )

  return (
    <>
      <Popup
        map={map}
        lngLat={[115.94696044921875, 28.66739489491524]}
        onClick={onClick}
        closeButton={true}
        closeOnClick={false}
      >
        <h1 style={{ color: '#FFEB3B' }}>MapPopup{index}</h1>
      </Popup>
      <Popup
        map={map}
        lngLat={[115.94215393066406, 28.65880925995925]}
        onClick={onClick}
        closeButton={true}
        closeOnClick={false}
      >
        <h1 style={{ color: '#FFEB3B' }}>MapPopup{index}</h1>
      </Popup>
    </>
  )
}
