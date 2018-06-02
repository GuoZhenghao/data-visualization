import {message} from 'antd'

class SizeScatterLayer {
    constructor(map, dispatch) {
        this.map = map;
        this.dispatch = dispatch;
    }

    MapLayData(id, data, color, radius) {
        if (!color) {
            color = "red";
        }
        if (!radius) {
            radius = 15;
        }
        let obj = {
            "id": id,
            "type": "circle",
            "source": {
                "type": "geojson",
                "data": this.dataState(data, color, radius)
            },
            "paint": {
                'circle-radius': {
                    'type': 'identity',
                    'property': 'radius'
                },
                'circle-color': color,
                'circle-opacity': 0.6
            }
        }
        return obj;
    }

    dataState(Data, color, radius) {
        if (!Data.data.result) {
            message.error(Data.data.error)
            return;
        }
        let data = JSON.parse(JSON.stringify(Data.data.data))
        let obj = {
            "type": "FeatureCollection",
            "features": []
        }
        if (data[0].content.length != data[1].content.length) {
            message.error('数据初始化错误')
            return obj;
        }
        let endarr = [];
        let radiusArr = [];

        //获取坐标值 lon lat
        let lons = [];
        let lats = [];
        let radiuses = [];

        for (let i = 0; i < data.length; i++) {
            if (data[i].alias == "" || data[i].alias == "null") {
                message.error("坐标别名为空");
                return;
            }
            if (data[i].alias == "lon") {
                lons = data[i].content;
            }
            if (data[i].alias == "lat") {
                lats = data[i].content;
            }
            if (data[i].alias == "value") {
                radiuses = data[i].content;
            }
        }

        if (radiuses == null || radiuses == "" || radiuses == "null") {
            message.warn("大小散点需要设置权重,该条数据没有权重,所以默认值权重为5等半径", 6);
            for (let i in data[0].content) {
                radiuses.push(5)
            }
        }
        let maxRadius = 60;
        let minRadius = 1;
        let maxNum = null;
        for (let i in data[0].content) {
            endarr.push([lons[i], lats[i]]);
            if (radiuses[i] < minRadius) {
                radiuses[i] = Number(radiuses[i]) + minRadius;
            }
            if (radiuses[i] > maxRadius) {
                radiuses[i] = maxRadius;
            }
            radiusArr.push(radiuses[i]);
        }
        maxNum = this.getArrayMax(radiusArr);
        let mutiple = radius / maxNum;

        for (let i in endarr) {
            let features = {
                'type': 'Feature',

                'geometry': {
                    'type': 'Point',
                    //数据
                    'coordinates': endarr[i]
                },
                "properties": {
                    "radius": Number(radiusArr[i]) * mutiple,
                    "content": radiuses[i]
                }
            }
            obj.features.push(features)
        }
        return obj;
    }

    addMapLay(data, color, radius) {
        if (!this.map.getLayer('pointMap')) {
            this.map.addLayer(this.MapLayData('pointMap', data, color, radius));
        }
    }

    getArrayMax = (array) => {
        let max = Number(array[0]);
        let len = array.length;
        for (let i = 1; i < len; i++) {
            if (Number(array[i]) > max) {
                max = Number(array[i]);
            }
        }
        return max;
    }

    removeMapLay() {
        if (this.map.getLayer('pointMap')) {
            this.map.removeLayer('pointMap');
            this.map.removeSource('pointMap');
        }
    }
}

export default SizeScatterLayer;
