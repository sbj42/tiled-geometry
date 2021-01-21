import { CardinalTurn } from '../compass';

import { SizeLike, Size } from './size';
import { Offset, OffsetLike } from './offset';

export interface RectangleLike extends SizeLike {
    readonly westX: number;
    readonly northY: number;
}

const ROTATE_CORNER_X = [ 0, 0, 1, 1 ];
const ROTATE_CORNER_Y = [ 0, 1, 1, 0 ];

export class Rectangle implements RectangleLike, SizeLike {
    northWest: Offset;
    size: Size;

    constructor();
    constructor(westX: number, northY: number, width: number, height: number);
    constructor(westX?: number, northY?: number, width?: number, height?: number) {
        if (typeof westX === 'undefined') {
            westX = 0;
        }
        if (typeof northY === 'undefined') {
            northY = 0;
        }
        if (typeof width === 'undefined') {
            width = 0;
        }
        if (typeof height === 'undefined') {
            height = 0;
        }
        this.northWest = new Offset(westX, northY);
        this.size = new Size(width, height);
    }

    // accessors

    toString(): string {
        return `(${this.westX},${this.northY} ${this.width}x${this.height})`;
    }

    equals(other: RectangleLike): boolean {
        return this.westX === other.westX && this.northY === other.northY && this.size.equals(other);
    }

    get northY(): number {
        return this.northWest.y;
    }

    get southY(): number {
        return this.northWest.y + this.size.height - 1;
    }

    get westX(): number {
        return this.northWest.x;
    }

    get eastX(): number {
        return this.northWest.x + this.size.width - 1;
    }

    get width(): number {
        return this.size.width;
    }

    get height(): number {
        return this.size.height;
    }

    get empty(): boolean {
        return this.size.empty;
    }

    get area(): number {
        return this.size.area;
    }

    // mutators

    set(westX: number, northY: number, width: number, height: number): this {
        this.northWest.set(westX, northY);
        this.size.set(width, height);
        return this;
    }

    setFromCorners(off1: OffsetLike, off2: OffsetLike): this {
        const westX = Math.min(off1.x, off2.x);
        const eastX = Math.max(off1.x, off2.x);
        const northY = Math.min(off1.y, off2.y);
        const southY = Math.max(off1.y, off2.y);
        return this.set(westX, northY, eastX - westX + 1, southY - northY + 1);
    }

    copyFrom(other: RectangleLike): this {
        return this.set(other.westX, other.northY, other.width, other.height);
    }

    addOffset(off: OffsetLike): this {
        this.northWest.addOffset(off);
        return this;
    }

    scale(factor: number): this {
        this.northWest.multiply(factor);
        this.size.multiply(factor);
        return this;
    }

    rotate(turn: CardinalTurn, anchor?: OffsetLike): this {
        const cx = ROTATE_CORNER_X[turn];
        const cy = ROTATE_CORNER_Y[turn];
        this.northWest.add(cx * (this.width - 1), cy * (this.height - 1)).rotate(turn, anchor);
        this.size.rotate(turn);
        return this;
    }

    extendToInclude(off: OffsetLike): this {
        const dx = off.x - this.westX;
        if (dx < 0) {
            this.size.width -= dx;
            this.northWest.x = off.x;
        } else if (dx >= this.size.width) {
            this.size.width = dx + 1;
        }
        const dy = off.y - this.northWest.y;
        if (dy < 0) {
            this.size.height -= dy;
            this.northWest.y = off.y;
        } else if (dy >= this.size.height) {
            this.size.height = dy + 1;
        }
        return this;
    }

    // utilities

    contains(x: number, y: number): boolean {
        return this.size.contains(x - this.westX, y - this.northY);
    }

    index(x: number, y: number): number {
        return this.size.index(x - this.westX, y - this.northY);
    }

    containsOffset(off: OffsetLike): boolean {
        return this.contains(off.x, off.y);
    }

    containsRectangle(other: RectangleLike): boolean {
        if (other.width === 0 && other.height === 0) {
            return false;
        }
        const x = other.westX - this.westX;
        const y = other.northY - this.northY;
        if (!this.size.contains(x, y)) {
            return false;
        }
        return this.size.contains(x + other.width - 1, y + other.height - 1);
    }

    overlapsRectangle(other: RectangleLike): boolean {
        return this.northY <= other.northY + other.height - 1
            && this.southY >= other.northY
            && this.westX <= other.westX + other.width - 1
            && this.eastX >= other.westX
            && !this.empty
            && other.width !== 0 && other.height !== 0;
    }

    * offsets(): Generator<OffsetLike> {
        const {eastX, southY} = this;
        for (let y = this.northY; y <= southY; y ++) {
            for (let x = this.westX; x <= eastX; x ++) {
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
