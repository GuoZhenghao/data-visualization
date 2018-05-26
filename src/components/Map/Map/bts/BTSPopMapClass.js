import GroupScatterLayer from '../../MapLayers/CommonMapLayers/MapBoxLayers/ScatterLayers/GroupScatterLayer';

class BTSPopMapClass {
    constructor(mapboxgl, map, dispatch) {
        this.mapboxgl = mapboxgl;
        this.map = map;
        this.dispatch = dispatch;
        this.initMap();
    }

    initMap() {
        this.groupScatterLayer = new GroupScatterLayer(this.map);
    }

    setMapLayerData(data) {
        this.groupScatterLayer.removeMapLay();
        this.groupScatterLayer.addMapLay(data, "red", 10);
    }

}

export default BTSPopMapClass;
