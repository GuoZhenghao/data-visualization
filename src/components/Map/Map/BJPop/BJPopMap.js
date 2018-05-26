/* global window,document */
import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';
import HistogramDeckGLLayer from '../../MapLayers/CommonMapLayers/DeckGLLayers/CubeLayers/HistogramDeckGLLayer';

import {csv as requestCsv} from 'd3-request';
import {connect} from "dva";
import mapStyle from '../../../../utils/mapStyle'

// Set your mapbox token here
const MAPBOX_TOKEN = 'pk.eyJ1IjoibGl1eGluZ2RvbmciLCJhIjoiY2o3YWZpbXRhMGJkazJxbnpyMmtuaG8zcyJ9.aETxR-kkDby57dNqp_TvNw'; // eslint-disable-line

// Source data CSV
const DATA_URL =
    'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv'; // eslint-disable-line

class BJPopMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                ...HistogramDeckGLLayer.defaultViewport,
                width: 500,
                height: 500
            },
            data: null
        };

    }

    componentWillMount() {
        this.props.dispatch({type: 'bjPopMapModel/getMapLayerData'})
    }

    componentDidMount() {
        window.addEventListener('resize', this._resize.bind(this));
        this._resize();
    }

    _resize() {
        this._onViewportChange({
            width: window.innerWidth,
            height: window.innerHeight
        });
    }

    _onViewportChange(viewport) {
        this.setState({
            viewport: {...this.state.viewport, ...viewport}
        });
        this.removeMissingdivCss();
    }

    removeMissingdivCss = () => {
        const missingdiv = document.querySelector(".mapboxgl-missing-css");
        const mapboxglcontrolcontainer = document.querySelector(".mapboxgl-control-container");
        if (mapboxglcontrolcontainer)
            mapboxglcontrolcontainer.style.width = "none";
        if (missingdiv)
            missingdiv.style.display = "none";
    }

    render() {
        const {viewport} = this.state;

        return (
            <MapGL
                {...viewport}
                mapStyle={mapStyle.chinablue}
                onViewportChange={this._onViewportChange.bind(this)}
                mapboxApiAccessToken={MAPBOX_TOKEN}
            >
                <HistogramDeckGLLayer viewport={viewport} data={this.props.model.data || []}/>
            </MapGL>
        );
    }
}

function mapStateToProps(state) {
    return {
        model: state.bjPopMapModel,
    }
}

export default connect(mapStateToProps)(BJPopMap);
