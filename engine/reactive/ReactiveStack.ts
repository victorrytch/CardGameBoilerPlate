class ReactiveStack {
    reactionBuffers: ReactionBuffer[] = [];

    process(gameState: GameState): void {
        if (this.reactionBuffers.length == 0) {
            GameStateAccess.setEngineState(gameState, EngineState.RESOLVING_EVENT_UNIT);
            return;
        }
        var currentReactionBuffer = this.reactionBuffers[this.reactionBuffers.length - 1];
        var isCurrentReactionBufferComplete = currentReactionBuffer.process(gameState);

        if (isCurrentReactionBufferComplete) {
            this.reactionBuffers = this.reactionBuffers.filter((eachReactionBuffer) => {
                return eachReactionBuffer !== currentReactionBuffer;
            });
        }
    }
}
