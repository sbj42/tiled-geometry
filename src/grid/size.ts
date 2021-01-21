import { CardinalTurn, axisFromNorthSouthTurn, Axis } from '../compass';

import { OffsetLike } from './offset';

export interface SizeLike {
    readonly width: number;
    readonly height: number;
}

export class Size implements SizeLike {
    width: number;
    height: number;

    constructor();
    constructor(width: number, height: number);
    constructor(width?: number, height?: number) {
        if (typeof width === 'undefined') {
            width = 0;
        }
        if (typeof height === 'undefined') {
            height = 0;
        }
        if (width < 0 || height < 0) {
            throw new Error(`bad size (${width}x${height})`);
        }
        this.width = width;
        this.height = height;
    }

    // accessors

    toString(): string {
        return `(${this.width}x${this.height})`;
    }

    equals(other: SizeLike): boolean {
        return this.width === other.width && this.height === other.height;
    }

    get empty(): boolean {
        return this.width === 0 || this.height === 0;
    }

    get area(): number {
        return this.width * this.height;
    }

    // mutators

    set(width: number, height: number): this {
        if (width < 0 || height < 0) {
            throw new Error(`bad size (${width}x${height})`);
        }
        this.width = width;
        this.height = height;
        return this;
    }

    copyFrom(other: SizeLike): this {
        return this.set(other.width, other.height);
    }

    add(width: number, height: number): this {
        this.width += width;
        this.height += height;
        return this;
    }

    multiply(factor: number): this {
        this.width *= factor;
        this.height *= factor;
        return this;
    }

    rotate(turn: CardinalTurn): this {
        if (axisFromNorthSouthTurn(turn) === Axis.WEST_EAST) {
            this.set(this.height, this.width);
        }
        return this;
    }

    // utilities

    contains(x: number, y: number): boolean {
        return x >= 0 && y >= 0 && x < this.width && y < this.height;
    }

    containsOffset(off: OffsetLike): boolean {
        return this.contains(off.x, off.y);
    }

    index(x: number, y: number): number {
        return y * this.width + x;
    }

    * offsets(): Generator<OffsetLike> {
        for (let y = 0; y < this.height; y ++) {
            for (let x = 0; x < this.width; x ++) {
                yield {x, y} as OffsetLike;
            }
        }
    }

    anyOf(predicate: (x: number, y: number) => boolean): boolean {
        for (const {x, y} of this.offsets()) {
            if (predicate(x, y)) {
                return true;
            }
        }
        return false;
    }
}
