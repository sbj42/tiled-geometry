import { OffsetLike } from './offset';
import { RectangleLike, Rectangle } from './rectangle';
import { Mask, MaskLocation } from './mask';

export class MaskRectangle implements RectangleLike {
    private readonly _rect = new Rectangle();
    private readonly _mask: Mask;
    private _outsideValue: boolean;

    constructor(rect?: RectangleLike, initialValue = false, outsideValue = false) {
        if (typeof rect !== 'undefined') {
            this._rect.copyFrom(rect);
        }
        this._mask = new Mask(rect, initialValue);
        this._outsideValue = outsideValue;
    }

    // accessors

    toString(): string {
        return `${this._rect.northWest}/${this._outsideValue}\n${this._mask}`;
    }

    equals(other: MaskRectangle): boolean {
        return this._rect.equals(other._rect)
            && this._mask.equals(other._mask)
            && this._outsideValue === other._outsideValue;
    }

    get westX(): number {
        return this._rect.westX;
    }

    get northY(): number {
        return this._rect.northY;
    }

    get width(): number {
        return this._rect.width;
    }

    get height(): number {
        return this._rect.height;
    }

    get(x: number, y: number): boolean {
        if (!this._rect.contains(x, y)) {
            return this._outsideValue;
        }
        return this._mask.get(x - this.westX, y - this.northY);
    }

    getAtIndex(index: number): boolean {
        return this._mask.getAtIndex(index);
    }

    getAtOffset(off: OffsetLike): boolean {
        return this.get(off.x, off.y);
    }

    // mutators

    copyFrom(other: MaskRectangle): this {
        this._rect.copyFrom(other._rect);
        this._mask.copyFrom(other._mask);
        this._outsideValue = other._outsideValue;
        return this;
    }

    set(x: number, y: number, value: boolean): this {
        this._mask.set(x - this.westX, y - this.northY, value);
        return this;
    }

    setAtOffset(off: OffsetLike, value: boolean): this {
        return this.set(off.x, off.y, value);
    }

    setAtIndex(index: number, value: boolean): this {
        this._mask.setAtIndex(index, value);
        return this;
    }

    // utilities

    index(x: number, y: number): number {
        return this._mask.index(x - this.westX, y - this.northY);
    }

    * locations(): Generator<MaskLocation> {
        for (const loc of this._mask.locations()) {
            const x = loc.x + this.westX;
            const y = loc.y + this.northY;
            const {value} = loc;
            yield {x, y, value};
        }
    }

    * offsetsWithTrue(): Generator<OffsetLike> {
        for (const off of this._mask.offsetsWithTrue()) {
            const x = off.x + this.westX;
            const y = off.y + this.northY;
            yield {x, y};
        }
    }
}
