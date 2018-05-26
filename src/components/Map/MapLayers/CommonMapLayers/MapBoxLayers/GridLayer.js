class GridLayer {
    constructor(map, dispatch) {
        this.map = map;
        this.map.dispatch = dispatch;
        this.dispatch = dispatch;
        this.data = null;
        this.map.transxy = function (lng, lat, zoom) {
            let gridxy = [];
            let pow = Math.pow(2, zoom);
            gridxy[0] = parseInt((180 + lng) * pow) / 360;
            let phi = Math.PI * lat / 180;
            let res = 0.5 * Math.log((1 + Math.sin(phi)) / (1 - Math.sin(phi)));
            gridxy[1] = parseInt(((1 - res / Math.PI) / 2) * pow);
            return gridxy[0] + "-" + gridxy[1];
        };
    }

    MapLayData(data) {
        this.data = data;
        data = data.data.result.dataset;
        var endarr = [[], [], [], [], []];
        for (var key in data) {
            for (var j in data[key].data) {
                if (data[key].data[j] == 2) {
                    endarr[0].push(this.toLonLat(j))
                }
                if (data[key].data[j] == 4) {
                    endarr[1].push(this.toLonLat(j))
                }
                if (data[key].data[j] == 6) {
                    endarr[2].push(this.toLonLat(j))
                }
                if (data[key].data[j] == 8) {
                    endarr[3].push(this.toLonLat(j))
                }
                if (data[key].data[j] == 10) {
                    endarr[4].push(this.toLonLat(j))
                }
            }
        }
        const color = ['Red', 'Orange', 'Yellow', 'LightGreen', 'Gray']
        let obj = {
            "type": "FeatureCollection",
            "features": []
        }
        for (let i in endarr) {
            let features = {
                'type': 'Feature',
                'properties': {
                    'color': color[i]
                },
                'geometry': {
                    'type': 'MultiPolygon',
                    //数据
                    'coordinates': endarr[i]
                }
            }
            obj.features.push(features)
        }
        return obj;
    }

    toLonLat(lonLat) {
        var arr = [];
        var arrend = [];
        var zoom = 18;
        var lon = lonLat.split("-")[0];
        lon = parseFloat(lon);
        var lat = lonLat.split("-")[1];
        lat = parseFloat(lat)
        var lon_min = lon / Math.pow(2, zoom) * 360 - 180;
        var lon_max = (lon + 1) / Math.pow(2, zoom) * 360 - 180;
        var lat_min = Math.atan(Math.sinh(Math.PI * (1 - ((lat - 1) / Math.pow(2, zoom - 1))))) * 180 / Math.PI;
        var lat_max = Math.atan(Math.sinh(Math.PI * (1 - (lat / Math.pow(2, zoom - 1))))) * 180 / Math.PI;
        arr.push([lon_min, lat_min])
        arr.push([lon_min, lat_max])
        arr.push([lon_max, lat_max])
        arr.push([lon_max, lat_min])
        arr.push([lon_min, lat_min])
        arrend.push(arr)
        console.log(arrend, 'arrend');
        return arrend
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
        console.log(this)
        if (!this.map.getLayer('honeycomb')) {
            this.map.addLayer(option);
            this.eventBaind();
        }
    }

    removeMapLay() {
        if (this.map.getLayer('honeycomb')) {
            this.map.removeLayer('honeycomb');
            this.map.removeSource('honeycomb');
            this.eventBaindClear();
        }
    }

    eventBaind(data) {
        this.map.on('click', this.callbackFun);
    }

    eventBaindClear() {
        this.map.off('click', this.callbackFun);
    }

    callbackFun(e) {
        let num = this.transxy(e.lngLat.lng, e.lngLat.lat, parseInt(e.target.getZoom()))
        this.dispatch({
            type: 'mapController/getDridLayer',
            payload: 'http://47.92.6.177/datafusion/v1/dfqueryoddata/ojo/beijing/102/' + num + '?timeGranularity=M&amp'
        })
    }
}

export default GridLayer;
