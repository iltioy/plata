class Enemy extends Entity {
    constructor({
        position,
        collisionBlocks,
        imageSrc,
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
            type: "enemy",
        });
    }

    onCollideHorizontally({ direction = "", block = null }) {
        super.onCollideHorizontally({ direction, block });

        if (!direction) return;
        if (direction === "right") {
            this.velocity.x = -1;
            this.changeAnimation("runLeft");
        } else if (direction === "left") {
            this.velocity.x = 1;
            this.changeAnimation("runRight");
        }
    }

    onCollideVertically({ block }) {
        super.onCollideVertically({ block });
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
