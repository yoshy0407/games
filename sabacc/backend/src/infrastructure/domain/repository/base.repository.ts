import { Aggregation } from 'src/infrastructure/domain/aggregation';
import { EventEmitter2 } from "@nestjs/event-emitter";



export abstract class BaseRepository {

    constructor(private readonly eventEmitter: EventEmitter2) { }

    /**
     * イベントの発行を実施します
     * @param aggregation 
     * @returns なし
     */
    protected publishEvent(aggregation: Aggregation) {
        const events = aggregation.events
        if (!events) {
            return
        }
        events.forEach((e) => {
            this.eventEmitter.emit(e.eventName, e)
        })

    }
}