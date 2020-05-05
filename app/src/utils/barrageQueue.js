/**
 * 构建一个弹幕显示队列，每次有新弹幕时进入队列
 * 将屏幕从上到下划分N个（根据屏幕大小，每个弹幕高度，弹幕数量动态调整）区域
 * 每个弹幕从上到下开始选择一条轨道进行，当该轨道上存在其他弹幕没有走完时，查询下一个轨道
 */
import _ from 'lodash';
// 弹幕高度，暂定 40px
const BARRAGE_HEIGHT = 40;

class BarrageQueue {
  constructor(el, options = {}) {
    this.el = el;
    this.colorful = options.colorful;
    // 初始化数据
    this.init();
  }

  init() {
    // 当前屏幕宽度
    this.elWidth = this.el.clientWidth;
    // 当前弹幕集合
    this.tasks = this.tasks || [];
    // 当前高度
    this.elHeight = this.el.clientHeight;
    // 轨道数目
    this.orbitNumber = Math.floor(this.elHeight / BARRAGE_HEIGHT);
    // 轨道数据
    this.orbits = [];
    for (let i = 0; i < this.orbitNumber; i++) {
      this.orbits.push({
        y: i * BARRAGE_HEIGHT,
        free: true
      });
    }
  }

  setColorful(value) {
    this.colorful = value;
  }

  // 添加弹幕
  add(o) {
    const barrage = Object.assign(o, { duration: _.random(3000, 5000) });

    this.tasks.push(barrage);
    this.run();
  }

  run() {
    const find = this.orbits.find(({ free }) => free);
    if (find && this.tasks.length) {
      find.free = false;
      const task = this.tasks.shift();
      const width = task.content.length * 24 + 20;
      let dom = document.createElement('div');
      dom.className = 'barrage';
      dom.innerText = task.content;
      dom.style.top = `${find.y}px`;
      dom.style.width = `${width}px`;
      if (this.colorful) {
        if (!['#000', '#000000'].includes(task.color)) {
          dom.style.color = task.color;
        }
      }
      const duration = 10000 + (2 * task.duration);
      dom.style.animation = `run ${duration}ms linear`;
      dom.addEventListener('animationend', () => {
        // eslint-disable-next-line no-unused-vars
        let removed = this.el.removeChild(dom);
        dom = null;
        removed = null;
      });
      this.el.appendChild(dom);
      setTimeout(() => {
        find.free = true;
        this.run();
      }, task.duration);
    }
  }
}

export default BarrageQueue;
