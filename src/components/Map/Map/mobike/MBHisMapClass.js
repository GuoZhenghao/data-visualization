import {cameraFlyType, cameraInfomation, pitchConstant} from '../../../../utils/medicalUtils/medicalBaseUtils';
import SizeScatterLayer from '../../MapLayers/CommonMapLayers/MapBoxLayers/ScatterLayers/MBSizeScatterLayer';
import BTSHeatLayer from '../../MapLayers/CommonMapLayers/MapBoxLayers/BTSHeatLayer';

import RealTimeLayer from '../../MapLayers/CommonMapLayers/MapBoxLayers/RealTimeLayer';

import blackMap from '../../../../utils/mapStyle'

class MBHisMapClass {
    constructor(mapboxgl, map, dispatch) {
        this.mapboxgl = mapboxgl;
        this.map = map;
        this.dispatch = dispatch;
        this.initMap();
    }


    initMap() {
        this.sizeScatterLayer = new SizeScatterLayer(this.map);
        this.map.setStyle(blackMap.chinablack);

        this.realTimeLayer = new RealTimeLayer(this.mapboxgl, this.map, this.dispatch);

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
                    curve: 1,
                    pitch: cameraInfomation.PITCH,
                    easing(t) {
                        return t;
                    }
                });

                break;
            case "pop":
                this.realTimeLayer.initSocket();
                this.realTimeLayer.createMarkerData();
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

    closeSecket() {
        this.realTimeLayer.closeSocket();
    }

}

export default MBHisMapClass;
