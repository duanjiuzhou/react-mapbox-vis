import React, { useState, useCallback } from 'react'

import Map, { setMapStyleFn } from 'react-mapbox-vis'
import Symbol from './components/Symbol'
import Fill from './components/Fill'
import Line from './components/Line'
import Marker from './components/Marker'
import Popup from './components/Popup'
import Circle from './components/Circle'

import styled from 'styled-components'
import { mapServiceConfig } from './constants'

enum LayerType {
  'Symbol' = 'Symbol',
  'Fill' = 'Fill',
  'Line' = 'Line',
  'Marker' = 'Marker',
  'Popup' = 'Popup',
  'Circle' = 'Circle',
}

const components = [
  { type: LayerType.Symbol, components: Symbol, checked: true },
  { type: LayerType.Fill, components: Fill, checked: true },
  { type: LayerType.Line, components: Line, checked: true },
  { type: LayerType.Marker, components: Marker, checked: true },
  { type: LayerType.Popup, components: Popup, checked: true },
  { type: LayerType.Circle, components: Circle, checked: true },
]

const setMapStyle = setMapStyleFn(mapServiceConfig.style)

function App() {
  const [layerMap, setLayerMap] = useState(components)
  const [map, setMap] = useState<any>()

  const onChange = useCallback(
    (type: LayerType, e: any) => {
      layerMap.some(item => {
        if (item.type === type) {
          item.checked = e.target.checked
          return true
        }
        return false
      })
      setLayerMap([...layerMap])
    },
    [layerMap]
  )

  const onError = useCallback(e => {
    console.log('error: ', e)
  }, [])

  const onLoad = useCallback(e => {
    console.log('onLoad', e)
    setMap(e)
  }, [])

  return (
    <Wrap>
      <div className="left">
        <button
          onClick={() => {
            map &&
              setMapStyle({
                map,
                style:
                  Math.random() > 0.5
                    ? mapServiceConfig.style
                    : 'mapbox://styles/mapbox/light-v9',
                layersList: ['map-Fill', 'map-Circle'],
                sourcesList: ['map-Fill', 'map-Circle'],
              })
          }}
        >
          样式更新
        </button>
        <h3>layer切换：</h3>
        {layerMap.map((item, index) => (
          <label key={index}>
            <input
              type="checkbox"
              defaultChecked={item.checked}
              onChange={onChange.bind(null, item.type)}
            />
            {item.type}
          </label>
        ))}
      </div>
      <Map
        mapboxOptions={{
          ...mapServiceConfig,
        }}
        className="map"
        onError={onError}
        onLoad={onLoad}
      >
        {layerMap.map((item, index) => {
          const { components: C } = item
          return item.checked && <C key={'layer' + index} />
        })}
      </Map>
    </Wrap>
  )
}

export default App

const Wrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  box-sizing: border-box;
  .left {
    width: 15vw;
    height: 100%;
    padding: 20px;
    background: #02060e;
    border-right: 2px solid #386fba;
    color: #fff;
    user-select: none;
    label {
      display: block;
      padding: 5px 0;
    }
  }
  .map {
    width: 85vw;
    height: 100%;
  }
  /* .popup-class {
    .mapboxgl-popup-tip {
      display: none;
    }
    .mapboxgl-popup-content {
      background-color: rgba(90, 84, 242, 0.04);
      padding: 0;
      .mapboxgl-popup-close-button {
        z-index: 99;
        outline: none;
      }
    }
  }
  .perception-icon-marker-popup-box {
    max-width: inherit !important;
    & > div:first-child {
      display: none;
    }
    & > div:last-child {
      background: none;
      padding: 5px 10px;
    }
  } */
`
