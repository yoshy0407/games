import { DomainEvent } from "./events";


export abstract class Aggregation {

    private readonly domainEvents: DomainEvent[] = []

    publishEvent(domainEvent: DomainEvent) {
        this.domainEvents.push(domainEvent)
    }

    get events() {
        return this.domainEvents
    }

}