import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';

const preCls = 'home';

class BarrageBox extends Component {
  constructor(props) {
    super(props);
    this.el = createRef();
  }

  componentDidMount() {
    const node = this.el.current;
    node.scrollTop = node.scrollHeight;
  }

  componentDidUpdate() {
    const node = this.el.current;
    // 判断当前滚动条是否在最下面, 在最下面，则一直在最下面
    if ((node.scrollHeight - node.scrollTop - node.clientHeight) < 50) {
      node.scrollTop = node.scrollHeight;
    }
  }

  render() {
    const { barrageList } = this.props;
    return (
      <div
        ref={this.el}
        className={`${preCls}-barrage`}
      >
        {
          barrageList.map((item) => (
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
          ))
        }
      </div>
    );
  }
}

export default connect(
  (state) => ({ barrageList: state.barrage })
)(BarrageBox);
