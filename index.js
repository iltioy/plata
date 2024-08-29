const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.height = 768;
canvas.width = 1088;

let currentLevel = level1;

const game = new Game({
    level: currentLevel,
});

const animate = () => {
    requestAnimationFrame(animate);

    game.render();
};

game.setupEventListenders();

animate();
