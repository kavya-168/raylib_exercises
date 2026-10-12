const r = require("raylib");

function detectorObj(x, y, width, height, velocity, hasDetected) {
    return { x, y, width, height, velocity, hasDetected };
}

function drawDetector(d) {
    r.DrawRectangleRec(d, r.WHITE);
}

function isOutOfBounds(movingPoint, start, end) {
    return movingPoint === start || movingPoint === end;
}

function changeDetectorVelocity(movingPoint, start, end, velocity) {
    return isOutOfBounds(movingPoint, start, end) ? -velocity : velocity;
}

function overlaps(d, p) {
    const end1 = d.x + d.width;
    const end2 = p.x + p.width;
    return !(end1 < p.x || d.x > end2);
}

function isOverlapWithTwoParticles(d, p1, p2) {
    return overlaps(d, p1) || overlaps(d, p2);
}

function update_d(d, p1, p2) {
    hasDetected1 = d.isOverlapWithTwoParticles(d1, p1, p2);

    scanner1_velocity = changeDetectorVelocity(horizontalScanner1_start, 0, WIDTH / 2 - SCANNER_WIDTH, scanner1_velocity);
}

module.exports = {
    detectorObj,
    drawDetector,
    update_d,
    isOverlapWithTwoParticles,
};