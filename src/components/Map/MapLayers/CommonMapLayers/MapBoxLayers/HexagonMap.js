//import citygrid from '../../../../../../public/mapbox/SimulationInformation/honeycomb.json';
class HexagonMap {
    constructor(map) {
        this.map = map;
    }

    MapLayData(data) {
        const color = ['Red', 'Orange', 'Yellow', 'LightGreen', 'Gray']
        let obj = {
            "type": "FeatureCollection",
            "features": []
        }
        for (let i in data) {
            let features = {
                'type': 'Feature',
                'properties': {
                    'color': color[i]
                },
                'geometry': {
                    'type': 'MultiPolygon',
                    //数据
                    'coordinates': data[i]
                }
            }
            obj.features.push(features)
        }
        return obj;
    }

    addMapLay(data) {
        let option = {
            'id': 'honeycomb',
            'type': 'fill',
            'source': {
                "type": "geojson",
                "data": this.MapLayData(data)
            },
            'layout': {},
            'paint': {
                'fill-color': {
                    'type': 'identity',
                    'property': 'color'
                },
                'fill-opacity': 0.6
            }
        }
        this.map.addLayer(option);
    }

    removeMapLay() {
        if (this.map.getLayer('honeycomb')) {
            this.map.removeLayer('honeycomb');
            this.map.removeSource('honeycomb');
        }
    }
}

export default HexagonMap;
