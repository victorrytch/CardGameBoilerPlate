class GameStateAccess {

    static setEngineState(gameState: GameState, engineState: EngineState) {
        gameState.state.engineState = engineState;
    }

    static addNewLogicalBuffer(gameState: GameState, logicalBuffer: LogicalBuffer) {
        gameState.engine.logicalStack.logicalBuffers.push(logicalBuffer);
    }

    static getEventFromUUID(gameState: GameState, eventUUID: string): GameEvent {
        return gameState.engine.eventStack.events.filter((eachEvent) => {
            return eachEvent.uuid == eventUUID;
        })
    }

    static getEventStack(gameState: GameState): EventStack {
        return gameState.engine.eventStack;
    }

    static getReactiveStack(gameState: GameState): ReactiveStack {
        return gameState.engine.reactiveStack;
    }

    static getLogicalStack(gameState: GameState): LogicalStack {
        return gameState.engine.logicalStack;
    }

}