// @flow
const { pull, log, filter, drain, map, values, take } = require('pull-stream');
const { mouse, mousemove } = require('../../');

function main() {
  const canvas = document.querySelector('canvas');
  const bounds = canvas && canvas.getBoundingClientRect();

  if (canvas) {
    canvas.width = bounds.width;
    canvas.height = bounds.height;
  }

  const context = canvas && canvas.getContext('2d');
  if (!context || !bounds) {
    throw new Error('could not run demo, missing canvas');
  }

  pull(
    mousemove(canvas),
    drain(([x /*: number */, y /*: number */, down /*: boolean */]) => {
      if (down) {
        context.lineTo(x - bounds.x, y - bounds.y);
        context.stroke();
      } else {
        context.moveTo(x - bounds.x, y - bounds.y);
      }
    })
  );
}

window.addEventListener('DOMContentLoaded', () => main());
