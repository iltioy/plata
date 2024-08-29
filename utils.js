Array.prototype.parse2D = function () {
    const rows = [];
    for (let i = 0; i < this.length; i += 17) {
        rows.push(this.slice(i, i + 17));
    }

    return rows;
};

Array.prototype.createObjectsFrom2D = function () {
    const objects = [];
    this.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol !== 0) {
                objects.push(
                    new CollisionBlock({
                        position: {
                            x: x * 64,
                            y: y * 64,
                        },
                    })
                );
            }
        });
    });

    return objects;
};
