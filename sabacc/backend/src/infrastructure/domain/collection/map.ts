import { ValueObject } from "../value/value.object";


export class ValueMap<KV, K extends ValueObject<KV>, V> {

    private readonly map: Map<KV, V>

    constructor(
        private readonly createFn: (value: KV) => K,
        map: Map<K, V> = new Map()
    ) {
        this.map = new Map
        if (map.size > 0) {
            map.forEach((val, key) => {
                this.map.set(key.value(), val)
            })
        }
    }

    get size() {
        return this.map.size
    }

    clear() {
        this.map.clear()
    }

    delete(key: K) {
        const temp = key.value()
        return this.map.delete(temp)
    }

    entries(): MapIterator<[K, V]> {
        const temp = []
        for (let entry of this.map.entries()) {
            temp.push([this.createFn(entry[0]), entry[1]])
        }
        return temp[Symbol.iterator]()
    }

    forEach(callbackFn: (value: V, key: K, map: ValueMap<KV, K, V>) => void) {
        this.map.forEach((value, key) => {
            callbackFn(value, this.createFn(key), this)
        })
    }

    get(key: K) {
        return this.map.get(key.value())
    }

    has(key: K) {
        return this.map.has(key.value())
    }

    keys(): MapIterator<K> {
        const temp = []
        for (let key of this.map.keys()) {
            temp.push(this.createFn(key))
        }
        return temp[Symbol.iterator]()
    }

    set(key: K, value: V) {
        this.map.set(key.value(), value)
        return this
    }

    values(): MapIterator<V> {
        const temp = []
        for (let value of this.map.values()) {
            temp.push(value)
        }
        return temp[Symbol.iterator]()
    }
}