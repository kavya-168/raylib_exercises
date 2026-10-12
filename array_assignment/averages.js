const r = require("raylib");

function setup() {
  const WIDTH = 400;
  const HEIGHT = 400;

  const data = [12, 45, 78, 23, 91, 56, 34, 67, 89, 40];

  r.SetTraceLogLevel(r.LOG_ERROR);
  r.InitWindow(WIDTH, HEIGHT, "averages");
  r.SetTargetFPS(50);

  return { WIDTH, HEIGHT, data };
}

function createBar() {
  return { width: 20, gap: 2 };
}

function findMax(data) {
  let max = data[0];

  for (const n of data) {
    max = Math.max(max, n);
  }
  return max;
}

function calHeight(world, i, max) {
  return (((world.data[i] * 90) / max) * world.HEIGHT) / 100;
}

function calRecDimensions(world, bar, i) {
  const max = findMax(world.data);

  const height = calHeight(world, i, max);
  const width = bar.width;

  const x = (bar.width + bar.gap) * i;
  const y = world.HEIGHT - height;

  return { x, y, width, height };
}

function calAverage(world) {
  let total = 0;

  for (const n of world.data) {
    total += n;
  }
  const average = total / world.data.length;
  return (((average * 90) / 91) * world.HEIGHT) / 100;
}

function drawBars(world) {
  const bar = createBar();

  for (let i = 0; i < world.data.length; i++) {
    const recDimensions = calRecDimensions(world, bar, i);

    r.DrawRectangleRec(recDimensions, r.DARKBLUE);
  }

  const ave = calAverage(world);

  r.DrawLine(0, ave, world.WIDTH, ave, r.RED);
}

function draw(world) {
  r.BeginDrawing();
  r.ClearBackground(r.WHITE);

  drawBars(world);

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

Math.max;
