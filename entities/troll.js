class Troll extends Enemy {
    constructor({
        position,
        collisionBlocks,
        imageSrc = "./assets/troll/TrollWalk.png",
        framerate,
        animationsNumber,
        gravity = 1,
    }) {
        super({
            position,
            collisionBlocks,
            imageSrc,
            framerate,
            animationsNumber,
            gravity,
            frameBuffer: 20,
            velocity: {
                x: 1,
                y: 1,
            },
            hitboxSettings: {
                offsetX: 48,
                offsetY: 36,
                width: 30,
                height: 41,
            },
        });
    }

    changeAnimation(type) {
        if (type === "runRight") {
            this.frameBuffer = 20;
            this.currentAnimation = 0;
        }

        if (type === "runLeft") {
            this.frameBuffer = 20;
            this.currentAnimation = 1;
        }

        if (type === "run") {
            this.frameBuffer = 20;

            if (this.direction === "right") {
                this.currentAnimation = 0;
            } else {
                this.currentAnimation = 1;
            }
        }
    }
}
