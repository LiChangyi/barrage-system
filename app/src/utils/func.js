import { remote } from 'electron';

const { getGlobal } = remote;

// 同步数据到全局变量中
export const syncDataToGobal = (data) => {
  Object.keys(data).forEach((key) => {
    getGlobal('barrageConfigure')[key] = data[key];
  });
};

class TrieNode {
  constructor(value) {
    this.value = value;
    this.isEnd = false;
    this.children = [];
    this.fail = null;
    this.deep = 0;
  }

  findChild(value) {
    for (let i = 0, len = this.children.length; i < len; i++) {
      const node = this.children[i];
      if (node.value === value) {
        return node;
      }
    }
    return null;
  }
}
class Trie {
  constructor() {
    this.root = new TrieNode(null);
  }

  insert(str) {
    let node = this.root;
    // eslint-disable-next-line no-restricted-syntax
    for (const c of str) {
      let child = node.findChild(c);
      if (!child) {
        child = new TrieNode(c);
        child.deep = node.deep + 1;
        node.children.push(child);
      }
      node = child;
    }

    if (!node.isEnd) {
      node.isEnd = true;
    }
  }
}
const buildFailPoint = (root) => {
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    for (let i = 0, len = node.children.length; i < len; i++) {
      const child = node.children[i];
      child.fail = (node === root) ? root : (node.fail.findChild(child.value) || root);
      queue.push(child);
    }
  }
};

export const createTrie = (keys) => {
  const trie = new Trie();
  keys.forEach((str) => trie.insert(str));
  buildFailPoint(trie.root);
  return trie;
};

export const matchStr = (trie, str) => {
  let node = trie.root;
  const res = [];
  for (let i = 0, len = str.length; i < len; i++) {
    const c = str[i];
    let child = node.findChild(c);
    while (!child && node !== trie.root) {
      node = node.fail;
      child = node.findChild(c);
    }
    if (child) {
      node = child;
    }
    if (node.isEnd) {
      res.push({
        start: i + 1 - node.deep,
        len: node.deep,
        str: str.substr(i + 1 - node.deep, node.deep),
      });
    }
  }
  return res;
};

export default {};
