import React, {Component} from 'react';
import DeckGL, {GridLayer} from 'deck.gl';

/**
 * 动态人口地图柱状图显示
 */
const LIGHT_SETTINGS = {
    lightsPosition: [
        -0.144528,
        49.739968,
        8000,
        -3.807751,
        54.104682,
        8000
    ],
    ambientRatio: 0.4,
    diffuseRatio: 0.6,
    specularRatio: 0.2,
    lightsStrength: [
        0.8, 0.0, 0.8, 0.0
    ],
    numberOfLights: 2
};

const colorRange = [
    [118, 4, 60],
    [255, 0, 0],
    [255, 120, 0],
    [255, 255, 0],
    [36, 255, 0],
    [3, 142, 62],
].reverse();

const elevationScale = {min: 1, max: 50};

const defaultProps = {
    radius: 1,
    upperPercentile: 100,
    coverage: 1,
};

export default class HistogramDeckGLLayer extends Component {

    static get defaultColorRange() {
        return colorRange;
    }

    static get defaultViewport() {
        return {
            longitude: 116.29,
            latitude: 40.16,
            zoom: 7.82,
            pitch: 45,
            // radius: 2,
            bearing: 45
        };
    }

    constructor(props) {
        super(props);
        this.startAnimationTimer = null;
        this.intervalTimer = null;
        this.state = {
            elevationScale: elevationScale.min
        };

        this._startAnimate = this._startAnimate.bind(this);
        this._animateHeight = this._animateHeight.bind(this);
    }

    componentDidMount() {
        this._animate();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.length !== this.props.data.length) {
            this._animate();
        }
    }

    componentWillUnmount() {
        this._stopAnimate();
    }

    _animate() {
        this._stopAnimate();

        // wait 1.5 secs to start animation so that all data are loaded
        this.startAnimationTimer = window.setTimeout(this._startAnimate, 1500);
    }

    _startAnimate() {
        this.intervalTimer = window.setInterval(this._animateHeight, 20);
    }

    _stopAnimate() {
        window.clearTimeout(this.startAnimationTimer);
        window.clearTimeout(this.intervalTimer);
    }

    _animateHeight() {
        if (this.state.elevationScale === elevationScale.max) {
            this._stopAnimate();
        } else {
            this.setState({
                elevationScale: this.state.elevationScale + 1
            });
        }
    }

    _initialize(gl) {
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
    }


    render() {
        const {
            viewport,
            data,
            radius,
            coverage,
            elevationScale,
            histogramColor,
            upperPercentile
        } = this.props;
        if (!data) {
            return null;
        }
        const layers = [new GridLayer({
            id: 'grid-layer', //  Canvas ID允许CSS中的样式定制。
            colorRange,
            coverage,
            data: data,
            elevationRange: [
                0, 200
            ],
            elevationScale: this.state.elevationScale,
            extruded: true,
            getPosition: d => d,
            lightSettings: LIGHT_SETTINGS,
            onHover: this.props.onHover,
            opacity: 0.8,
            pickable: Boolean(this.props.onHover),
            upperPercentile,
            radius,
        })];
        return <DeckGL {...viewport} layers={layers} onWebGLInitialized={this._initialize}/>;
    }
}
HistogramDeckGLLayer.displayName = 'HistogramDeckGLLayer';
HistogramDeckGLLayer.defaultProps = defaultProps;
