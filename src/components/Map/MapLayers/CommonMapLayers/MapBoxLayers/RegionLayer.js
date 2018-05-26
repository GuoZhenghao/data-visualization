class RegionLayer {
    constructor(map) {
        this.map = map;
    }

    addMapLay(data) {
        let option = {
            'id': 'RegionLayer',
            'type': 'fill',
            'source': {
                "type": "geojson",
                "data": data
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
        if (this.map.getLayer('RegionLayer')) {
            this.map.removeLayer('RegionLayer');
            this.map.removeSource('RegionLayer');
        }
    }
}

export default RegionLayer;
