const canvas = document.querySelector<HTMLCanvasElement>('#warp-1')!;

const width = 500;
const scale = 15;
canvas.height = width;
canvas.width = width;


const ctx = canvas.getContext("2d")!;
ctx.transform(1, 0, 0, -1, canvas.width / 2, canvas.height / 2);

const dot = (x = 0, y = 0, color = 'black') => {
  ctx.beginPath();
  ctx.strokeStyle = color
  ctx.arc(x * scale, y * scale, 1 * scale, 0, 2 * Math.PI);
  ctx.stroke();
}

const drawLine = ([x1 = 0, y1 = 0], [x2 = 0, y2 = 0]) => {
  ctx.moveTo(x1 * scale, y1 * scale);
  ctx.lineTo(x2 * scale, y2 * scale);
  ctx.stroke();
}

const reset = () => {
  // https://stackoverflow.com/questions/2142535/how-to-clear-the-canvas-for-redrawing
  ctx.reset();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.transform(1, 0, 0, -1, canvas.width / 2, canvas.height / 2);
}

const drawBackground = () => {
  reset();
  drawLine([-10, 0], [10, 0]);
  drawLine([0, -10], [0, 10]);
  dot(10, 10, 'red');
  dot(-10, -10, 'green');
  dot(10, -10, 'blue');
  dot(-10, 10, 'purple');
}

drawBackground();


const handleBasisChange = () => {
  const iX = Number(document.querySelector<HTMLInputElement>('#i-x-val')?.value) / 10;
  const iY = Number(document.querySelector<HTMLInputElement>('#i-y-val')?.value) / 10;
  const jX = Number(document.querySelector<HTMLInputElement>('#j-x-val')?.value) / 10;
  const jY = Number(document.querySelector<HTMLInputElement>('#j-y-val')?.value) / 10;

  document.querySelector('#cur-i-x')!.textContent = iX.toString();
  document.querySelector('#cur-i-y')!.textContent = iY.toString();
  document.querySelector('#cur-j-x')!.textContent = jX.toString();
  document.querySelector('#cur-j-y')!.textContent = jY.toString();

  ctx.lineWidth = 0.01

  drawBackground();
  ctx.transform(iX, iY, jX, jY, 0, 0);
  drawLine([0, 0], [0, 10]);
  drawLine([0, 0], [10, 0]);
  dot(5, 5, 'red');
  dot(-5, -5, 'green');
  dot(5, -5, 'blue');
  dot(-5, 5, 'purple');
}

document.querySelector('#i-x-val')!.addEventListener('input', handleBasisChange);
document.querySelector('#i-y-val')!.addEventListener('input', handleBasisChange);
document.querySelector('#j-x-val')!.addEventListener('input', handleBasisChange);
document.querySelector('#j-y-val')!.addEventListener('input', handleBasisChange);
// drawLine([0, 0], [0, 1])