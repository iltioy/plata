const parsedCollisionsL1 = collisionsLevel1.parse2D();
const collisionBlocksL1 = parsedCollisionsL1.createObjectsFrom2D();

const collisionsForEnemyL1 = collisionsLevel1Enemy.parse2D();
const collisionsBlcoksForEnemyL1 = collisionsForEnemyL1.createObjectsFrom2D();

const troll = new Troll({
    position: {
        x: 300,
        y: 200,
    },
    collisionBlocks: collisionsBlcoksForEnemyL1,
    framerate: 6,
    animationsNumber: 4,
});

const yeti = new Yeti({
    position: {
        x: 400,
        y: 150,
    },
    collisionBlocks: collisionsBlcoksForEnemyL1,
    framerate: 6,
    animationsNumber: 4,
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
});

const backgroundImage = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: "./assets/test_map3.png",
});

const level1 = new Level({
    collisionBlocksPlayer: collisionBlocksL1,
    collisionBlocksEntities: collisionsBlcoksForEnemyL1,
    backgroundImage,
    playerPosition: {
        x: 100,
        y: 100,
    },
    rightLevel: {
        collisionBlocksPlayer: collisionBlocksL1,
        collisionBlocksEntities: collisionsBlcoksForEnemyL1,
        backgroundImage,
        playerPosition: {
            x: 100,
            y: 100,
        },
        entities: [troll, coin, yeti],
    },
    entities: [troll, coin, yeti],
});
