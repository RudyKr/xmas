(function () {
    var requestAnimationFrame =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    window.requestAnimationFrame = requestAnimationFrame;
})();

var flakes = [];
var snowCanvas = document.getElementById("snowCanvas");
var ctx = snowCanvas.getContext("2d");
var flakeCount = 1400;
var offset = 2;
snowCanvas.width = window.innerWidth;
snowCanvas.height = window.innerHeight;

function init() {
    for (var i = 0; i < flakeCount; i++) {
        var x = Math.floor(Math.random() * snowCanvas.width),
            y = Math.floor(Math.random() * snowCanvas.height),
            size = getNewFlakeSize(),
            speed = getNewFlakeSpeed(),
            opacity = getNewFlakeOpacity(),
            velX = getNewFlakeVelX();

        flakes.push({
            speed: speed,
            velY: speed,
            velX: velX,
            x: x,
            y: y,
            size: size,
            stepSize: Math.random() / 30,
            step: 0,
            opacity: opacity
        });
    }
    snow();
}

function getNewFlakeSize() { return Math.random() * 3 + 2; }
function getNewFlakeSpeed() { return Math.random() * 0.5 + 1; }
function getNewFlakeOpacity() { return Math.random() * 0.6 + 0.1; }
function getNewFlakeVelX() { return Math.random() - 0.9; }

function snow() {
    ctx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);
    flakes.map(function (flake) {
        ctx.fillStyle = "rgba(240,255,255," + flake.opacity + ")";
        flake.y += flake.velY;
        flake.x += flake.velX;
        if (
            flake.y >= snowCanvas.height + offset ||
            flake.y <= -offset ||
            flake.x >= snowCanvas.width + offset ||
            flake.x <= -offset)
            reset(flake);

        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(snow);
}

function reset(flake) {
    flake.x = Math.floor(Math.random() * snowCanvas.width);
    flake.y = -offset;
    flake.size = getNewFlakeSize();
    flake.speed = getNewFlakeSpeed();
    flake.velY = flake.speed;
    flake.velX = getNewFlakeVelX();
    flake.opacity = getNewFlakeOpacity();
}

window.addEventListener("resize", function () {
    snowCanvas.width = window.innerWidth;
    snowCanvas.height = window.innerHeight;
});


init();