import { SizeLike, Size } from './size';
import { OffsetLike } from './offset';

export interface MaskLocation extends OffsetLike {
    readonly value: boolean;
}

export class Mask implements SizeLike {
    private readonly _size = new Size();
    private _bits: number[];

    constructor(size?: SizeLike, initialValue = false) {
        if (typeof size !== 'undefined') {
            this._size.copyFrom(size);
        }
        this._bits = new Array<number>(Math.ceil(this._size.area / 32)).fill(initialValue ? 0xffffffff : 0);
    }

    // accessors

    toString(): string {
        let ret = '';
        for (let y = 0; y < this.height; y ++) {
            for (let x = 0; x < this.width; x ++) {
                ret += this.get(x, y) ? '☑' : '☐';
            }
            ret += '\n';
        }
        return ret;
    }

    equals(other: Mask): boolean {
        return this._size.equals(other._size)
            && this._bits.length === other._bits.length
            && this._bits.every((v, i) => v === other._bits[i]);
    }

    get width(): number {
        return this._size.width;
    }

    get height(): number {
        return this._size.height;
    }

    get(x: number, y: number): boolean {
        return this.getAtIndex(this.index(x, y));
    }

    getAtOffset(off: OffsetLike): boolean {
        return this.get(off.x, off.y);
    }

    getAtIndex(index: number): boolean {
        // assert(index >= 0 && index < this._size.area)
        const arrayIndex = index >>> 5;
        const bitMask = 1 << (index & 31);
        return (this._bits[arrayIndex] & bitMask) !== 0;
    }

    // mutators

    copyFrom(other: Mask): this {
        this._size.copyFrom(other._size);
        this._bits = other._bits.slice();
        return this;
    }

    set(x: number, y: number, value: boolean): this {
        return this.setAtIndex(this.index(x, y), value);
    }

    setAtOffset(off: OffsetLike, value: boolean): this {
        return this.set(off.x, off.y, value);
    }

    setAtIndex(index: number, value: boolean): this {
        // assert(index >= 0 && index < this._size.area)
        const arrayIndex = index >>> 5;
        const bitMask = 1 << (index & 31);
        if (value) {
            this._bits[arrayIndex] |= bitMask;
        } else {
            this._bits[arrayIndex] &= ~bitMask;
        }
        return this;
    }

    // utilities

    index(x: number, y: number): number {
        return this._size.index(x, y);
    }

    * locations(): Generator<MaskLocation> {
        let arrayIndex = 0;
        let bitMask = 1;
        for (const {x, y} of this._size.offsets()) {
            const value = (this._bits[arrayIndex] & bitMask) !== 0;
            yield {x, y, value};
            if (bitMask === (1 << 31)) {
                bitMask = 1;
                arrayIndex ++;
            } else {
                bitMask <<= 1;
            }
        }
    }

    * offsetsWithTrue(): Generator<OffsetLike> {
        for (const {x, y, value} of this.locations()) {
            if (value) {
                yield {x, y};
            }
        }
    }
}
