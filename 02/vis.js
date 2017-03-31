const img_width = 400;
const img_height = 400;

d3.select('body').append('div')
  .attr('id', 'sg');

// create original canvas that will be iterated on
function init() {
  const original_canvas = d3.select('#sg')
    .append('canvas')
    .attr('height', img_height)
    .attr('width', img_width)
    .attr('position', 'absolute')
    .attr('id', 'f0');

  const original_context = original_canvas
    .node()
    .getContext('2d');

  original_context.fillStyle = 'green';
  original_context.fillRect(0, 0, img_width, img_height);

  return [original_canvas, original_context];
}

// determine the rules for creating the fractal
function fractal(original_canvas, original_context, id) {
  const new_canvas = d3.select('#sg')
    .append('canvas')
    .attr('height', img_height)
    .attr('width', img_width)
    .attr('position', 'absolute')
    .attr('transform', 'translate(0,0)')
    .attr('id', `f${id}`);

  const new_context = new_canvas
    .node()
    .getContext('2d');

    // everything entered into new_canvas is scaled-down to half in both x and y
  new_context.scale(0.5, 0.5);

    // scaled-down copy of original_canvas is put on top-left corner
  new_context.drawImage(original_canvas._groups[0][0], 0, 0);

    // scaled-down copy of original_canvas is put on bottom-left corner
  new_context.drawImage(original_canvas._groups[0][0], 0, img_height);

    // scaled-down copy of original canvas is put on bottom-right corner
  new_context.drawImage(original_canvas._groups[0][0], img_width, img_height);

  new_context.font = '30px Arial';
  new_context.fillText(`Iteration: ${id}`, img_width, img_height / 2);

    // remove orignal_canvas so that there is only one canvas on the screen
  d3.select(`#f${id - 1}`).remove();

  return [new_canvas, new_context];
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
