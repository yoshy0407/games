import { ValueObject } from '../value/value.object';


export class ValueList<V, T extends ValueObject<V>> {

    private readonly array: V[]

    constructor(
        private readonly createFn: (value: V) => T,
        array: T[] = []
    ) {
        if (array.length > 0) {
            this.array = array.map((t) => t.value())
        } else {
            this.array = []
        }
    }

    get length() {
        return this.array.length
    }

    filter(callbackFn: (element: T, index: number, array: ValueList<V, T>) => boolean) {
        const temp = this.array.filter((element, index) => {
            return callbackFn(this.createFn(element), index, this)
        })
        return new ValueList(this.createFn, temp.map((v) => this.createFn(v)))
    }

    find(callbackFn: (element: T, index: number, array: ValueList<V, T>) => boolean): T | undefined {
        const temp = this.array.find((element, index) => {
            return callbackFn(this.createFn(element), index, this)
        })
        return temp ? this.createFn(temp) : undefined
    }

    findIndex(callbackFn: (element: T, index: number, array: ValueList<V, T>) => boolean): number {
        return this.array.findIndex((element, index) => {
            return callbackFn(this.createFn(element), index, this)
        })
    }

    forEach(callbackFn: (element: T, index: number, array: ValueList<V, T>) => boolean) {
        this.array.forEach((element, index) => {
            callbackFn(this.createFn(element), index, this)
        })
    }

    includes(searchElement: T, fromIndex?: number): boolean {
        return this.array.includes(searchElement.value(), fromIndex)
    }

    indexOf(searchElement: T, fromIndex?: number): number {
        return this.array.indexOf(searchElement.value(), fromIndex)
    }

    keys(): ArrayIterator<number> {
        return this.array.keys()
    }

    lastIndexOf(searchElement: T, fromIndex?: number): number {
        return this.array.lastIndexOf(searchElement.value(), fromIndex)
    }

    map<R>(callbackFn: (element: T, index: number, array: ValueList<V, T>) => R): R[] {
        return this.array.map((element, index) => {
            return callbackFn(this.createFn(element), index, this)
        })
    }

    pop() {
        const temp = this.array.pop()
        return this.createFn(temp)
    }

    push(...elements: T[]) {
        let length = this.array.length
        for (let element of elements.values()) {
            length = this.array.push(element.value())
        }
        return length
    }

    reduce<R>(callbackFn: (accumulator: T, currentValue: T, currentIndex: number, array: ValueList<V, T>) => T): T {
        const temp = this.array.reduce((accumulator, currentValue, currentIndex, array) => {
            const temp = callbackFn(this.createFn(accumulator), this.createFn(currentValue), currentIndex, this)
            return temp.value()
        })
        return this.createFn(temp)
    }

    values(): ArrayIterator<T> {
        const temp = this.array.map((t) => this.createFn(t))
        return temp[Symbol.iterator]()
    }

    get(index: number) {
        const temp = this.array[index]
        return this.createFn(temp)
    }
}