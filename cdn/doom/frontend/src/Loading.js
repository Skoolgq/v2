import React, { Component } from 'react';

import { Line } from 'rc-progress';
import './Loading.css';

export default class Loading extends Component {
    render() {
        return (    
            <div className="Loading">
                <div className="Loading-inner">
                    <Line percent={this.props.percent} strokeWidth="4" strokeColor="red" trailColor="#999999" />
                </div>
            </div> 
        );
    }    
}
