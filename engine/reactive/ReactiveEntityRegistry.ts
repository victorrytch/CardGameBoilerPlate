class ReactiveEntityRegistry {
    static REGISTRY = {};

    static registerReactiveEntity(reactiveEntity) {
        reactiveEntity.getReactions().forEach((eachReaction, index) => {
            var reactionKey = new ReactionKey(reactiveEntity.getReactiveId(), index);
            ReactiveEntityRegistry.REGISTRY[JSON.stringify(reactionKey)] = eachReaction;
        });
    }

    static getReaction(reactionKey) {
        return ReactiveEntityRegistry.REGISTRY[JSON.stringify(reactionKey)];
    }


}
