class CollisionBlock {
    constructor({
        position,
        type = "block",
        width = 64,
        height = 64,
        id = null,
    }) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.type = type;
        this.id = id;
    }

    draw() {
        c.fillStyle = "rgba(255, 0, 0, 0.25)";
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
