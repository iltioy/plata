class Level {
    constructor({
        collisionBlocksPlayer,
        collisionBlocksEntities,
        backgroundImage,
        playerPosition,
        entities,
        rightLevel = null,
        leftLevel = null,
        topLevel = null,
        bottomtLevel = null,
    }) {
        this.collisionBlocksPlayer = collisionBlocksPlayer;
        this.collisionBlocksEntities = collisionBlocksEntities;
        this.backgroundImage = backgroundImage;
        this.playerPosition = playerPosition;
        this.entities = entities;

        this.levelMap = {
            "level-change-bottom": bottomtLevel,
            "level-change-right": rightLevel,
            "level-change-left": leftLevel,
            "level-change-top": topLevel,
        };
    }
}
