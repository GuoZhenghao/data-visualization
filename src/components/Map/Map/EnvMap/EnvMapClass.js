import {cameraFlyType, cameraInfomation, pitchConstant} from '../../../../utils/medicalUtils/medicalBaseUtils';
import GroupScatterLayer from '../../MapLayers/CommonMapLayers/MapBoxLayers/ScatterLayers/EnvScatterLayer';

class EnvMapClass {
    constructor(mapboxgl, map, dispatch) {
        this.mapboxgl = mapboxgl;
        this.map = map;
        this.dispatch = dispatch;

        this.handleMapMarkerClick = this.handleMapMarkerClick.bind(this);
        this.initMap();
    }

    initMap() {
        this.groupScatterLayer = new GroupScatterLayer(this.map);
    }

    setMapLayerData(data) {
        this.groupScatterLayer.removeMapLay();
        this.groupScatterLayer.addMapLay(data, "red", 7);
        this.map.on('click', 'pointMap', this.handleMapMarkerClick);
    }

    handleMapMarkerClick(e) {
        let currentThis = this;
        currentThis.dispatch({type: 'envModel/getValuesReducer', payload: JSON.parse(e.features[0].properties.content)})
        currentThis.dispatch({type: 'envModel/getChartsData'})

    }

}

export default EnvMapClass;
