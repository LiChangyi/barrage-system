import React from 'react';
import _ from 'lodash';
import { Input, Button } from 'antd';
import dayjs from 'dayjs';

import './index.scss';
import { openConnect, closeConnect, sendBarrage } from '../../api/socket';

const preCls = 'room';

const checkVisible = (elm) => {
  const rect = elm.getBoundingClientRect();
  const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
};


class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      list: []
    };
    this.flag = null;
  }

  componentDidMount() {
    this.id = _.get(this, 'props.match.params.id', '');

    this.socket = openConnect(this.id);
    this.socket.on('receiveBarrage', this.handleReceive.bind(this));
  }

  componentDidUpdate() {
    if (this.flag) {
      const flag = checkVisible(this.flag);
      if (flag) {
        this.flag.scrollIntoView();
      }
    }
  }

  componentWillUnmount() {
    closeConnect();
  }

  handleReceive(data) {
    const { list } = this.state;
    const tempList = [...list, data];
    let index = 0;
    if (tempList.length > 100) {
      index = tempList.length - 100;
    }
    this.setState({
      list: tempList.slice(index)
    });
  }

  handleSend() {
    const { content } = this.state;
    if (!_.trim(content).length) {
      return;
    }
    const barrage = {
      content: _.trim(content),
      color: '#000'
    };
    sendBarrage(barrage);
    this.setState({
      content: ''
    });
  }

  // eslint-disable-next-line class-methods-use-this
  handleFocus(node) {
    node.scrollIntoView();
  }

  render() {
    const { content, list } = this.state;
    return (
      <div className={preCls}>
        <div className={`${preCls}-barrage`}>
          {list.map((item) => {
            return (
              <div key={item._id} className={`${preCls}-barrage-item`}>
                <span className={`${preCls}-barrage-item-time`}>
                  {dayjs(item.createAt).format('HH:mm:ss')}
                </span>
                <span className={`${preCls}-barrage-item-username`}>
                  {item.nickname}
                  :
                </span>
                <span className={`${preCls}-barrage-item-content`} style={{ color: item.color }}>{item.content}</span>
              </div>
            );
          })}
          <div ref={(ref) => { this.flag = ref; }} />
        </div>
        <div className={`${preCls}-input-box`}>
          <Input
            value={content}
            onFocus={(e) => this.handleFocus(e.target)}
            onChange={(e) => this.setState({ content: e.target.value })}
            onPressEnter={() => this.handleSend()}
          />
          <Button onClick={() => this.handleSend()} type="primary">发送</Button>
        </div>
      </div>
    );
  }
}

export default Room;
