class Coin extends Entity {
    constructor({
        position,
        collisionBlocks,
        imageSrc,
        framerate,
        animationsNumber,
        id,
        gravity = 0,
    }) {
        super({
            position,
            collisionBlocks,
            imageSrc,
            framerate,
            animationsNumber,
            gravity,
            velocity: {
                x: 0,
                y: 0,
            },
            hitboxSettings: {
                offsetX: 10,
                offsetY: 6,
                width: 40,
                height: 55,
            },
            type: "coin",
        });

        this.id = id;
        this.frameBuffer = 20;
    }
}
