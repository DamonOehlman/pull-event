// @flow
const { pull, map, filter, log } = require('pull-stream');
const { event } = require('./event');
const many = require('pull-many');

function mouse(target /*: HTMLElement */) {
  const sources = [
    pull(
      event({ target, event: 'mouseup' }),
      map(event => ['UP', event.clientX, event.clientY])
    ),
    pull(
      event({ target, event: 'mouseover' }),
      map(event => ['MOVE', event.clientX, event.clientY])
    ),
    pull(
      event({ target, event: 'mousemove' }),
      map(event => ['MOVE', event.clientX, event.clientY])
    ),
    pull(
      event({ target, event: 'mousedown' }),
      map(event => ['DOWN', event.clientX, event.clientY])
    )
  ];

  return pull(many(sources));
}

function mousemove(target /*: HTMLElement */) {
  let down = false;
  return pull(
    mouse(target),
    map(([state /*: MouseState */, x /*: number */, y /*: number */]) => {
      down = state === 'UP' ? false : (down || state === 'DOWN');
      return [x, y, down];
    })
  );
}

module.exports = {
  mouse,
  mousemove
};
