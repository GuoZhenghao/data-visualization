import {message} from 'antd'

class GroupScatterLayer {
    constructor(map, dispatch) {
        this.map = map;
        this.dispatch = dispatch;
    }

    MapLayData(id, data, color, radius) {
        // console.log("hhhhhhhhh",data);
        if (!color) {
            color = "red";
        }
        if (!radius) {
            radius = 3;
        }
        let obj = {
            "id": id,
            "type": "circle",
            "source": {
                "type": "geojson",
                "data": this.dataState(data, color)
            },
            "paint": {
                'circle-radius': radius,
                'circle-color': {
                    'type': 'identity',
                    'property': 'color'
                },
                'circle-opacity': {
                    'type': 'identity',
                    'property': 'opacity'
                },
            },

        }
        return obj;
    }

    dataState(data, color) {
        // console.log("dddddddddddddddddd",data);
        if (!data.data.result) {
            // console.log(data.data.error, '图层错误原因');
            message.error(data.data.error);
            return;
        }
        data = data.data.data
        let obj = {
            "type": "FeatureCollection",
            "features": []
        }
        if (data[0].content.length != data[1].content.length) {
            message.error('数据初始化错误，请及时检查或者联系客服！')
            return obj;
        }
        let endarr = [
            []
        ];

        let endarrValues = [
            []
        ];

        let valContent = [
            []
        ];


        //获取坐标值 lon lat
        let lons = [];
        let lats = [];
        let values = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].alias == "" || data[i].alias == "null") {
                message.error("坐标别名为空，请确认上传是否正确");
                return;
            }
            if (data[i].alias == "lon") {
                lons = data[i].content;
            }
            if (data[i].alias == "lat") {
                lats = data[i].content;
            }
            if (data[i].alias == "value") {
                values = data[i].content;
            }
        }
        let val = 0;
        for (let i in data[0].content) {
            // if (lons[i] == "") {
            //   lons[i] = 0;
            // }
            // if (lats[i] == "") {
            //   lats[i] = 0;
            // }
            valContent[0].push(values[i])
            endarr[0].push([lons[i], lats[i]])

            if (values[i].aqi <= 50) {
                val = "green";
                endarrValues[0].push(val);
            }
            if (values[i].aqi > 50 && values[i].aqi <= 100) {
                val = "yellow";
                endarrValues[0].push(val);
            }
            if (values[i].aqi > 100 && values[i].aqi <= 200) {
                val = "orange";
                endarrValues[0].push(val);
            }
            if (values[i].aqi > 200 && values[i].aqi <= 300) {
                val = "Red";
                endarrValues[0].push(val);
            }
            if (values[i].aqi > 300) {
                val = "DarkRed";
                endarrValues[0].push(val);
            }
        }
        console.log("vvvvvvvvvvv", endarrValues[0]);

        // const color = ['Orange', 'Red', 'Yellow', 'LightGreen', 'Gray']
        for (let i in endarr[0]) {

            let pointArray = {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    //数据
                    'coordinates': endarr[0][i]
                },
                "properties": {
                    "color": endarrValues[0][i],
                    "opacity": 0.7,
                    "content": valContent[0][i],
                }
            }

            obj.features.push(pointArray)
        }

        return obj;
    }

    addMapLay(data, color, radius) {
        if (!this.map.getLayer('pointMap')) {
            this.map.addLayer(this.MapLayData('pointMap', data, color, radius));
        }
    }

    removeMapLay() {
        if (this.map.getLayer('pointMap')) {
            this.map.removeLayer('pointMap');
            this.map.removeSource('pointMap');
        }
    }
}

export default GroupScatterLayer;
