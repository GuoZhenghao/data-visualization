import raeMarkerImage from '../../../../../assets/bike/rae_marker.png';

class RealTimeLayer {
    constructor(mapboxgl, map, dispatch) {
        this.mapboxgl = mapboxgl;
        this.map = map;
        this.dispatch = dispatch;

        this.arrayData = [];
        this.mapN = new Map();
        // console.log("kkkkkkkkkkkkkk",mapN.length);
        this.mapTrackData1 = new Map();
        this.mapTrackData2 = new Map();
        this.mapTrackData3 = new Map();
        this.mapTrackData4 = new Map();
        this.mapTrackData5 = new Map();

        this.mapTrackAll = new Map();
        this.n = 0;
    }

    initSocket() {
        let currentThis = this;
        if ("WebSocket" in window) {
            // console.log("您的浏览器支持 WebSocket!");
            // 打开一个 web socket
            this.socket = new WebSocket("ws://223.223.200.50:9009/datavisualization/v1/bike/old/subscribe?chan=tracks_ggg");
            // console.log("ssssseeeeeee111",this.socket);
            this.socket.onopen = function () {
                // Web Socket 已连接上，使用 send() 方法发送数据
                currentThis.socket.send("发送数据");
                // console.log("数据发送中...");
            };

            this.socket.onmessage = function (evt) {
                // console.log(" 发送数据...",evt);
                currentThis.receiveData(evt);
                // console.log("ssssseeeeeee111",currentThis.socket.readyState);
                // currentThis.socket.close();
                // console.log("ssssseeeeeee222",currentThis.socket.readyState);

            }
            this.socket.onclose = function () {
                // 关闭 websocket
                // console.log("连接已关闭...");
            };
        } else {
            // 浏览器不支持 WebSocket
            // console.log("您的浏览器不支持 WebSocket!");
        }

    }

    receiveData(evt) {
        let currentThis = this;
        let received_msg = evt.data;
        let mapBounds = this.map.getBounds();
        let leftTop = [mapBounds._sw.lng, mapBounds._ne.lat];
        let rightTop = [mapBounds._ne.lng, mapBounds._ne.lat];
        let rightBottom = [mapBounds._ne.lng, mapBounds._sw.lat];
        let leftBottom = [mapBounds._sw.lng, mapBounds._sw.lat];

        this.arrayData = [];
        // console.log("数据已接收...",received_msg);
        let arrayStrings = received_msg.split("{");
        for (let i in arrayStrings) {
            if (arrayStrings.hasOwnProperty(i)) {
                if (i > 0) {
                    let userString = "{" + arrayStrings[i];
                    // console.log("timeout",userString);

                    let userJSONData = JSON.parse(userString);
                    if (userJSONData.lag[0] < mapBounds._sw.lng || userJSONData.lag[0] > mapBounds._ne.lng || userJSONData.lag[1] < mapBounds._sw.lat || userJSONData.lag[1] > mapBounds._ne.lat) {
                        // return false;
                    } else {
                        this.arrayData.push(userJSONData);
                    }
                }
            }
        }

        for (let k in this.arrayData) {
            if (this.mapN.has(this.arrayData[k].bikeId)) {


                // console.log("数据已接收...",arrayData[k].bikeId);

                this.mapN.delete(this.arrayData[k].bikeId);
                this.mapN.set(this.arrayData[k].bikeId, this.arrayData[k])

            } else {
                // console.log("xxxxxxxxxxx222");
                this.mapN.set(this.arrayData[k].bikeId, this.arrayData[k])
            }

        }

        for (let data of this.mapN.values()) {
            if (data.lag[0] < mapBounds._sw.lng || data.lag[0] > mapBounds._ne.lng || data.lag[1] < mapBounds._sw.lat || data.lag[1] > mapBounds._ne.lat) {
                // return false;
                this.mapN.delete(data.bikeId);
            } else {
            }
        }

        currentThis.updateMarkerData(this.mapN);


    }

    /**
     * 新建一个图层资源
     * @param id    图层id号
     */
    addMarkerSource() {
        this.map.addSource('dataSource', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'Point',
                            coordinates: [0, 0]
                        }
                    }
                ]
            }
        });
    }

    /**
     * 需要添加的图片
     * @param imageName     String 图片名称
     * @param imageUrl      图片路径
     */
    addMapMarkerImage(imageName, imageUrl) {
        const obj = this;
        if (imageUrl && imageName) {
            this.map.loadImage(imageUrl, (error, image) => {
                if (error)
                    throw error;
                obj.map.addImage(imageName, image);
            });
        }
    }

    /**
     *先创建一个空图层
     */
    createMarkerData() {
        let geojson = {
            type: 'FeatureCollection',
            features: []
        };
        this.addMapMarkerImage('markerIcon', raeMarkerImage);
        this.addMarkerSource();

        let layerData = {
            id: 'markerLayer',
            type: 'symbol',
            source: 'dataSource',
            layout: {
                'icon-image': 'markerIcon',
                'icon-size': 1.2,
                'icon-allow-overlap': true,
                "icon-rotate": {
                    'type': 'identity',
                    'property': "rotatezz"
                }
            }
        };

        // console.log("geojson",geojson);
        this.map.getSource('dataSource').setData(geojson);
        this.map.on('click', 'markerLayer', this.handleMapMarkerClick);
        this.map.addLayer(layerData);

    }

    /**
     *更新数据源
     */
    updateMarkerData(arrayData) {
        let geojson = {
            type: 'FeatureCollection',
            features: []
        };
        for (let data of arrayData.values()) {
            // console.log("data",data.lag);
            let markerData = {
                "type": "Feature",
                "properties": {
                    "data": data,
                    "message": "xxxxx",
                    "iconSize": [
                        40, 40
                    ],
                    "coordinates": data.lag,
                    "bikeId": data.bikeId,
                    "rotatezz": data.azimuth
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": data.lag
                }
            }
            geojson.features.push(markerData);

            if (data.bikeId == this.selectMarkerBikeId) {
                // console.log("ssssssssssssss");
                this.selectMarkerState(data)
                this.initPopup(data)
            }
        }
        this.map.getSource('dataSource').setData(geojson);
    }

    closeSocket() {
        this.socket.close();
    }

}

export default RealTimeLayer;
