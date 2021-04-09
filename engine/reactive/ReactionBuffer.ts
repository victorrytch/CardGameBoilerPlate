class ReactionBuffer {
    eventUUID: string;
    reactionEntries: ReactionKey[] = [];
    currentReactionEntryIndex: number = 0;

    process(gameState: GameState): boolean {
        if (this.reactionEntries.length == 0) {
            return true;
        }

        var event = GameStateAccess.getEventFromUUID(gameState, this.eventUUID);
        var reaction = ReactiveEntityRegistry.getReaction(this.reactionEntries[this.currentReactionEntryIndex]);
        var logicalBuffer = reaction.action(gameState, event);
        GameStateAccess.addNewLogicalBuffer(gameState, logicalBuffer);
        GameStateAccess.setEngineState(gameState, EngineState.RESOLVING_REACTIVE_UNIT);

        this.currentReactionEntryIndex++;

        return false;
    }

}
