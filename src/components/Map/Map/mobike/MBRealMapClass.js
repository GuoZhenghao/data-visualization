import {cameraFlyType, cameraInfomation, pitchConstant} from '../../../../utils/medicalUtils/medicalBaseUtils';
import GroupScatterLayer from '../../MapLayers/CommonMapLayers/MapBoxLayers/ScatterLayers/EnvScatterLayer';
import * as d3 from 'd3';

class MBRealMapClass {
    constructor(mapboxgl, map, dispatch) {
        this.mapboxgl = mapboxgl;
        this.map = map;
        this.dispatch = dispatch;
        this.initMap();
    }

    initMap() {
        this.groupScatterLayer = new GroupScatterLayer(this.map);
    }

    setMapLayerData(data, type) {

        switch (type) {
            case "env":
                this.sizeScatterLayer.removeMapLay();
                this.sizeScatterLayer.addMapLay(data, "red", 10);

                this.map.flyTo({
                    center: cameraInfomation.CENTER,
                    zoom: 12,
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
                    center: cameraInfomation.CENTER,
                    zoom: 12,
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

export default MBRealMapClass;
