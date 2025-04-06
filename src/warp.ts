const canvas = document.querySelector<HTMLCanvasElement>('#warp-1')!;



const width = 500;
const scale = 15;
canvas.height = width;
canvas.width = width;


const ctx = canvas.getContext("2d")!;
ctx.transform(1, 0, 0, -1, canvas.width / 2, canvas.height / 2);
ctx.lineWidth = 2;

ctx.moveTo(0, 0);
ctx.beginPath();
ctx.arc(0, 0, 0.5, 0, 2 * Math.PI);
ctx.stroke();