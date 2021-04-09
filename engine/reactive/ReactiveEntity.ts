enum ReactiveEntityType {
    CARD,
    SYSTEM
}

interface ReactiveEntity {

    getReactions(): Reaction[];
    getReactiveId(): string;
    getReactiveEntityType(): ReactiveEntityType;

}
