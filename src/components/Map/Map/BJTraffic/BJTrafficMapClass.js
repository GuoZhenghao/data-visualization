import {cameraFlyType, cameraInfomation, pitchConstant} from '../../../../utils/medicalUtils/medicalBaseUtils';
import SizeScatterLayer from '../../MapLayers/CommonMapLayers/MapBoxLayers/ScatterLayers/BTSScatterLayer';
import BTSHeatLayer from '../../MapLayers/CommonMapLayers/MapBoxLayers/BTSHeatLayer';

class BJTrafficMapClass {
    constructor(mapboxgl, map, dispatch) {
        this.mapboxgl = mapboxgl;
        this.map = map;
        this.dispatch = dispatch;
        this.handleMapMarkerClick = this.handleMapMarkerClick.bind(this);

        this.initMap();
    }

    initMap() {
        this.sizeScatterLayer = new SizeScatterLayer(this.map);
        // this.btsHeatLayer = new BTSHeatLayer(this.map);

    }

    setMapLayerData(data) {
        this.sizeScatterLayer.removeMapLay();
        this.sizeScatterLayer.addMapLay(data, "red", 10);
        this.map.on('click', 'pointMap', this.handleMapMarkerClick);
        this.map.flyTo({
            center: cameraInfomation.CENTER,
            zoom: 10,
            bearing: cameraInfomation.BEARING,
            curve: cameraInfomation.CURVE,
            pitch: cameraInfomation.PITCH,
            easing(t) {
                return t;
            }
        });
    }

    handleMapMarkerClick(e) {
        let currentThis = this;
        currentThis.dispatch({type: 'bjModel/getSelectTypeReducer', payload: e.features[0].properties.content})
        currentThis.dispatch({type: 'bjModel/getBottomChartsData'})
    }
}

export default BJTrafficMapClass;
