import React, { Component } from 'react';

import BarrageQueue from '../../utils/barrageQueue';
import data from './data';
import './index.scss';

const preCls = 'display-page';

class Display extends Component {
  componentDidMount() {
    this.barrageQueue = new BarrageQueue(this.el);
    data.forEach((o) => {
      this.barrageQueue.add(o);
    });
  }

  render() {
    return (
      <div className={preCls} ref={(el) => { this.el = el; }} />
    );
  }
}

export default Display;
