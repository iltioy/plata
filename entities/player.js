class Player extends Entity {
    constructor({
        position,
        collisionBlocks,
        imageSrc = "./assets/player/player.png",
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
            velocity: {
                x: 0,
                y: 1,
            },
            hitboxSettings: {
                offsetX: 58,
                offsetY: 34,
                width: 52,
                height: 82,
            },
            type: "player",
        });

        this.lives = 3;
        this.isInvinsible = false;
        this.coinsCount = 0;
        this.pickedCoins = [];

        this.collidedLevelChange = [];

        this.defaultCollisionBlocks = collisionBlocks;

        this.levelChangeTypes = [
            "level-change-bottom",
            "level-change-right",
            "level-change-left",
            "level-change-top",
        ];
    }

    changeAnimation(type) {
        if (type === "idle" && this.velocity.y === 0 && this.velocity.x === 0) {
            this.frameBuffer = 30;

            if (this.direction === "right") {
                this.currentAnimation = 0;
            } else {
                this.currentAnimation = 3;
            }
        } else if (type === "idle" && this.velocity.x !== 0) {
            this.frameBuffer = 30;

            if (this.direction === "right") {
                this.currentAnimation = 1;
            } else {
                this.currentAnimation = 4;
            }
        }

        if (type === "run") {
            this.frameBuffer = 30;

            if (this.direction === "right") {
                this.currentAnimation = 1;
            } else {
                this.currentAnimation = 4;
            }
        }

        if (type === "jump") {
            this.frameBuffer = 5;

            if (this.direction === "right") {
                this.currentAnimation = 2;
            } else {
                this.currentAnimation = 5;
            }
        }
    }

    updateLevelEntities(entities = []) {
        if (this.isInvinsible) {
            this.collisionBlocks = this.defaultCollisionBlocks;
            return;
        }

        let newCollisions = [];
        // console.log(entities);

        for (let i = 0; i < entities.length; i++) {
            let entity = entities[i];

            newCollisions.push(
                new CollisionBlock({
                    position: {
                        x: entity.hitbox.position.x,
                        y: entity.hitbox.position.y,
                    },
                    width: entity.hitbox.width,
                    height: entity.hitbox.height,
                    type: entity.type,
                    id: entity.id,
                })
            );
        }

        // console.log(newCollisions);

        this.collisionBlocks = [
            ...this.defaultCollisionBlocks,
            ...newCollisions,
        ];
    }

    onCollideVertically({ block }) {
        // console.log(this.isAvlive);
        super.onCollideVertically({ block });

        if (!block) return;

        if (block.type === "block") {
            this.changeAnimation("idle");
        }

        if (
            (block.type === "enemy" || block.type === "lava") &&
            !this.isInvinsible
        ) {
            this.handleLifeDrop();
        }

        if (block.type === "coin") {
            this.handleCoinPickUp(block.id);
        }

        if (this.levelChangeTypes.includes(block.type)) {
            this.collidedLevelChange.push(block.type);
        }

        console.log(this.lives);
    }

    onCollideHorizontally({ direction, block }) {
        super.onCollideHorizontally({ direction, block });

        if (!block) return;

        if (
            (block.type === "enemy" || block.type === "lava") &&
            !this.isInvinsible
        ) {
            this.handleLifeDrop();
        }

        if (block.type === "coin") {
            this.handleCoinPickUp(block.id);
        }

        if (this.levelChangeTypes.includes(block.type)) {
            this.collidedLevelChange.push(block.type);
        }
    }

    handleLifeDrop() {
        // if (this.lives <= 0) return;

        this.isInvinsible = true;
        this.isAlfaBlinkEnabled = true;
        this.lives--;
        this.updateLevelEntities();

        setTimeout(() => {
            this.isInvinsible = false;
            this.isAlfaBlinkEnabled = false;
            this.globalAlfa = 1.0;
            this.updateLevelEntities();
        }, 3000);
    }

    handleCoinPickUp(coinId) {
        if (this.pickedCoins.includes(coinId)) {
            return;
        }
        this.coinsCount++;
        this.pickedCoins.push(coinId);
        console.log(this.pickedCoins);
    }
}
