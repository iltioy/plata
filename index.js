const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.height = 768;
canvas.width = 1088;

const parsedCollisions = collisionsLevel1.parse2D();
const collisionBlocks = parsedCollisions.createObjectsFrom2D();

const collisionsForEnemy = collisionsLevel1Enemy.parse2D();
const collisionsBlcoksForEnemy = collisionsForEnemy.createObjectsFrom2D();

const player = new Player({
    position: {
        x: 200,
        y: 200,
    },
    collisionBlocks,
    framerate: 7,
    animationsNumber: 6,
    // imageSrc: "./assets/king/idle.png",
    imageSrc: "./assets/player/player.png",
});

const troll = new Enemy({
    position: {
        x: 300,
        y: 200,
    },
    collisionBlocks: collisionsBlcoksForEnemy,
    framerate: 6,
    animationsNumber: 4,
    // imageSrc: "./assets/king/idle.png",
    imageSrc: "./assets/troll/TrollWalk.png",
});

const coin = new Coin({
    position: {
        x: 400,
        y: 200,
    },
    id: 1,
    collisionBlocks: [],
    framerate: 5,
    animationsNumber: 1,
    // imageSrc: "./assets/king/idle.png",
    imageSrc: "./assets/coin/moneta.png",
});

const backgroundImage = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: "./assets/test_map3.png",
});

const keys = {
    w: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
};

const animate = () => {
    requestAnimationFrame(animate);

    // c.scale = 6;

    backgroundImage.draw();

    collisionBlocks.forEach((block) => {
        block.draw();
    });

    player.velocity.x = 0;
    if (keys.d.pressed) {
        player.velocity.x = 4;
    } else if (keys.a.pressed) {
        player.velocity.x = -4;
    }

    troll.draw();
    troll.update();

    if (!player.pickedCoins.includes(coin.id)) {
        coin.update();
        coin.draw();
    }

    player.updateLevelEntities([troll, coin]);
    player.draw();
    player.update();
};

animate();

window.addEventListener("keydown", (event) => {
    console.log(event);
    switch (event.key) {
        case "w":
            if (player.velocity.y === 0) {
                player.changeAnimation("jump");
                player.velocity.y -= 22;
            }
            break;
        case "a":
            keys.a.pressed = true;
            player.changeAnimation("run");
            break;
        case "d":
            keys.d.pressed = true;
            player.changeAnimation("run");
            break;
    }
});

window.addEventListener("keyup", (event) => {
    console.log(event);
    switch (event.key) {
        case "a":
            keys.a.pressed = false;
            player.changeAnimation("idle");
            break;
        case "d":
            keys.d.pressed = false;
            break;
    }
});
