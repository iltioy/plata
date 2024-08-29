class Game {
    constructor({ level }) {
        this.player = new Player({
            position: {
                x: level.playerPosition.x,
                y: level.playerPosition.y,
            },
            collisionBlocks: level.collisionBlocksPlayer,
            framerate: 7,
            animationsNumber: 6,
            gravity: 0.8,
        });

        this.keys = {
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

        this.currentLevel = level;
    }

    render() {
        this.currentLevel.backgroundImage.draw();

        this.player.velocity.x = 0;
        if (this.keys.d.pressed) {
            this.player.velocity.x = 5;
        } else if (this.keys.a.pressed) {
            this.player.velocity.x = -5;
        }

        for (let i = 0; i < this.currentLevel.entities.length; i++) {
            let entity = currentLevel.entities[i];

            if (entity instanceof Coin) {
                if (!this.player.pickedCoins.includes(entity.id)) {
                    entity.update();
                    entity.draw();
                }
                continue;
            }
            entity.draw();
            entity.update();
        }

        this.player.updateLevelEntities(this.currentLevel.entities);
        this.player.draw();
        this.player.update();
    }

    handleLevelChange() {
        if (this.player.collidedLevelChange.length !== 0) {
            let level = this.player.collidedLevelChange[0];
            console.log(level);

            if (
                this.currentLevel.levelMap &&
                this.currentLevel.levelMap[level]
            ) {
                console.log("veve");

                this.currentLevel = currentLevel.levelMap[level];
                this.player.position = currentLevel.playerPosition;
                this.player.defaultCollisionBlocks =
                    currentLevel.collisionBlocksPlayer;
            }

            this.player.collidedLevelChange = [];
        }
    }

    setupEventListenders() {
        window.addEventListener("keydown", (event) => {
            console.log(event);
            switch (event.key) {
                case "w":
                    if (this.player.velocity.y === 0) {
                        this.player.changeAnimation("jump");
                        this.player.velocity.y -= 24;
                    }
                    break;
                case "a":
                    this.keys.a.pressed = true;
                    this.player.changeAnimation("run");
                    break;
                case "d":
                    this.keys.d.pressed = true;
                    this.player.changeAnimation("run");
                    break;
            }
        });

        window.addEventListener("keyup", (event) => {
            console.log(event);
            switch (event.key) {
                case "a":
                    this.keys.a.pressed = false;
                    this.player.changeAnimation("idle");
                    break;
                case "d":
                    this.keys.d.pressed = false;
                    break;
            }
        });
    }
}
