import { IProjectedLayerProps } from './projected-layer';
declare type IOwnPopupProps = Omit<IProjectedLayerProps, 'type'>;
export interface IPopupProps extends IOwnPopupProps {
    maxWidth?: string;
    closeButton?: boolean;
    closeOnClick?: boolean;
    onClose?: () => void;
}
export declare const defaultClassName = "mapboxgl-popup";
export declare const Popup: (props: IPopupProps) => JSX.Element;
declare const _default: (props: IPopupProps) => JSX.Element;
export default _default;
