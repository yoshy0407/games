
export class ClassNameSupport {
    private readonly classNames: string[] = [];

    constructor(classNames?: string[]) {
        if (classNames != undefined) {
            this.classNames = classNames
        }
    }

    add(className: string): ClassNameSupport {
        var classes = [className, ...this.classNames]
        return new ClassNameSupport(classes)
    }

    addAll(classNames: string[]): ClassNameSupport {
        var classes = [...classNames, ...this.classNames]
        return new ClassNameSupport(classes)
    }

    toClassString(): string {
        return this.classNames.join(' ')
    }
}