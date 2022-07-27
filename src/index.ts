import setMapStyleFn from './utils/style';
import usePointClusters from './utils/usePointClusters';
import Map from './components/map';
import Image from './components/image';
import Marker from './components/marker';
import Popup from './components/popup';
import Layer from './components/layer';
import { MapContext, withMap } from './components/context';

export { withMap, MapContext, Image, Marker, Popup, Layer, setMapStyleFn, usePointClusters };

export default Map;