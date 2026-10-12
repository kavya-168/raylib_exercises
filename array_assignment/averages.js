const r = require("raylib");

function setup() {
  const WIDTH = 400;
  const HEIGHT = 400;

  const data = [12, 45, 78, 23, 91, 56, 34, 67, 89, 40];
  const max = findMax(data);

  const highestBar = HEIGHT * 0.9;
  const barWidth = 20;
  const gap = 2;

  r.SetTraceLogLevel(r.LOG_ERROR);
  r.InitWindow(WIDTH, HEIGHT, "averages");
  r.SetTargetFPS(50);

  return { WIDTH, HEIGHT, data, max, highestBar, barWidth, gap };
}

function calBarsHeight(world) {
  const barsHeight = [];

  for (let i = 0; i < world.data.length; i++) {
    barsHeight[i] = calRatio(world, world.data[i]);
  }

  return barsHeight;
}

function calRatio(world, num) {
  return (world.highestBar / world.max) * num;
}

function findMax(data) {
  let max = data[0];

  for (const n of data) {
    max = Math.max(max, n);
  }

  return max;
}

function sum(data) {
  let total = 0;

  for (const n of data) {
    total += n;
  }
  return total;
}

function calAverage(data) {
  return sum(data) / data.length;
}

function getRecObj(world, i, barsHeight) {
  return {
    x: (world.barWidth + world.gap) * i,
    y: world.HEIGHT - barsHeight[i],
    width: world.barWidth,
    height: barsHeight[i],
  };
}

function drawBar(barObj) {
  r.DrawRectangleRec(barObj, r.DARKBLUE);
}

function drawAverage(y, width) {
  r.DrawLine(0, y, width, y, r.RED);
}

function drawBarGraph(world) {
  const barsHeight = calBarsHeight(world);

  for (let i = 0; i < world.data.length; i++) {
    drawBar(getRecObj(world, i, barsHeight));
  }

  const lineOffset = calRatio(world, calAverage(world.data));
  drawAverage(world.HEIGHT - lineOffset, world.WIDTH);
}

function draw(world) {
  r.BeginDrawing();
  r.ClearBackground(r.RAYWHITE);

  drawBarGraph(world);

  r.EndDrawing();
}

function loop(world) {
  while (!r.WindowShouldClose()) {
    // update();
    draw(world);
  }
}

function main() {
  const world = setup();
  loop(world);
  r.CloseWindow();
}

main();
