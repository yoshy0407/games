
/**
 * 値オブジェクトのインタフェースです
 */
export interface ValueObject<T> {

    value(): T

    equals(value: ValueObject<T>): boolean
}