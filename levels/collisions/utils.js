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
        row.forEach((s, x) => {
            switch (collisionsMap[s]) {
                case "block":
                    objects.push(
                        new CollisionBlock({
                            position: {
                                x: x * 64,
                                y: y * 64,
                            },
                        })
                    );
                    break;
                case "lava":
                    objects.push(
                        new CollisionBlock({
                            position: {
                                x: x * 64,
                                y: y * 64 + 10,
                            },
                            height: 54,
                            type: "lava",
                        })
                    );
                    break;
                case "right-level":
                    objects.push(
                        new CollisionBlock({
                            position: {
                                x: x * 64 + 54 + 20,
                                y: y * 64,
                            },
                            width: 10,
                            type: "level-change-right",
                        })
                    );
                    break;
                case "top-level":
                    objects.push(
                        new CollisionBlock({
                            position: {
                                x: x * 64,
                                y: y * 64 - 20,
                            },
                            height: 10,
                            type: "level-change-top",
                        })
                    );
                    break;
                case "left-level":
                    objects.push(
                        new CollisionBlock({
                            position: {
                                x: x * 64 - 20,
                                y: y * 64,
                            },
                            width: 10,
                            type: "level-change-left",
                        })
                    );
                    break;
                case "bottom-level":
                    objects.push(
                        new CollisionBlock({
                            position: {
                                x: x * 64,
                                y: y * 64 + 54 + 20,
                            },
                            height: 10,
                            type: "level-change-bottom",
                        })
                    );
                    break;
            }
        });
    });

    return objects;
};
