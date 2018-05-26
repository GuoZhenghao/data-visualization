import {cameraFlyType, cameraInfomation, pitchConstant} from '../../../../utils/medicalUtils/medicalBaseUtils';
import HeatLayer from '../../MapLayers/CommonMapLayers/MapBoxLayers/HeatLayer';
import * as d3 from 'd3';

class MedicalBaseMapClass {
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

export default MedicalBaseMapClass;
