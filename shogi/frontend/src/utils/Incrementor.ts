
export class Incrementor {

    constructor(private origin: number) { }

    getAndIncrement() {
        const num = this.origin;
        this.origin++
        return num;
    }
}