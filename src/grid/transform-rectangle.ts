import { Rectangle, RectangleLike } from './rectangle';
import {
    Flip,
    CardinalTurn,
    cardinalDirectionFromNorthTurn,
    CardinalDirection,
    cardinalOrientationFromFlipAndCardinalDirection,
    cardinalOrientationFlip,
    Axis,
    cardinalOrientationAddCardinalTurn,
    CardinalOrientation,
    cardinalTurnReverse,
    cardinalDirectionFromCardinalOrientation,
    flipToString,
    cardinalTurnToString,
    cardinalOrientationReverse,
    cardinalTurnFromCardinalDirections,
} from '../compass';
import { Offset, OffsetLike } from './offset';
import { Size, SizeLike } from './size';

const LOCAL_OFF = new Offset();
const LOCAL_OFF2 = new Offset();
const LOCAL_SIZE = new Size();

export class TransformRectangle implements RectangleLike {
    private readonly _size = new Size();

    private _flip = Flip.HEADS;
    private _rotate = CardinalTurn.NONE;
    private readonly _translate = new Offset();

    private readonly _matrix = [1, 0, 0, 0, 1, 0];
    private readonly _targetRect = new Rectangle();

    constructor(size?: SizeLike);
    constructor(width: number, height: number);
    constructor(width?: SizeLike | number, height?: number) {
        if (typeof width === 'undefined') {
            // nothing
        } else if (typeof width === 'number') {
            this._size.set(width, height as number);
        } else {
            this._size.copyFrom(width);
        }
        this._update();
    }

    // accessors

    toString(): string {
        return `[${this._size}`
            + ` -> ${flipToString(this._flip)} ${cardinalTurnToString(this._rotate)} ${this._translate}`
            + ` -> ${this._targetRect}]`;
    }

    equals(other: TransformRectangle): boolean {
        return this._size.equals(other._size)
            && this._flip === other._flip
            && this._rotate === other._rotate
            && this._translate.equals(other._translate);
    }

    get flip(): Flip {
        return this._flip;
    }

    get rotate(): CardinalTurn {
        return this._rotate;
    }

    get northY(): number {
        return this._translate.y;
    }

    get southY(): number {
        return this._translate.y + this._targetRect.height - 1;
    }

    get westX(): number {
        return this._translate.x;
    }

    get eastX(): number {
        return this._translate.x + this._targetRect.width - 1;
    }

    get width(): number {
        return this._targetRect.width;
    }

    get height(): number {
        return this._targetRect.height;
    }

    // internal

    // 0
    //    0 -1
    // +90
    //    1  0
    // 180
    //    0  1
    // -90
    //   -1  0
    //
    // heads:
    //   0
    //      1  0  x
    //      0  1  y
    //   +90
    //      0 -1  x + h - 1
    //      1  0  y
    //   180
    //     -1  0  x + w - 1
    //      0 -1  y + h - 1
    //   -90
    //      0  1  x
    //     -1  0  y + w - 1
    //
    // tails:
    //   0
    //     -1  0  x + w - 1
    //      0  1  y
    //   +90
    //      0 -1  x + h - 1
    //     -1  0  y + w - 1
    //   180
    //      1  0  x
    //      0 -1  y + h - 1
    //   -90
    //      0  1  x
    //      1  0  y

    private _update() {
        LOCAL_OFF.setFromCardinalDirection(cardinalDirectionFromNorthTurn(this._rotate));
        const flipSign = this._flip === Flip.TAILS ? -1 : 1;
        this._matrix[0] = -LOCAL_OFF.y * flipSign;
        this._matrix[1] = -LOCAL_OFF.x;
        this._matrix[2] = this._translate.x;
        this._matrix[3] = LOCAL_OFF.x * flipSign;
        this._matrix[4] = -LOCAL_OFF.y;
        this._matrix[5] = this._translate.y;
        switch (this._rotate) {
            case CardinalTurn.NONE:
                if (this._flip === Flip.TAILS) {
                    this._matrix[2] += this._size.width - 1;
                }
                break;
            case CardinalTurn.RIGHT:
                this._matrix[2] += this._size.height - 1;
                if (this._flip === Flip.TAILS) {
                    this._matrix[5] += this._size.width - 1;
                }
                break;
            case CardinalTurn.AROUND:
                this._matrix[5] += this._size.height - 1;
                if (this._flip === Flip.HEADS) {
                    this._matrix[2] += this._size.width - 1;
                }
                break;
            case CardinalTurn.LEFT:
                if (this._flip === Flip.HEADS) {
                    this._matrix[5] += this._size.width - 1;
                }
                break;
        }
        LOCAL_SIZE.copyFrom(this._size).rotate(this._rotate);
        this._targetRect.set(this._translate.x, this._translate.y, LOCAL_SIZE.width, LOCAL_SIZE.height);
        return this;
    }

    // mutators

    copyFrom(other: TransformRectangle): this {
        this._size.copyFrom(other._size);
        this._flip = other._flip;
        this._rotate = other._rotate;
        this._translate.copyFrom(other._translate);
        other._matrix.forEach((v, i) => this._matrix[i] = v);
        this._targetRect.copyFrom(other._targetRect);
        return this;
    }

    reset(): this {
        this._flip = Flip.HEADS;
        this._rotate = CardinalTurn.NONE;
        this._translate.set(0, 0);
        return this._update();
    }

    invert(): this {
        const nrotate = cardinalTurnFromCardinalDirections(CardinalDirection.NORTH,
            cardinalDirectionFromCardinalOrientation(
                cardinalOrientationReverse(
                    cardinalOrientationFromFlipAndCardinalDirection(this._flip,
                        cardinalDirectionFromNorthTurn(this._rotate)))));
        this._rotate = nrotate;
        this._size.rotate(nrotate);
        this._translate.multiply(-1);
        return this._update();
    }

    setTransform(flip: Flip, rotate: CardinalTurn, translate: OffsetLike): this {
        this._flip = flip;
        this._rotate = rotate;
        this._translate.copyFrom(translate);
        return this._update();
    }

    setFlip(flip: Flip): this {
        this._flip = flip;
        return this._update();
    }

    setRotate(rotate: CardinalTurn): this {
        this._rotate = rotate;
        return this._update();
    }

    setTranslate(x: number, y: number): this {
        this._translate.set(x, y);
        return this._update();
    }

    setTranslateOffset(translate: OffsetLike): this {
        this._translate.copyFrom(translate);
        return this._update();
    }

    // utility

    applyToCardinalOrientation(orientation: CardinalOrientation): CardinalOrientation {
        if (this._flip === Flip.TAILS) {
            orientation = cardinalOrientationFlip(orientation, Axis.NORTH_SOUTH);
        }
        return cardinalOrientationAddCardinalTurn(orientation, this._rotate);
    }

    unapplyFromCardinalOrientation(orientation: CardinalOrientation): CardinalOrientation {
        orientation = cardinalOrientationAddCardinalTurn(orientation, cardinalTurnReverse(this._rotate));
        if (this._flip === Flip.TAILS) {
            orientation = cardinalOrientationFlip(orientation, Axis.NORTH_SOUTH);
        }
        return orientation;
    }

    applyToCardinalDirection(orientation: CardinalDirection): CardinalDirection {
        return cardinalDirectionFromCardinalOrientation(
            this.applyToCardinalOrientation(
                cardinalOrientationFromFlipAndCardinalDirection(Flip.HEADS, orientation)));
    }

    unapplyFromCardinalDirection(orientation: CardinalDirection): CardinalDirection {
        return cardinalDirectionFromCardinalOrientation(
            this.unapplyFromCardinalOrientation(
                cardinalOrientationFromFlipAndCardinalDirection(Flip.HEADS, orientation)));
    }

    applyTo(offOut: Offset, x: number, y: number): typeof offOut {
        const nx = x * this._matrix[0] + y * this._matrix[1] + this._matrix[2];
        const ny = x * this._matrix[3] + y * this._matrix[4] + this._matrix[5];
        return offOut.set(nx, ny);
    }

    unapplyFrom(offOut: Offset, x: number, y: number): typeof offOut {
        const tx = x - this._matrix[2];
        const ty = y - this._matrix[5];
        const nx = tx * this._matrix[0] + ty * this._matrix[3];
        const ny = tx * this._matrix[1] + ty * this._matrix[4];
        return offOut.set(nx, ny);
    }

    applyToOffset(offOut: Offset, off?: OffsetLike): typeof offOut {
        if (typeof off === 'undefined') {
            off = offOut;
        }
        return this.applyTo(offOut, off.x, off.y);
    }

    unapplyFromOffset(offOut: Offset, off?: OffsetLike): typeof offOut {
        if (typeof off === 'undefined') {
            off = offOut;
        }
        return this.unapplyFrom(offOut, off.x, off.y);
    }

    applyToRectangle(rectOut: Rectangle, rect?: RectangleLike): typeof rectOut {
        if (typeof rect !== 'undefined') {
            rectOut.copyFrom(rect);
        }
        LOCAL_OFF.set(rectOut.westX, rectOut.northY);
        LOCAL_OFF2.set(rectOut.eastX, rectOut.southY);
        this.applyToOffset(LOCAL_OFF);
        this.applyToOffset(LOCAL_OFF2);
        return rectOut.setFromCorners(LOCAL_OFF, LOCAL_OFF2);
    }

    unapplyFromRectangle(rectOut: Rectangle, rect?: RectangleLike): typeof rectOut {
        if (typeof rect !== 'undefined') {
            rectOut.copyFrom(rect);
        }
        LOCAL_OFF.set(rectOut.westX, rectOut.northY);
        LOCAL_OFF2.set(rectOut.eastX, rectOut.southY);
        this.unapplyFromOffset(LOCAL_OFF);
        this.unapplyFromOffset(LOCAL_OFF2);
        return rectOut.setFromCorners(LOCAL_OFF, LOCAL_OFF2);
    }
}
