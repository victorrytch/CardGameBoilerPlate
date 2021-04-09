class LogicalStack {

    logicalBuffers: LogicalBuffer[];

    process(gameState: GameState): void {
        if (this.logicalBuffers.length == 0) {
            GameStateAccess.setEngineState(gameState, EngineState.RESOLVING_REACTIVE_UNIT);
            return;
        }

        var currentLogicalBuffer = this.logicalBuffers[this.logicalBuffers.length - 1];
        var isComplete = currentLogicalBuffer.process(gameState);
        if (isComplete) {
            this.logicalBuffers = this.logicalBuffers.filter((eachLogicalBuffer) => {
                eachLogicalBuffer !== currentLogicalBuffer;
            });
        }
    }

}