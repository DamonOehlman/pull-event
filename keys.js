// @flow
const { pull, map } = require('pull-stream');
const many = require('pull-many');
const { event } = require('./event');

function keydown(target /*: HTMLElement */) {
  return pull(
    event({ target, event: 'keydown' }),
    map(data => data.code)
  );
}

function keyup(target /*: HTMLElement */) {
  return pull(
    event({ target, event: 'keyup' }),
    map(data => data.code)
  );
}

function activeKeys(target /*: HTMLElement */) {
  const downSource = pull(keydown(target), map(keyCode => [keyCode, true]));
  const upSource = pull(keyup(target), map(keyCode => [keyCode, false]));
  const keySet /*: Set<string> */ = new Set();

  return pull(
    many([downSource, upSource]),
    map(([keyCode /*: string */, include /*: boolean */]) => {
      if (include) {
        keySet.add(keyCode);
      } else {
        keySet.delete(keyCode);
      }

      return keySet;
    })
  );
}

module.exports = {
  keydown,
  keyup,
  activeKeys
};
