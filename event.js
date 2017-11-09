// @flow

/*::
import type {
  PullEnd,
  PullCallback,
  PullFn,
  PullSource
} from './pull-types.js';

type EventSourceConfig = {
  target: HTMLElement,
  event: string
};

type TargetedConfig = {
  target: HTMLElement
};

export type MouseState = 'UP' | 'DOWN' | 'MOVE';
*/

const event /*: PullSource<EventSourceConfig,?Event> */ = ({ target, event }) => {
  const buffer /*: Array<Event> */ = [];

  function bufferEvent(evt /*: Event */): void {
    buffer.unshift(evt);
  }

  target.addEventListener(event, bufferEvent);

  return function(end, callback) {
    // TODO: move the event listener initialization to here

    if (end) {
      target.removeEventListener(event, bufferEvent);
      return callback(end);
    }

    if (buffer.length > 0) {
      // we have a buffered event we can pull through
      return callback(false, buffer.pop());
    } else {
      // we don't have any queued events so we have to wait...
      // the event listeners will fire in order, so we can trigger
      // another event listener to fire after our buffering one and
      // take the item that was just added
      target.addEventListener(event, singleShot);

      function singleShot(evt) {
        // remove the single shot listeners
        target.removeEventListener(event, singleShot);
        return callback(false, buffer.pop());
      }
    }
  }
}

module.exports = {
  event
};


