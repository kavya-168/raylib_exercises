const r = require("raylib");
const d = require("./detector");
const p = require("./particle")

const WIDTH = 300;
const HEIGHT = 200;

const d1 = d.detectorObj(0, 0, 20, HEIGHT, -1, false);
const d2 = d.detectorObj(WIDTH - 20, 0, 20, HEIGHT, 2, false);
const d3 = d.detectorObj(0, 0, WIDTH, 20, -1, false);


const p1 = p.particleObj(WIDTH / 4, 0, 40, HEIGHT);
const p2 = p.particleObj(WIDTH * 0.75, 0, 10, HEIGHT);
const p3 = p.particleObj(0, HEIGHT / 2, WIDTH, 40);


// const SCANNER_WIDTH = 20;

// const HORIZONTAL_SCANNER_Y = 0;

// let horizontalScanner1_start = 0;
// scanner1_velocity = -1;

// let horizontalScanner2_start = WIDTH - SCANNER_WIDTH;
// scanner2_velocity = 2;

// let verticleScannerStart = 0;
// scanner3_velocity = -1;

// const PARTICLE1_START = WIDTH / 4;
// const PARTICLE1_WIDTH = SCANNER_WIDTH * 2;

// const PARTICLE2_START = WIDTH * 0.75;
// const PARTICLE2_WIDTH = SCANNER_WIDTH / 2;

// const H_PARTICLE_START = HEIGHT / 2;
// const H_PARTICLE_HEIGHT = SCANNER_WIDTH / 2;

// let hasDetected1 = false;
// let hasDetected2 = false;
// let hasDetected3 = false;

function isRunning() {
    return !r.WindowShouldClose();
}

function setup() {
    r.InitWindow(WIDTH, HEIGHT, "Particle Scanning");
    r.SetTargetFPS(90);
}

function overlaps(start1, s_width, start2, p_width) {
    const end1 = start1 + s_width;
    const end2 = start2 + p_width
    return !(end1 < start2 || start1 > end2)
}

// function isOverlapWithTwoParticles(s_start, s_width, p1_start, p1_width, p2_start, p2_width) {
//     return overlaps(s_start, s_width, p1_start, p1_width) || overlaps(s_start, s_width, p2_start, p2_width);
// }

function getScannerColor(hasDetected) {
    return hasDetected ? r.RED : r.WHITE;
}

// function isOutOfBounds(movingPoint, start, end) {
//     return movingPoint === start || movingPoint === end;
// }

// function changeDetectorVelocity(movingPoint, start, end, velocity) {
//     return isOutOfBounds(movingPoint, start, end) ? -velocity : velocity;
// }

function calScannerStart(movingPoint, velocity) {
    return movingPoint + velocity;
}

function update() {

    d.update_d(d1, p1, p2);
    // hasDetected1 = d.isOverlapWithTwoParticles(d1, p1, p2);

    // scanner1_velocity = changeDetectorVelocity(horizontalScanner1_start, 0, WIDTH / 2 - SCANNER_WIDTH, scanner1_velocity);
    horizontalScanner1_start = calScannerStart(horizontalScanner1_start, scanner1_velocity);

    hasDetected2 = isOverlapWithTwoParticles(horizontalScanner1_start, SCANNER_WIDTH, PARTICLE1_START, PARTICLE1_WIDTH, PARTICLE2_START, PARTICLE2_WIDTH);

    scanner2_velocity = changeDetectorVelocity(horizontalScanner2_start, WIDTH - SCANNER_WIDTH, WIDTH / 2, scanner2_velocity);
    horizontalScanner2_start = calScannerStart(horizontalScanner2_start, scanner2_velocity);

    hasDetected3 = overlaps(verticleScannerStart, SCANNER_WIDTH, H_PARTICLE_START, H_PARTICLE_HEIGHT);

    scanner3_velocity = changeDetectorVelocity(verticleScannerStart, 0, HEIGHT - SCANNER_WIDTH, scanner3_velocity);
    verticleScannerStart = calScannerStart(verticleScannerStart, scanner3_velocity);

}

function draw() {
    r.BeginDrawing()
    r.ClearBackground(r.BLACK);

    d.drawDetector(d1);
    d.drawDetector(d2);
    d.drawDetector(d3);

    p.drawParticle(p1);
    p.drawParticle(p2);
    p.drawParticle(p3);

    // r.DrawRectangle(p1.START, 0, p1.WIDTH, HEIGHT, r.BLUE);
    // r.DrawRectangle(p2.START, 0, p2.WIDTH, HEIGHT, r.BLUE);

    // r.DrawRectangle(0, p3.START, WIDTH, p3.HEIGHT, r.BLUE);

    // r["DrawRectangle"](d1.startX, d1.startY, d1.WIDTH, HEIGHT, getScannerColor(d1.hasDetected));
    // r.DrawRectangle(d2.startX, d2.startY, d2.WIDTH, HEIGHT, getScannerColor(d2.hasDetected));

    // r.DrawRectangle(0, verticleScannerStart, WIDTH, SCANNER_WIDTH, getScannerColor(d3.hasDetected));

    r.EndDrawing();
}

function teardown() {
    r.CloseWindow();
}

module.exports = {
    isRunning,
    setup,
    update,
    draw,
    teardown,
}
