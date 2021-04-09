class EventStack {

    events: GameEvent[] = [];

    process(gameState: GameState) {
        var topEvent = this.events[this.events.length - 1];

        if (!topEvent.hasPolledReactions) {
            if (this.pollReactions(topEvent, gameState)) {
                gameState.state.engineState = EngineState.RESOLVING_REACTIVE_UNIT;
            }
            topEvent.hasPolledReactions = true;
        }
        else {
            if (topEvent.eventStatus == EventLifecycleStatus.DECLARED) {
                topEvent.eventStatus = EventLifecycleStatus.RESOLVING;
            }
            else if (topEvent.eventStatus == EventLifecycleStatus.RESOLVING) {
                topEvent.execute(gameState);
                topEvent.eventStatus = EventLifecycleStatus.RESOLVED;
            }
            else if (topEvent.eventStatus == EventLifecycleStatus.RESOLVED) {
                this.removeEvent(topEvent);
            }
        }

    }

    removeEvent(eventArg) {
        this.events = this.events.filter(function (eachEvent) {
            return eachEvent !== eventArg
        })
    }

    pollReactions(eventArg: GameEvent, gameState: GameState): boolean {
        var haveReactionsBeenGenerated = false;
        var newReactionBuffer = new ReactionBuffer();
        newReactionBuffer.eventUUID = eventArg.uuid;
        for (var eachKey in ReactiveEntityRegistry.REGISTRY) {
            var eachReaction = ReactiveEntityRegistry.REGISTRY[eachKey];
            if (eachReaction.predicate(eventArg, gameState)) {
                haveReactionsBeenGenerated = true;
                newReactionBuffer.reactionEntries.push(JSON.parse(eachKey));
            }
        }
        if (haveReactionsBeenGenerated) {
            gameState.engine.reactiveStack.reactionBuffers.push(newReactionBuffer);
        }
        return haveReactionsBeenGenerated;
    }

}
