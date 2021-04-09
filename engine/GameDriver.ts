class GameDriver {
    gameState: GameState;

    process() {
        while (this.iterate()) { }
    }

    iterate(): boolean {
        var state = this.gameState.state.engineState;

        if (state == EngineState.RESOLVING_EVENT_UNIT) {
            var eventStack = GameStateAccess.getEventStack(this.gameState);
            eventStack.process(this.gameState);
            return true;
        }
        else if (state == EngineState.RESOLVING_REACTIVE_UNIT) {
            var reactiveStack = GameStateAccess.getReactiveStack(this.gameState);
            reactiveStack.process(this.gameState);
            return true;
        }
        else if (state == EngineState.RESOLVING_LOGICAL_UNIT) {
            var logicalStack = GameStateAccess.getLogicalStack(this.gameState);
            logicalStack.process(this.gameState);
            return true;
        }
        else if (state == EngineState.AWAITING_PLAYER_DECISION) {
            return false;
        }
        else if (state == EngineState.AWAITING_PLAYER_MOVE) {
            return false;
        }

        return false;
    }

}