import { CardinalDirection, cardinalDirectionFromNorthTurn, Direction, CardinalTurn } from '../compass';

import { SizeLike } from './size';

const X_FROM_DIRECTION = [  0,  1, 1, 1, 0, -1, -1, -1 ];
const Y_FROM_DIRECTION = [ -1, -1, 0, 1, 1,  1,  0, -1 ];

const X_FROM_CARDINAL_DIRECTION = [  0, 1, 0, -1 ];
const Y_FROM_CARDINAL_DIRECTION = [ -1, 0, 1,  0 ];

export interface OffsetLike {
    readonly x: number;
    readonly y: number;
}

export class Offset implements OffsetLike {
    x: number;
    y: number;

    constructor();
    constructor(x: number, y: number);
    constructor(x?: number, y?: number) {
        if (typeof x === 'undefined') {
            x = 0;
        }
        if (typeof y === 'undefined') {
            y = 0;
        }
        this.x = x;
        this.y = y;
    }

    // accessors

    toString(): string {
        return `(${this.x},${this.y})`;
    }

    equals(other: OffsetLike): boolean {
        return this.x === other.x && this.y === other.y;
    }

    // mutators

    set(x: number, y: number): this {
        this.x = x;
        this.y = y;
        return this;
    }

    copyFrom(other: OffsetLike): this {
        return this.set(other.x, other.y);
    }

    setFromDirection(dir: Direction): this {
        return this.set(X_FROM_DIRECTION[dir], Y_FROM_DIRECTION[dir]);
    }

    setFromCardinalDirection(dir: CardinalDirection): this {
        return this.set(X_FROM_CARDINAL_DIRECTION[dir], Y_FROM_CARDINAL_DIRECTION[dir]);
    }

    add(x: number, y: number): this {
        this.x += x;
        this.y += y;
        return this;
    }

    addSize(size: SizeLike): this {
        return this.add(size.width, size.height);
    }

    addOffset(off: OffsetLike): this {
        return this.add(off.x, off.y);
    }

    addDirection(dir: Direction): this {
        return this.add(X_FROM_DIRECTION[dir], Y_FROM_DIRECTION[dir]);
    }

    addCardinalDirection(dir: CardinalDirection): this {
        return this.add(X_FROM_CARDINAL_DIRECTION[dir], Y_FROM_CARDINAL_DIRECTION[dir]);
    }

    subtractOffset(off: OffsetLike): this {
        return this.add(-off.x, -off.y);
    }

    multiply(factor: number): this {
        this.x *= factor;
        this.y *= factor;
        return this;
    }

    rotate(turn: CardinalTurn, anchor?: OffsetLike): this {
        if (anchor) {
            return this.subtractOffset(anchor).rotate(turn).addOffset(anchor);
        } else {
            const dir = cardinalDirectionFromNorthTurn(turn);
            const {x, y} = this;
            const dirx = X_FROM_CARDINAL_DIRECTION[dir];
            const diry = Y_FROM_CARDINAL_DIRECTION[dir];
            const nx = -y * dirx - x * diry;
            const ny = x * dirx - y * diry;
            return this.set(nx, ny);
        }
    }

    // utilities

    // chebyshev: can move in any direction (diagonals are ok)
    distanceChebyshev(other: OffsetLike): number {
        return Math.max(Math.abs(this.x - other.x), Math.abs(this.y - other.y));
    }

    // manhattan: can move only in cardinal directions (no diagonals)
    distanceManhattan(other: OffsetLike): number {
        return Math.abs(this.x - other.x) + Math.abs(this.y - other.y);
    }

    // chebyshev: can move in any direction (diagonals are ok)
    * nearbyChebyshevOffsets(cursor: Offset, radius: number): Generator<OffsetLike> {
        if (radius >= 0) {
            for (let dy = -radius; dy <= radius; dy ++) {
                for (let dx = -radius; dx <= radius; dx ++) {
                    yield cursor.set(this.x + dx, this.y + dy);
                }
            }
        }
    }
}
