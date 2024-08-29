class Yeti extends Enemy {
    constructor({
        position,
        collisionBlocks,
        imageSrc = "./assets/yeti/YetiWalk.png",
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
                offsetX: 72,
                offsetY: 55,
                width: 45,
                height: 61,
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
