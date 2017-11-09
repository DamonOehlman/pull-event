const { event } = require('./event');
const { mouse, mousemove } = require('./mouse');
const { keydown, keyup, activeKey } = require('./keys');

module.exports = {
  event,
  mouse,
  mousemove,
  keydown,
  keyup,
  activeKey
};
