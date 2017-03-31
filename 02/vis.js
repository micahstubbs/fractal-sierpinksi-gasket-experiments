/* global d3 */

const imgWidth = 400;
const imgHeight = 400;

d3.select('body').append('div')
  .attr('id', 'sg');

// create original canvas that will be iterated on
function init() {
  const originalCanvas = d3.select('#sg')
    .append('canvas')
    .attr('height', imgHeight)
    .attr('width', imgWidth)
    .attr('position', 'absolute')
    .attr('id', 'f0');

  const originalContext = originalCanvas
    .node()
    .getContext('2d');

  originalContext.fillStyle = 'green';
  originalContext.fillRect(0, 0, imgWidth, imgHeight);

  return [originalCanvas, originalContext];
}

// determine the rules for creating the fractal
function fractal(originalCanvas, originalContext, id) {
  const newCanvas = d3.select('#sg')
    .append('canvas')
    .attr('height', imgHeight)
    .attr('width', imgWidth)
    .attr('position', 'absolute')
    .attr('transform', 'translate(0,0)')
    .attr('id', `f${id}`);

  const newContext = newCanvas
    .node()
    .getContext('2d');

    // everything entered into newCanvas is scaled-down to half in both x and y
  newContext.scale(0.5, 0.5);

    // scaled-down copy of originalCanvas is put on top-left corner
  newContext.drawImage(originalCanvas._groups[0][0], 0, 0);

    // scaled-down copy of originalCanvas is put on bottom-left corner
  newContext.drawImage(originalCanvas._groups[0][0], 0, imgHeight);

    // scaled-down copy of original canvas is put on bottom-right corner
  newContext.drawImage(originalCanvas._groups[0][0], imgWidth, imgHeight);

  newContext.font = '30px Arial';
  newContext.fillText(`Iteration: ${id}`, imgWidth, imgHeight / 2);

    // remove orignal_canvas so that there is only one canvas on the screen
  d3.select(`#f${id - 1}`).remove();

  return [newCanvas, newContext];
}

function draw(iterations) {
  let now = 1;
  const canvases = [init()];

    // show change at each interation
  const animate = setInterval(() => { update(); }, 1000);

    // go through the rules for creating fractals until the desired number of iterations are hit
  function update() {
    if (now >= iterations) {
      clearInterval(animate);
    } else {
      canvases.push(fractal(canvases[canvases.length - 1][0], canvases[canvases.length - 1][1], now));
      now += 1;
    }
  }
}

draw(14);
