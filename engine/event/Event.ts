abstract class GameEvent {

    uuid: string;
    eventDefinitionId: number;
    eventStatus: EventLifecycleStatus;
    hasPolledReactions: boolean
    args: {};

    abstract execute(gameState): void;

}
