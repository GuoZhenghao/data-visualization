// MedicalIndexMapClass
import {cameraFlyType, cameraInfomation, pitchConstant} from '../../../../utils/medicalUtils/medicalBaseUtils';
import HeatLayer from '../../MapLayers/CommonMapLayers/MapBoxLayers/HeatLayer';

class MedicalIndexMapClass {
    constructor(mapboxgl, map, dispatch) {
        this.mapboxgl = mapboxgl;
        this.map = map;
        this.dispatch = dispatch;
        this.initMap();
    }

    initMap() {
        this.heatLayer = new HeatLayer(this.map);
    }

    setMapLayerData(data) {
        let colorTable = ['blue', 'green', 'yellow', 'orange', 'red'];

        this.heatLayer.removeMapLay();
        this.heatLayer.addMapLay(data, colorTable);
    }

}

export default MedicalIndexMapClass;
