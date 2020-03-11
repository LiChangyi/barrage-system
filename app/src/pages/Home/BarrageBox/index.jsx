import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { ExclamationCircleFilled } from '@ant-design/icons';

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
    const { open, barrageList } = this.props;
    const className = open ? `${preCls}-barrage` : `${preCls}-barrage ${preCls}-no-open`;
    return (
      <div
        ref={this.el}
        className={className}
      >
        {open ? (
          barrageList.map((item) => (
            <div key={item.id} className={`${preCls}-barrage-item`}>
              <span className={`${preCls}-barrage-item-username`}>
                {item.nickname}
                :
              </span>
              <span className={`${preCls}-barrage-item-content`}>{item.content}</span>
            </div>
          ))
        ) : (
          <div className={`${preCls}-no-open-wrap`}>
            <ExclamationCircleFilled />
            <span className={`${preCls}-no-open-message`}>
              弹幕开关未打开
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  (state) => ({ barrageList: state.barrage })
)(BarrageBox);
