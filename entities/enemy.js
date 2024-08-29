class Enemy extends Entity {
    constructor({
        position,
        collisionBlocks,
        imageSrc,
        framerate,
        animationsNumber,
        frameBuffer,
        velocity,
        hitboxSettings,
        gravity = 1,
    }) {
        super({
            position,
            collisionBlocks,
            imageSrc,
            framerate,
            animationsNumber,
            gravity,
            type: "enemy",
            velocity,
            frameBuffer,
            hitboxSettings,
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

    changeAnimation(type) {}
}
