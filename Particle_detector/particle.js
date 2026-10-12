const r = require("raylib");

function particleObj(x, y, width, height) {
    return { x, y, width, height };
}

function drawParticle(p) {
    r.DrawRectangleRec(p, r.BLUE);
}

module.exports = {
    particleObj,
    drawParticle,
};