import React, { Component } from 'react';
import { ipcRenderer, remote } from 'electron';

import BarrageQueue from '../../utils/barrageQueue';
import './index.scss';
import { DISPLAY_WINDOW_RECEIVE } from '../../utils/constant';

const { getGlobal } = remote;
const preCls = 'display-page';

class Display extends Component {
  constructor(props) {
    super(props);
    const { position, colorful = false } = getGlobal('barrageConfigure');
    this.state = {
      height: position === 'full' ? 100 : 50,
      colorful
    };
  }

  componentDidMount() {
    const { colorful } = this.state;
    this.barrageQueue = new BarrageQueue(this.el, { colorful });
    ipcRenderer.on(DISPLAY_WINDOW_RECEIVE, ((e, { name, value }) => {
      if (name === 'position') {
        this.setState({
          height: value === 'full' ? 100 : 50
        });
        this.barrageQueue.init();
      }
      if (name === 'colorful') {
        this.barrageQueue.setColorful(value);
      }
      if (name === 'addBarrage') {
        this.barrageQueue.add(value);
      }
    }));
  }

  render() {
    const { height } = this.state;
    return (
      <div
        style={{ height: `${height}%` }}
        className={preCls}
        ref={(el) => { this.el = el; }}
      />
    );
  }
}

export default Display;
