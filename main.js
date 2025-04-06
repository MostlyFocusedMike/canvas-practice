import './style.css'

const canvas = document.querySelector('#my-canvas');
const width = 500;
const scale = 15;
canvas.height = width;
canvas.width = width;


const ctx = canvas.getContext("2d");
ctx.transform(1, 0, 0, -1, canvas.width / 2, canvas.height / 2);
ctx.lineWidth = 2;

const origin = () => ctx.moveTo(0, 0);
const moveTo = (x, y) => ctx.moveTo(x, y);
const lineTo = (x, y) => ctx.lineTo(x, y)

const drawLine = ([x1, y1], [x2, y2]) => {
  moveTo(x1, y1);
  lineTo(x2, y2);
}

const reset = () => {
  // https://stackoverflow.com/questions/2142535/how-to-clear-the-canvas-for-redrawing
  ctx.save(); // Store the current transformation matrix
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.restore(); // Restore the transform
}

// make tick marks
const drawAxis = (isX = true, start = -15, end = 15) => {
  origin();

  ctx.beginPath();
  ctx.strokeStyle = "lightgray";
  for (let i = start; i <= end; i++) {
    if (i === 0) continue;

    const finalTick = i % 5 ? 3 : 7;
    isX
      ? drawLine([i * scale, -1 * finalTick], [i * scale, finalTick])
      : drawLine([-1 * finalTick, i * scale,], [finalTick, i * scale])
  }

  isX
    ? drawLine([start * scale, 0], [end * scale, 0])
    : drawLine([0, start * scale], [0, end * scale])
  ctx.stroke();
}

const iHat = (x = 1) => {
  const seeX = x * scale;

  ctx.beginPath();
  ctx.strokeStyle = "red";
  drawLine([0, 0], [seeX, 0]);
  ctx.stroke();

  ctx.beginPath();
  const zeroOffset = seeX !== 0 ? seeX : seeX + 5
  moveTo(zeroOffset, 0);
  lineTo(zeroOffset + (seeX >= 0 ? -1 : 1) * 5, 5);
  lineTo(zeroOffset + (seeX >= 0 ? -1 : 1) * 5, -5);

  ctx.fillStyle = 'red';
  ctx.fill();
}

const jHat = (y = 1) => {
  const seeY = y * scale;

  ctx.beginPath();
  ctx.strokeStyle = "green";
  drawLine([0, 0], [0, seeY]);
  ctx.stroke();

  ctx.beginPath();
  const zeroOffset = seeY !== 0 ? seeY : seeY + 5
  moveTo(0, zeroOffset);
  lineTo(5, zeroOffset + (seeY >= 0 ? -1 : 1) * 5);
  lineTo(-5, zeroOffset + (seeY >= 0 ? -1 : 1) * 5);

  ctx.fillStyle = 'green';
  ctx.fill();
}

const vector = () => {
  ctx.beginPath();
  ctx.strokeStyle = "blue";
  const { x, y } = coords;

  drawLine([0, 0], [x * scale, y * scale]);

  ctx.stroke();
  drawTriangle(coords.x * scale, coords.y * scale, 'blue');
}

function angle(cx, cy, ex, ey) {
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  return theta;
}
function angle360(cx, cy, ex, ey) {
  var theta = angle(cx, cy, ex, ey); // range (-180, 180]
  if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}

// Function to draw the triangle
function drawTriangle(tipX, tipY, color) {
  const angle = angle360(0, 0, tipX, tipY) * Math.PI / 180;
  // Translate to the center
  ctx.translate(tipX, tipY);

  // Rotate
  ctx.rotate(angle);

  // Draw the triangle
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.moveTo(2, 0)
  ctx.lineTo(0 - 0.4 * scale, 0 + 0.3 * scale);
  ctx.lineTo(0 - 0.4 * scale, 0 - 0.3 * scale);
  ctx.closePath();
  ctx.fill();

  // Reset transformations
  ctx.rotate(-angle);
  ctx.translate(-tipX, -tipY);
}

const draw = () => {
  reset();
  drawAxis();
  drawAxis(false);
  iHat(coords.x);
  jHat(coords.y);
  vector();
  updateText();
}

// application
const coords = { x: 1, y: 1 };

const updateText = () => {
  document.querySelectorAll('.current-x').forEach(node => node.textContent = coords.x);
  document.querySelectorAll('.current-y').forEach(node => node.textContent = coords.y);
}


const updateBasisVector = (e) => {
  coords[e.target.dataset.axis] = e.target.value;
  draw();
}

const handleArrowKeys = (e) => {
  const { x, y } = coords
  if (e.key === 'ArrowRight') coords.x += x < 15 ? 1 : 0;
  if (e.key === 'ArrowLeft') coords.x -= x > -15 ? 1 : 0;
  if (e.key === 'ArrowUp') coords.y += y < 15 ? 1 : 0;
  if (e.key === 'ArrowDown') coords.y -= y > -15 ? 1 : 0;
  draw();
}

document.querySelector('#x-val').addEventListener('input', updateBasisVector);
document.querySelector('#y-val').addEventListener('input', updateBasisVector);
document.querySelector('#reset').addEventListener('click', () => {
  coords.x = 1;
  coords.y = 1;
  document.querySelector('#x-val').value = 1;
  document.querySelector('#y-val').value = 1;
  draw();
})

// document.body.addEventListener('keydown', handleArrowKeys)


draw();
updateText();