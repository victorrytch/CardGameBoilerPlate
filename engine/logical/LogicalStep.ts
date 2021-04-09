abstract class LogicalStep {
    uuid: string;

    abstract process(logicalBuffer, gameState): boolean;

    reset(): void { }

}
