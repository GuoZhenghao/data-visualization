import {cameraFlyType, cameraInfomation, pitchConstant} from '../../../../utils/medicalUtils/medicalBaseUtils';
import SizeScatterLayer from '../../MapLayers/CommonMapLayers/MapBoxLayers/ScatterLayers/SizeScatterLayer';
import BTSHeatLayer from '../../MapLayers/CommonMapLayers/MapBoxLayers/BTSHeatLayer';

import * as d3 from 'd3';

class BTSEnvMapClass {
    constructor(mapboxgl, map, dispatch) {
        this.mapboxgl = mapboxgl;
        this.map = map;
        this.dispatch = dispatch;
        this.initMap();
    }

    initMap() {
        this.sizeScatterLayer = new SizeScatterLayer(this.map);
        this.btsHeatLayer = new BTSHeatLayer(this.map);
    }

    setMapLayerData(data, type) {
        switch (type) {
            case "env":
                this.sizeScatterLayer.removeMapLay();
                this.sizeScatterLayer.addMapLay(data, "red", 10);
                this.map.flyTo({
                    center: [116.3561, 39.9239],
                    zoom: 15.14,
                    bearing: cameraInfomation.BEARING,
                    curve: cameraInfomation.CURVE,
                    pitch: cameraInfomation.PITCH,
                    easing(t) {
                        return t;
                    }
                });
                break;
            case "pop":
                let colorTable = ['blue', 'green', 'yellow', 'orange', 'red'];
                this.btsHeatLayer.removeMapLay();
                this.btsHeatLayer.addMapLay(data, colorTable);
                this.map.flyTo({
                    center: [116.3561, 39.9239],
                    zoom: 15.14,
                    bearing: cameraInfomation.BEARING,
                    curve: cameraInfomation.CURVE,
                    pitch: cameraInfomation.PITCH,
                    easing(t) {
                        return t;
                    }
                });
                break;
            default:
        }
    }
}

export default BTSEnvMapClass;
