class Sprite {
    constructor({
        position,
        imageSrc,
        frameBuffer = 5,
        framerate = 1,
        animationsNumber = 1,
    }) {
        this.position = position;
        this.image = new Image();
        this.image.src = imageSrc;
        this.loaded = false;
        this.currentFrame = 0;
        this.framerate = framerate;
        this.elaspedFrams = 0;
        this.frameBuffer = frameBuffer;
        this.currentAnimation = 0;
        this.animationsNumber = animationsNumber;
        this.isAlfaBlinkEnabled = false;
        this.globalAlfa = 1.0;

        this.image.onload = () => {
            this.loaded = true;
            this.width = this.image.width / this.framerate;
            this.height = this.image.height / this.animationsNumber;
        };
    }

    draw() {
        if (!this.loaded) return;

        const cropbox = {
            position: {
                x: this.width * (this.currentFrame % this.framerate),
                y: this.height * this.currentAnimation,
            },
            width: this.width,
            height: this.height,
        };

        if (this.isAlfaBlinkEnabled && this.elaspedFrams % 50 === 0) {
            if (this.globalAlfa < 1) {
                this.globalAlfa = 1;
            } else {
                this.globalAlfa = 0.5;
            }
        }

        c.globalAlpha = this.globalAlfa;

        c.drawImage(
            this.image,
            cropbox.position.x,
            cropbox.position.y,
            cropbox.width,
            cropbox.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );

        c.globalAlpha = 1.0;

        this.updateFrams();
    }

    updateFrams() {
        this.elaspedFrams++;
        if (this.elaspedFrams % this.frameBuffer === 0) {
            this.currentFrame++;
        }
    }
}
